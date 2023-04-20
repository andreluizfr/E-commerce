"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: process.env.BASE_URL_WEB_APP,
    credentials: true
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const User_routes_1 = require("./routes/User.routes");
const Product_routes_1 = require("./routes/Product.routes");
const Collection_routes_1 = require("./routes/Collection.routes");
const Payment_routes_1 = require("./routes/Payment.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
if (process.env.NODE_ENV !== "test") {
    const logsDir = path_1.default.join(__dirname, "../logs");
    try {
        fs_1.default.mkdirSync(logsDir);
        console.log('Pasta de logs criada...');
    }
    catch (err) {
        console.log('Pasta de logs já existe...');
    }
    const log = fs_1.default.createWriteStream(path_1.default.join(logsDir, "express.log"), { flags: "a" });
    console.log('Arquivo de logs definido...');
    (0, morgan_body_1.default)(app, {
        logReqUserAgent: false,
        logRequestBody: true,
        stream: log,
        noColors: true,
        logIP: true
    });
    if (process.env.NODE_ENV === "development")
        (0, morgan_body_1.default)(app, {
            logReqUserAgent: false,
            logRequestBody: true,
            logIP: false
        });
}
app.use('/user', User_routes_1.userRouter);
app.use('/product', Product_routes_1.productRouter);
app.use('/collection', Collection_routes_1.collectionRouter);
app.use('/payment', Payment_routes_1.paymentRouter);
exports.default = app;
