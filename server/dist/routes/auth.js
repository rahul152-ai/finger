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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../validator/auth");
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.post("/login", auth_2.signinValidator, auth_2.handleValidationResult, auth_1.login);
router.post("/create-user", auth_2.signupValidator, auth_2.handleValidationResult, auth_1.signup);
router.get("/profile", isAuthenticated_1.default, auth_1.getProfile);
router.get("/validate", isAuthenticated_1.default, validateUser);
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.userId);
            const user = yield user_1.default.findById(req.userId).select("-password -__v -createdAt -updatedAt");
            if (!user) {
                return res.status(401).json({
                    status: "error",
                    message: "User is not authenticated",
                });
            }
            res.status(200).json({
                status: "success",
                message: "User is authenticated",
                user: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = router;
