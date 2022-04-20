import { useState, useEffect } from "react";
import Item from "../Item/Item";
import Header from "../Header/Header";
import { Input, List } from 'semantic-ui-react';
import ItemPlaceholder from "../../common/components/ItemPlaceholder/ItemPlaceholder";
import './Items.css';

const Items = () => {
    const [toDos, setToDos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        itemsInput: "",
        searchInput: ""
    });
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
            setLoading(false);
        };
    };

    const addToDo = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8088/api/item", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                description: input.itemsInput,
                completed: false,
                createdAt: new Date()
            })
        });
        fetchToDoItems();
        setInput(prevValue => {
            return { ...prevValue, itemsInput: "" }
        });
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

    /////////// This section from below to next comment could be moved into a seperate component - maybe a Factory type file with createItem function ////////////
    let itemsList = <ItemPlaceholder />;
    if (loading && !error && !toDos.results) {
        itemsList = <ItemPlaceholder />
    };
    if (error) {
        itemsList = <p>{error}</p>
    };

    let incompletedItemsResult;
    if (isCompleted && toDos.results !== null && toDos.results !== undefined) {
        incompletedItemsResult = toDos.results.filter(res => res.completed === true);
        const filteredCompletedItemResults = incompletedItemsResult.filter(res =>
            res.description.toLowerCase().includes(input.searchInput.toLocaleLowerCase())
        );
        itemsList = filteredCompletedItemResults.map(item => {
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
    };

    let count = 0;
    if (!isCompleted && toDos.results !== null && toDos.results !== undefined) {
        const completedItemsResult = toDos.results.filter(res => res.completed === false);
        count = completedItemsResult.length;
        const filteredCompletedItemResults = completedItemsResult.filter(res =>
            res.description.toLowerCase().includes(input.searchInput.toLocaleLowerCase())
        );
        itemsList = filteredCompletedItemResults.map(item => {
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
    };
    ////////////////////// Refer to above comment ////////////////////////////////////////////////////////

    useEffect(() => {
        fetchToDoItems();
        return () => console.log('unmounting...');
    }, []);

    return (
        <div>
            <Header isCompletedHandler={isCompletedHandler} isActive={isActive} />
            {!isCompleted ? <p className="header__count">{count} items left to complete</p> : <p style={{ height: "14px", marginBottom: "20px" }}></p>}
            <List divided verticalAlign='middle'>
                <List.Item className="input__section">
                    <List.Content floated='left' style={{ marginBottom: "15px" }}>
                        <form onSubmit={addToDo}>
                            <div className="ui action input">
                                <input
                                    type="text"
                                    placeholder="Add Task..."
                                    onChange={(e) => setInput((prevValue) => ({ ...prevValue, itemsInput: e.target.value }))}
                                    value={input.itemsInput}
                                />
                                <button type="submit" className="ui button">Submit</button>
                            </div>
                        </form>
                    </List.Content>
                    <List.Content floated='right'>
                        <Input
                            icon='search'
                            placeholder='Search Tasks...'
                            floated="right"
                            value={input.searchInput}
                            onChange={(e) => setInput((prevValue) => ({ ...prevValue, searchInput: e.target.value }))}
                        />
                    </List.Content>
                </List.Item>
            </List>
            <List divided verticalAlign='middle'>
                {itemsList}
            </List>
            <div style={{ height: "120px" }}></div>
        </div>
    );
};

export default Items;