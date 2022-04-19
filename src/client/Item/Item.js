const Item = ({ id, description, completed }) => {
    return (
        <div className="ui relaxed divided list">
            <div className="item">
                <div className="content">
                    <div className="header">{description}</div>
                    <div className="description">{completed}</div>
                    <div className="description">Updated 10 mins ago</div>
                </div>
            </div>
        </div>
    );
};

export default Item;