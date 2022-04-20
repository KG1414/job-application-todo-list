import { useState, useEffect } from "react";
import Item from "../Item/Item";
import CompletedItems from "../CompletedItem/CompletedItem";
import Header from "../Header/Header";
import { Input, List } from 'semantic-ui-react'

const Items = () => {
    const [toDos, setToDos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [isActive, setIsActive] = useState(false);

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
                completed: false,
                createdAt: new Date()
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

    const isCompletedHandler = (e, status) => {
        setIsCompleted(status);
        setIsActive(status)
    };

    useEffect(() => {
        fetchToDoItems();
    }, []);

    let incompleteItemsList = <div>There's nothing here...</div>;
    incompleteItemsList = toDos.results?.map(item => {
        const { _id, description, completed, createdAt } = item;
        return (
            <Item
                key={_id}
                id={_id}
                description={description}
                completed={completed}
                createdAt={createdAt}
                deleteItem={deleteItem}
                toggleDone={toggleDone}
            />
        );
    });

    let completedItemsList = <div>There's nothing here...</div>;
    completedItemsList = toDos.results?.map(item => {
        const { _id, description, completed, createdAt } = item;
        return (
            <CompletedItems
                key={_id}
                id={_id}
                description={description}
                completed={completed}
                createdAt={createdAt}
                deleteItem={deleteItem}
                toggleDone={toggleDone}
            />
        );
    });

    return (
        <div>
            <Header isCompletedHandler={isCompletedHandler} isActive={isActive} />
            <List divided verticalAlign='middle'>
                <List.Item>
                    <List.Content floated='left' style={{ marginBottom: "15px" }}>
                        <form onSubmit={addToDo}>
                            <div className="ui action input">
                                <input type="text" placeholder="Add Task..." onChange={(e) => setInput(e.target.value)} value={input} />
                                <button type="submit" className="ui button">Submit</button>
                            </div>
                        </form>
                    </List.Content>
                    <List.Content floated='right'>
                        <Input icon='search' placeholder='Search Tasks...' floated="right" />
                    </List.Content>
                </List.Item>
            </List>
            <List divided verticalAlign='middle'>
                {isCompleted && incompleteItemsList}
            </List>
            <List divided verticalAlign='middle'>
                {!isCompleted && completedItemsList}
            </List>
            <div style={{ height: "120px" }}></div>
        </div>
    );
};

export default Items;