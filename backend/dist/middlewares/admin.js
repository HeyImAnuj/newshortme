"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ user }, res, next) => {
    if (user.isAdmin) {
        return next();
    }
    res.status(401).send({ message: 'Unauthorized!' });
};
