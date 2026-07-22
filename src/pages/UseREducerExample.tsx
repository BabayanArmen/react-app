import { useReducer, useState } from "react";

export interface ReducerExampleItem { 
    text: string, 
    isComplited: boolean 
};

export interface ReducerState {
    items: ReducerExampleItem[];
}

function reducer( state: ReducerState, action: any) {
   
    switch (action.type) {
        case "add":
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case "remove":
            return {
                ...state,
                items: state.items.filter(x => x.text.toLowerCase().trim() != action.payload.text.toLowerCase().trim())
            };

        default:
            return state;
    }

}

export function UseReduserExample() {

    const [text, setText] = useState<string>('')

    const [state, dispatch] = useReducer(reducer, { items : [] })

    const addItem = () => {
        
        if (text.trim() == '') {
            return;
        }

        dispatch({
            type: "add",
            payload: {
                text: text,
                isComplited: false
            }
        })

        setText("");
    }

    const removeItem = (item: ReducerExampleItem) => {
        dispatch({
            type: 'remove',
            payload: {
                text: item.text,
                isComplited: item.isComplited
            }
        })
    }

    return (
        <>
        <div>
            <input type="text" value={text} onChange={(event: any) => setText(event.target.value)}  />
            <button onClick={() => addItem()}>Add</button>
        </div>
            <ul>
                {state.items.map((item, index) => (
                    <li key={index}>
                        <span>{item.text}</span>
                        <button onClick={() => removeItem(item)}>remove</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

 