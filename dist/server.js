"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1.default)();
// const customLogger = (req: Request, res: Response, next: Function) => {
//     const start = Date.now();
//     res.on('finish', () => {
//         const duration = Date.now() - start;
//         console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
//     });
//     next();
// }
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(customLogger);
app.get('/', function (req, res, next) {
    setTimeout(function () {
        next(new Error('oops! something went wrong'));
    }, 1000);
});
app.get('/health', function (req, res) {
    res.status(200).json({ message: 'Server is healthy!' });
});
app.use('/api', auth_1.protect, router_1.default);
app.post('/user', user_1.createNewUser);
app.post('/signin', user_1.signin);
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    }
    else {
        res.status(500).json({ message: 'Oops, something went wrong!' });
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map