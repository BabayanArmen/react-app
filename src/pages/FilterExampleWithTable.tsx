import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../styles/FilterExampleWithTable.scss';
import { Drawer } from "../components/Drawer";
// import { Modal } from "../components/Modal";

export function FilterExampleWithTable() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const [form, setForm] = useState<any>({
        name: "",
        email: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {   
        const { name, value } = e.target;     
        setForm({
            ...form,
            [name]: value.trim()
        })
    }
    
    function onSearch() {
        applyQuerries(form);
        setDrawerOpen(false);
    }

    function reset() {
        setForm({
            name: "",
            email: ""
        });
        applyQuerries();
        setDrawerOpen(false);
    }

    function applyQuerries(form: any = {}) {
        const filter: Record<string, string> = Object.fromEntries(
            Object.entries(form)
                .filter(([_, value]) => (value !== null && value !== ""))
                .map(([key, value]) => [key, String(value)])
        );
        setQuerries(filter);
    }

    const [querries, setQuerries] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const params = Object.fromEntries(querries.entries());
        setForm(params)
        loadData(params);        
    }, [querries])

    async function loadData(params: any = null) {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => query.append(key, String(value)));
        setLoading(true);
        const url = Object.keys(params).length ? `https://jsonplaceholder.typicode.com/users?${query}` : `https://jsonplaceholder.typicode.com/users`
        const res = await fetch(url);
        const usersData = await res.json();
        if (usersData) {
            setUsers(usersData);
            console.log(usersData);
        }
        setLoading(false);
    }

    return (
        <>
            <button onClick={() => setDrawerOpen(true)}>Open Filters</button>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className="filter_container">
                    <div className="filter_items">
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" value={form.name ?? ""} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" value={form.email ?? ""} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="filter_buttons">
                        <button onClick={onSearch}>Search</button>
                        <button onClick={() => reset()}>Reset</button>
                    </div>
                </div>
            </Drawer>

            {/* <Modal open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" value={form.name ?? ""} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={form.email ?? ""} onChange={handleChange} />
                    </div>
                </div>
                <button onClick={onSearch}>Search</button>
                <button onClick={() => reset()}>Reset</button>
            </Modal> */}

            <span>{loading && 'Loading...'}</span>

            {(users && !loading) && (
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>username</td>
                            <td>email</td>
                            <td>phone</td>
                            <td>website</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.website}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </>
    )

}