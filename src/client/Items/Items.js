import { useState, useEffect } from "react";
import Item from "../Item/Item";

const Items = () => {
    const [toDos, setToDos] = useState([]);
    const [input, setInput] = useState("");

    const fetchToDoItems = async () => {
        const response = await fetch("http://localhost:8088/api/items");
        const data = await response.json();
        setToDos(data)
    };

    const addToDo = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8088/api/item", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                description: input,
                completed: false
            })
        });
        fetchToDoItems();
        setInput("");
    };

    const deleteItem = async (id) => {
        await fetch(`http://localhost:8088/api/items/${id}`, {
            method: "DELETE"
        });
        fetchToDoItems();
    };

    const toggleDone = async (e, id) => {
        e.preventDefault();
        const foundItem = toDos.results.find(todo => todo._id === id);
        await fetch(`http://localhost:8088/api/item/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                description: foundItem.description,
                completed: !foundItem.completed
            })
        });
        fetchToDoItems();
    };

    useEffect(() => {
        fetchToDoItems();
    }, []);

    let allItems = <div>Loading...</div>
    if (toDos !== undefined) {
        allItems = toDos.results?.map(item => {
            const { _id, description, completed } = item;
            return (
                <Item
                    key={_id}
                    id={_id}
                    description={description}
                    completed={completed}
                    deleteItem={deleteItem}
                    toggleDone={toggleDone}
                />
            );
        });
    };

    return (
        <div>
            <form onSubmit={addToDo}>
                <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Add item"></input>
                <button type="submit">Add Task</button>
            </form>
            {allItems}
            <pre style={{ textAlign: "left" }}>{JSON.stringify(toDos.results, null, 2)}</pre>
        </div>
    );
};

export default Items;