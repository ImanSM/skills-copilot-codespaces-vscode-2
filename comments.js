// Create web server
// Create a comment
// Get all comments
// Get a comment by id
// Delete a comment
// Update a comment
// Create a comment schema

const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./comments.js');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/comment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.post('/comments', async (req, res) => {
  const { author, content } = req.body;
  const comment = new Comment({ author, content });
  await comment.save();
  res.json(comment);
});

app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  res.json(comment);
});

app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.json({ message: 'Comment deleted' });
});

app.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  const comment = await Comment.findByIdAndUpdate(
    id,
    { author, content },
    { new: true }
  );
  res.json(comment);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Comment Schema