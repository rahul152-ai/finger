"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const dashboard_1 = require("../controllers/dashboard");
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
router.get("/", isAuthenticated_1.default, dashboard_1.dashboardController);
exports.default = router;
