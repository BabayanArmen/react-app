import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

export function UserDetails() {
    const { id, name } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    // const params = Object.fromEntries(searchParams.entries());
    // console.log(params);

    // let querries: Record<string, string> = {};
    // searchParams.forEach((value, key) => {
    //     querries[key] = value
    // })

    console.log(searchParams.get("a"));

    function changeQuery() {

        setSearchParams({
            search: "john",
            page: "2",
            sort: "name"
        });

    }
    
    const [loading, setLoading] = useState<boolean>(false);

    const [user, setUser] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("fetch data for id " + id);
        console.log(name);

        // console.log("url querry ", querryParams);
        
        // fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        //     .then((response: any) => response.json())
        //     .then((data: any) => setUser(data))
        //     .catch((error) => console.log(error))

        loadData();
        
    }, [id])

    async function loadData() {
        setLoading(true);
        const res = await (await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)).json();
        if (res) {
            setUser(res); 
        }
        setLoading(false);
    }

    return (
        <>
        <button onClick={() => navigate("/home/users")}>Back</button>
            <h3>User details</h3>
            <span>{loading && 'Loading...'}</span>
            {user && (
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.username}</p>
                    <p>{user.website}</p>
                    <p>{user.email}</p>
                </div>
            )}
            <button onClick={changeQuery}>Set Querries</button>
        </>


    )
}