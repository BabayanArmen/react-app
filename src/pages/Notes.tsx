import { useContext, useRef, useState } from "react";
import { Note } from "../components/Note";
import { Modal } from "../components/Modal";
import { AppContext } from "../App";
import { Sender } from "./Sender";
import { Reciever } from "./Reciever";

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

    const changeTitleColor = () => {
        if (titleRef.current) {
            titleRef.current.style.color = 'green';
        }

        console.log(counter.current);

        counter.current++;
    }

    const appContext = useContext(AppContext);

    console.log(appContext.data);
    

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
        </>
    )
}