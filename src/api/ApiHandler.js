const { getItems, addOrUpdateItem, deleteItem } = require("../db/Mongo")

let ApiHandler = class {
    async handleListRequest(req, res) {
        const result = await getItems();
        res.json({ status: "Success", results: result })
    };

    async handleUpdateRequest(req, res) {
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

    async handleDeleteRequest(req, res) {
        try {
            const result = await deleteItem(req.params);
            res.json({ status: "Success. Item Deleted", result: result });
        } catch (error) {
            return res.json({ status: "Error", message: error.message })
        }
    };

};

module.exports = ApiHandler;
