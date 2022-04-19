import { useState, useEffect } from "react";

const Items = () => {
    const [toDos, setToDos] = useState([]);

    const fetchToDoItems = async () => {
        const response = await fetch("http://localhost:8088/api/items");
        const data = await response.json();
        console.log("All data", data);
        console.log("Results", data.results);
        setToDos(data)
    };

    useEffect(() => {
        fetchToDoItems();
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(toDos.results, null, 2)}</pre>
        </div>
    );
};

export default Items;