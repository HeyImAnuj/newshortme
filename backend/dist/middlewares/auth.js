"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
exports.default = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).send({ message: 'Access Denied / Unauthorized request' });
    try {
        token = token.split(' ')[1];
        if (token === 'null' || !token)
            return res.status(401).send({ message: 'Unauthorized request' });
        let user = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
        if (!user)
            return res.status(401).send({ message: 'Unauthorized request' });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};
