const express = require("express");

const app = express();
let jobs=[];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("JobTrack Pro Server is working!");
});

app.get("/jobs", (req, res) => {
    res.json(jobs);
});
app.put("/jobs/:id", (req, res) => {
    const jobId = Number(req.params.id);

    const job = jobs.find((job) => job.id === jobId);

    if (!job) {
        return res.status(404).json({
            message: "Job not found"
        });
    }

    Object.assign(job, req.body);

    res.json(job);
});

app.post("/jobs", (req, res) => {
    const newJob = {
        id: jobs.length + 1, //ID jobs.length =0---> 1 ,2
        ...req.body
    };

    jobs.push(newJob);

    res.status(201).json(newJob); //created successfully 
});
app.delete("/jobs/:id", (req, res) => {
    const jobId = Number(req.params.id);

    const jobIndex = jobs.findIndex((job) => job.id === jobId);

    if (jobIndex === -1) {
        return res.status(404).json({
            message: "Job not found"
        });
    }

    const deletedJob = jobs.splice(jobIndex, 1); //splice use to remove 1 item

    res.json({
        message: "Job deleted successfully",
        job: deletedJob[0]
    });
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