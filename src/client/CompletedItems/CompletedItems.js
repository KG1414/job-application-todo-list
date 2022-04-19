const CompletedItems = ({ id, description, completed, deleteItem, toggleDone }) => {
    if (completed) {
        return (
            <div id={id} className="ui relaxed divided list">
                <div className="item">
                    <div className="content">
                        <input
                            type="checkbox"
                            checked={completed ? true : false}
                            onChange={(e) => toggleDone(e, id)}>
                        </input>
                        <div className="header">{description}</div>
                        <div className="description">{completed ? "completed" : "to be completed"}</div>
                        <div className="description">Updated 10 mins ago</div>
                        <button onClick={() => deleteItem(id)}>X</button>
                    </div>
                </div>
            </div>
        )
    };
};

export default CompletedItems;