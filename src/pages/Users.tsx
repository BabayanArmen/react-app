// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom"

import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";

export function Component() {
    // this works but now we not ganna use it
    // const users: Array<any> = useLoaderData();

    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        setLoading(true);
        const res = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();
        if (res) {
            setUsers(res); 
        }
        setLoading(false);
    }

    return (
        <>
            <h1>Users</h1>
            <span>{loading && 'Loading...'}</span>

            {users && (
                <ul>
                    {users.map((user: any, index) => {
                        return (
                            <li key={index}><NavLink to={`${user.id}/${user.name}`}>{user.name}</NavLink></li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}