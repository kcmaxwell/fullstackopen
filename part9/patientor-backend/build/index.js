"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
app.use(cors()); // eslint-disable=line @typescript-eslint/no-unsafe-call
app.use(express_1.default.json());
const PORT = 3001;
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
