import { useState } from "react";
import { Note } from "../components/Note";
import { Modal } from "../components/Modal";

export function Notes() {
    const [note, setNote] = useState({title: "New title", body: "some text here"});

    const changeNoteHandler = () => {
        setNote((state) => ({
            ...state,
            title: "changed title"
        }))
    }

    const [ open, setOpen] = useState<boolean>(false)

    return (
        <>
            <h2>Notes</h2>

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
        </>
    )
}