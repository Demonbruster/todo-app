import express from "express";
import cors from "cors";

import taskModel from "./models/task";

import "./dbConnector";

// constant
const PORT = 5000;

const app = express();

//------------- middleware
// body parser for json
app.use(express.json());
app.use(cors());

// sample endpoint
app.get("/", (req, res) => {
	return res.send("Hey");
});

// sample endpoint
app.get("/test", (req, res) => {
	return res.send("Test123");
});

// sample endpoint
app.get("/test/:id", (req, res) => {
	const { id } = req.params;
	return res.send(`test with Id: ${id}`);
});

app.post("/task", async (req, res) => {
	const { task } = req.body;
	console.log("Task received : ", task);
	if (!task) {
		return res.status(400).send({ error: "The request must include a task" });
	}

	try {
		const newTask = new taskModel({
			name: task,
		});

		await newTask.save();

		return res.send("created");
	} catch (ex) {
		return res.status(500).send({
			error: ex,
		});
	}
});

app.get("/task", async (req, res) => {
	return taskModel
		.find({})
		.then((result) => res.send(result))
		.catch((ex) => {
			return res.status(500).send({
				error: ex,
			});
		});
});

app.get("/task/:id", async (req, res) => {
	const { id } = req.params;

	return taskModel
		.findById(id)
		.then((result) => res.send(result))
		.catch((ex) => {
			return res.status(500).send({
				error: ex,
			});
		});
});

app.put("/task/:id", async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	return taskModel
		.findByIdAndUpdate(id, { name })
		.then((result) => res.send(result))
		.catch((ex) => {
			return res.status(500).send({
				error: ex,
			});
		});
});

app.post("/task/:id/complete", async (req, res) => {
	const { id } = req.params;

	return taskModel
		.findByIdAndUpdate(id, { isCompleted: true })
		.then((result) => res.send(result))
		.catch((ex) => {
			return res.status(500).send({
				error: ex,
			});
		});
});

app.delete("/task/:id", async (req, res) => {
	const { id } = req.params;

	return taskModel
		.findByIdAndDelete(id)
		.then((result) => res.send(result))
		.catch((ex) => {
			return res.status(500).send({
				error: ex,
			});
		});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
