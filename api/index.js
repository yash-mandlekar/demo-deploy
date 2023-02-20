require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
app.use(require("cors")());
app.get("/api/test", (req, res) => {
    res.json(
        `Backend api hit on ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
});

if (process.env.API_PORT) {
    app.listen(process.env.API_PORT, console.log("server running.."));
}
module.exports = app;
