const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("JobTrack Pro Server is working!");
});

app.get("/jobs", (req, res) => {
    res.send("All Jobs");
});

app.post("/jobs", (req, res) => {
    console.log(req.body);

    res.send("Job added successfully");
});

const server = app.listen(5000, () => {
    console.log("Server started!");
});

server.on("error", (error) => {
    console.log("SERVER ERROR:", error);
});

server.on("close", () => {
    console.log("SERVER CLOSED!");
});