import { useContext, useEffect } from "react"
import { AppContext } from "../App"

export function Reciever() {
    const appContext = useContext(AppContext);    

    useEffect(() => {
        console.log(appContext.data);
    }, [appContext.data])

    return (
        <div style={{ border: '1px solid green', padding: '15px' }}>
            <h3>Recieve Event</h3>
            <span>{appContext?.data.info}</span>
        </div>
    )
}