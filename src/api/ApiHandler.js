const { getItems, addOrUpdateItem, deleteItem, updateItem } = require("../db/Mongo")

exports.list = async (req, res, next) => {
    const result = await getItems();
    res.json({ status: "Success", results: result })
};

exports.addOrUpdate = async (req, res) => {
    // Hmm, this function doesn't have any validation...

    if (!req.headers["content-type"] || req.headers["content-type"] !== "application/json") {
        console.log("content-type not application/json")
        return res.json({ status: "Error", message: "content-type must be application/json" })
    }
    try {
        const result = await addOrUpdateItem(req.body);
        res.json({ status: "Success", result: result });
    } catch (error) {
        return res.json({ status: "Error", message: error.message })
    }
};

exports.remove = async (req, res) => {
    try {
        const result = await deleteItem(req.params);
        res.json({ status: "Success. Item Deleted", result: result });
    } catch (error) {
        return res.json({ status: "Error", message: error.message })
    }
};

exports.update = async (req, res) => {
    try {
        const result = await updateItem(req.params, req.body);
        res.json({ status: "Success. Updated", result: result });
    } catch (error) {
        return res.json({ status: "Error", message: error.message })
    }
};
