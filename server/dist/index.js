"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const connectDb_1 = __importDefault(require("./db/connectDb"));
const errorMiddleWare_1 = __importDefault(require("./middleware/errorMiddleWare"));
const batch_1 = __importDefault(require("./routes/batch"));
const student_1 = __importDefault(require("./routes/student"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
(0, connectDb_1.default)();
// Set up API routes
app.use("/api/auth", auth_1.default);
app.use("/api/dashboard", dashboard_1.default);
app.use("/api/batch", batch_1.default);
app.use("/api/student", student_1.default);
// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Route not found",
    });
});
// Function to start the server
function startServer(port) {
    // Check if the provided port is within the valid range
    if (port > 65535) {
        console.error("No available ports in the valid range.");
        return;
    }
    // Start the server
    server
        .listen(port, "0.0.0.0", () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
        .on("error", (err) => {
        // Handle error if the port is already in use
        if (err.code === "EADDRINUSE") {
            console.log(`Port ${port} is already in use, trying next port...`);
            startServer(port + 1); // Try the next port
        }
        else {
            console.error(err);
        }
    });
}
// Start the server on the specified port or default to port 8080
const PORT = parseInt(process.env.PORT || "5000", 10);
startServer(PORT);
app.use(errorMiddleWare_1.default);
