import { useState, useEffect } from "react";
import Item from "../Item/Item";
import CompletedItems from "../CompletedItem/CompletedItem";
import Header from "../Header/Header";

const Items = () => {
    const [toDos, setToDos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const fetchToDoItems = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8088/api/items");
            const data = await response.json();
            if (data === undefined) return;
            if (response.status === 200) {
                setToDos(data);
            }
        } catch (err) {
            setError(err.message || "Unexpected Error.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
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

    const isCompletedHandler = (status) => {
        setIsCompleted(status);
    };

    useEffect(() => {
        fetchToDoItems();
    }, []);

    let incompleteItemsList = <div>There's nothing here...</div>;
    incompleteItemsList = toDos.results?.map(item => {
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

    let completedItemsList = <div>There's nothing here...</div>;
    completedItemsList = toDos.results?.map(item => {
        const { _id, description, completed } = item;
        return (
            <CompletedItems
                key={_id}
                id={_id}
                description={description}
                completed={completed}
                deleteItem={deleteItem}
                toggleDone={toggleDone}
            />
        );
    });

    return (
        <div>
            <form onSubmit={addToDo}>
                <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Add item"></input>
                <button type="submit">Add Task</button>
            </form>
            <p onClick={() => isCompletedHandler(false)}>Incomplete</p>
            <p onClick={() => isCompletedHandler(true)}>Completed</p>
            <Header />
            {!isCompleted && incompleteItemsList}
            {isCompleted && completedItemsList}
            {/* <pre style={{ textAlign: "left" }}>{JSON.stringify(toDos.results, null, 2)}</pre> */}
            <div style={{ height: "120px" }}></div>
        </div>
    );
};

export default Items;