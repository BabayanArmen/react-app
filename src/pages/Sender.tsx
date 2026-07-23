import { useContext } from "react"
import { AppContext } from "../App"

export function Sender() {
    const appContext = useContext(AppContext);

    const setContextData = () => {
        if (appContext.setData !== undefined) {
            appContext.setData({info: "this data set from sender"});
        }
    }

    return (
        <div style={{ border: '1px solid blue', padding: '15px' }}>
            <button onClick={setContextData}>Send Event</button>
        </div>
    )
}