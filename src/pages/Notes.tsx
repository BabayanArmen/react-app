import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Note } from "../components/Note";
import { Modal } from "../components/Modal";
import { AppContext } from "../App";
import { Sender } from "./Sender";
import { Reciever } from "./Reciever";
import VideoPlayer from "./VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setUserNameAsync } from "../features/user/userSlice";
import type { AppDispatch, RootState } from "../app/store";
import { debounce } from "lodash";

export function Notes() {
    const [note, setNote] = useState({title: "New title", body: "some text here"});

    const changeNoteHandler = () => {
        setNote((state) => ({
            ...state,
            title: "changed title"
        }))
    }

    const [ open, setOpen] = useState<boolean>(false);

    const titleRef = useRef<HTMLInputElement>(null);

    const counter = useRef(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    ///////////// redux ///////////////////////////////////////////
    const user = useSelector((state: RootState) => {
        if (state.user) {
            return state.user.currentUser;
        }
    })

    const dispatch = useDispatch<AppDispatch>();
    ///////////////////////////////////////////////////////////////

    const videoData = useMemo(() => {
        return {
            url: 'https://www.w3schools.com/html/mov_bbb.mp4',
            title: 'Bunny Movie'
        }
    }, [])

    const onPlay = useCallback(() => {setIsPlaying(true)}, [])
    const onPause = useCallback(() => {setIsPlaying(false)}, [])

    const changeTitleColor = () => {
        if (titleRef.current) {
            titleRef.current.style.color = 'green';
        }

        console.log(counter.current);

        counter.current++;
    }

    const appContext = useContext(AppContext);

    console.log(appContext.data);

    const debounceChange = useMemo(
        () => 
            debounce((value: string) => {
                dispatch(setUserNameAsync(value));
                console.log(value);
                
            }, 500),
        []
    )

    return (
        <>
            <h2 ref={titleRef}>Notes</h2>

            <button onClick={changeTitleColor}>Change title color</button>

            <ul>
                <li>
                    <Note {...{title: note.title, body: note.body}}></Note>
                </li>
            </ul>

            <button onClick={changeNoteHandler}>change note</button>

            <button onClick={() => setOpen(true)}>
                {!open && 'Open Modal'}
                {open && 'Close Modal'}
            </button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <h2>Hello Portal</h2>
                <p>
                    I am rendered outside root
                </p>
            </Modal>

            <Sender/>
            <Reciever />

            <hr />

            <span>{isPlaying ? 'is playing' : 'on pauses'}</span>
            
            <VideoPlayer 
                src={videoData}
                onPlay={onPlay}
                onPause={onPause}
            />

            <hr style={{border: "4px solid grey"}} />

            <p>Redux</p>

            <p>{user?.name}</p>

            <input type="text" value={user?.name ?? ""} onChange={(evn) => dispatch(setUserName(evn.target.value))} />
            <input type="text" placeholder="set user name async" onChange={(evn) => debounceChange(evn.target.value)} />
        </>
    )
}