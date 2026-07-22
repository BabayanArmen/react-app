import { useEffect, useMemo, useState } from "react";
import type { ProfileProps } from "../models/profile.props.model";
import { debounce } from "lodash";
import { getRequest } from "../services/http.service";
import type { User } from "../models/user/user.model";
import '../styles/profile.scss';

export function Profile(props: ProfileProps) {
    const [state, setState] = useState<ProfileProps>(props);

    const [users, setUsers] = useState<Array<User>>([]);

    const debounceChange = useMemo(
        () => 
            debounce((name: string) => {
                setState(state => ({
                    ...state,
                    name
                }));
            }, 500),
        []
    )

    const sendMessage = (message: string) => {
        props.callback(message);
    };

    useEffect(() => {
        getRequest('https://jsonplaceholder.typicode.com/users', null)
        .then((result) => {
            setUsers(result.data);
        })
        .catch(e => e)
    }, [])

    useEffect(() => {
        console.log(users);
    }, [users]);

    useEffect(() => {
        return () => {
            debounceChange.cancel();
        };
    }, [debounceChange]);

    return (
        <>
            <h2>Profile page</h2>
            <span>{state.name}</span>
            <span>{state.age}</span>
            <input type="text" onChange={(e: any) => debounceChange(e.target.value)} />

            {
                users.length > 0 && (
                    <ul className="user-list">
                        {users.map((user: User) => (
                            <li className="user-item" key={user.id}>
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </li>
                        ))}
                    </ul>
                )
            }

            <button onClick={() => sendMessage("Hello from profile")}>Callback</button>
        </>
    )
}