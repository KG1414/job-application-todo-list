const { getItems, addOrUpdateItem, deleteItem, updateItem } = require("../db/Mongo");

exports.list = async (req, res) => {
    const result = await getItems();
    res.status(200).json({ status: "Success", results: result });
};

exports.addOrUpdate = async (req, res) => {
    if (!req.body.description || req.body.description === undefined || req.body.description === null) {
        console.log("Please add a non-empty text field");
        return res.json({ status: "Error", message: "Please add a non-empty text field" });
    };
    if (!req.headers["content-type"] || req.headers["content-type"] !== "application/json") {
        console.log("content-type not application/json");
        return res.json({ status: "Error", message: "content-type must be application/json" });
    };
    try {
        const result = await addOrUpdateItem(req.body);
        res.json({ status: "Success", result: result });
    } catch (error) {
        return res.json({ status: "Error", message: error.message });
    };
};

exports.remove = async (req, res) => {
    try {
        const result = await deleteItem(req.params);
        res.json({ status: "Success. Item Deleted", result: result });
    } catch (error) {
        return res.json({ status: "Error", message: error.message });
    };
};

exports.update = async (req, res) => {
    try {
        const result = await updateItem(req.params, req.body);
        res.json({ status: "Success. Updated", result: result });
    } catch (error) {
        return res.json({ status: "Error", message: error.message });
    };
};
