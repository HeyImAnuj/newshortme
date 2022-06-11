"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const routes_1 = __importDefault(require("./routes"));
const admin_1 = __importDefault(require("./generators/admin"));
(0, admin_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/', express_1.default.static(__dirname + '/public'));
app.use('/', routes_1.default);
app.listen(constants_1.PORT, () => {
    console.log(`Serving on Port : ${constants_1.PORT}`);
});
