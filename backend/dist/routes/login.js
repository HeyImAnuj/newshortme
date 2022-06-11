"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserStore_1 = require("../store/UserStore");
const constants_1 = require("../constants");
exports.default = ({ body: { email, password } }, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        return res.status(400).send({ message: 'missing email or password!' });
    email = email.trim().toLowerCase();
    password = password.trim();
    const user = UserStore_1.UserStore.find(user => user.email === email);
    if (!user)
        return res.status(401).send({ message: 'no user found, register instead!' });
    const validate = yield bcrypt_1.default.compare(password, user.password);
    if (!validate)
        return res.status(401).send({ message: 'invalid credentials!' });
    const { isAdmin } = user;
    const token = jsonwebtoken_1.default.sign({ email, isAdmin }, constants_1.JWT_SECRET);
    return res.status(302).header("xauth", token).send({ message: 'user logged in successfully!', token });
});
