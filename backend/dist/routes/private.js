"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Info = exports.Shorten = void 0;
const State_1 = require("../store/State");
const UriStore_1 = require("../store/UriStore");
const UserStore_1 = require("../store/UserStore");
const indexOf = (email) => {
    for (let i = 0; i < UserStore_1.UserStore.length; ++i) {
        if (UserStore_1.UserStore[i].email === email) {
            return i;
        }
    }
    return -1;
};
const Shorten = ({ user, body: { uri } }, res) => {
    const key = (0, State_1.getKey)();
    (0, State_1.updateKey)();
    UriStore_1.UriStore[key] = { value: uri, clicked: 0 };
    const idx = indexOf(user.email);
    UserStore_1.UserStore[idx].links.push(key);
    res.status(201).send({ 'uri': key });
};
exports.Shorten = Shorten;
const Info = ({ user }, res) => {
    const idx = indexOf(user.email);
    const { links } = UserStore_1.UserStore[idx];
    const response = [];
    links.forEach(link => {
        response.push(Object.assign({ link }, UriStore_1.UriStore[link]));
    });
    res.status(200).send(response);
};
exports.Info = Info;
const Admin = (_, res) => {
    const response = UserStore_1.UserStore.map(user => user.email);
    res.status(200).send(response);
};
exports.Admin = Admin;
