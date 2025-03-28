const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('./models/todo');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// API to save a todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({
            task: req.body.task,
            completed: req.body.completed || false
        });
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(500).send({ error: 'Failed to save todo' });
    }
});

// API to fetch all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch todos' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Secondary app running on http://localhost:${PORT}`);
});