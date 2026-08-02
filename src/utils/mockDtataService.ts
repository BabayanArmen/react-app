import type { ToDo } from "../models/todo.model";

const todoes: Array<ToDo> = [
    {
        id: 1,
        title: "Review pull request #142",
        completed: true,
    },
    {
        id: 2,
        title: "Set up unit tests for auth module",
        completed: false,
    },
    {
        id: 3,
        title: "Update API documentation",
        completed: false,
    },
    {
        id: 4,
        title: "Refactor database migration scripts",
        completed: true,
    },
    {
        id: 5,
        title: "Optimize image assets for build",
        completed: false,
    },
]

export const getTodoes = async (filter: any = null) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let res: Array<ToDo> = [];
    if (filter) {
        res = todoes.filter(t => t.title.toLowerCase() === filter.toLowerCase().trim());
    } else {
        res = todoes;
    }
    return res;
}

export const addTodo = async (todo: ToDo) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    todo.id = todoes.length+1;
    todoes.push(todo);
    return todo;
}