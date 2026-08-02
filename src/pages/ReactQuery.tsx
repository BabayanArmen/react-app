import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTodo, getTodoes } from "../utils/mockDtataService";
import { useState } from "react";

export function ReactQuery() {
    const quertClient = useQueryClient();

    const [ title, setTitle ] = useState("");

    const [search, setSearch] = useState();
    
    const { data: todoes, isLoading } = useQuery({
        queryFn: () => getTodoes(search),
        queryKey: ['todoes', {search}],
        // gcTime: 0 // to disable cache
        // staleTime: Infinity // to disable background data fatching
    });

    const { mutateAsync: addToDoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            quertClient.invalidateQueries({
                queryKey: ["todoes"],
            });
        }
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                <button onClick={async () => {
                    try {
                        await addToDoMutation({ title })
                        setTitle("")
                    } catch (error) {
                        console.log(error);
                    }
                }}>Add ToDo</button>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {todoes?.map((todo, index) => {
                    return (
                        <div key={index} style={{display: "flex", flexDirection: "column"}}>
                            <span>{todo.id}</span>
                            <span>{todo.title}</span>
                            <span>{todo.completed}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}