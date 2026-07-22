// import { useEffect, useState } from "react";
import type { UserNote } from "../models/userNote.model";

export function Note(note: UserNote) {
    // const [x, setNote] = useState<UserNote>(note || {} as UserNote);
    // useEffect(() => {
    //     setNote(note);
    // }, [note])
    // return (
    //     <div style={{display: "flex", flexDirection: 'column'}}>
    //         <span>Title: {x.title}</span>
    //         <span>Body: {x.body}</span>
    //     </div>
    // )

    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
            <span>Title: {note.title}</span>
            <span>Body: {note.body}</span>
        </div>
    )
}