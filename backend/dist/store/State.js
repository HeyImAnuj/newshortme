"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKey = exports.getKey = void 0;
const constants_1 = require("../constants");
let state = new Array(constants_1.URI_LENGTH).fill('a');
const getKey = () => state.reduce((x, acc) => acc += x);
exports.getKey = getKey;
const updateKey = () => {
    let idx = 0;
    for (let i = 0; i < constants_1.URI_LENGTH; ++i) {
        if (state[i] < 'z') {
            state[i] = String.fromCharCode(state[i].charCodeAt(0) + 1);
            idx = i;
            break;
        }
    }
    for (let i = 0; i < idx; ++i) {
        state[i] = 'a';
    }
};
exports.updateKey = updateKey;
