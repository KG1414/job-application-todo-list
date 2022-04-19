const Item = ({ id, description, completed, deleteItem }) => {
    return (
        <div id={id} className="ui relaxed divided list">
            <div className="item">
                <div className="content">
                    <div className="header">{description}</div>
                    <div className="description">{completed}</div>
                    <div className="description">Updated 10 mins ago</div>
                    <button onClick={() => deleteItem(id)}>X</button>
                </div>
            </div>
        </div>
    );
};

export default Item;