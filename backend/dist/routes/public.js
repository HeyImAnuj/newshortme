"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UriStore_1 = require("../store/UriStore");
exports.default = (req, res) => {
    const key = req.params.key;
    if (UriStore_1.UriStore[key] == null)
        return res.status(404).send({ 'message': 'no url exists for the shortened url' });
    UriStore_1.UriStore[key].clicked++;
    res.status(301).redirect(UriStore_1.UriStore[key].value);
};
