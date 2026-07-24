import { useContext } from "react"
import { AppContext } from "../App"

export function Sender() {
    const appContext = useContext(AppContext);

    return (
        <div style={{ border: '1px solid blue', padding: '15px' }}>
            <button onClick={() => {appContext?.setMessage("sender message")}}>Send Event</button>
        </div>
    )
}