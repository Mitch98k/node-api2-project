// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');
const router = express.Router();

router.get('/api/posts', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({ message: "The posts information could not be retrieved" });
    }
});

router.get('/api/posts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            res.status(200).json(post);
        }
    } catch(err) {
        res.status(500).json({ message: "The post information could not be retrieved" });
    }
});

router.post('/api/posts', async (req, res) => {
    const {title, contents} = req.body;
    try {
        if (!title || !contents) {
            res.status(400).json({ messge: "Please provide title and constents for the post" });
        } else {
            const post = await Posts.insert({title, contents});
            const newPost = await Posts.findById(post.id);
            res.status(201).json(newPost);
        }
    } catch(err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
    }
});

router.put('/api/posts/:id', async (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;
    
    if (!title || !contents) {
        res.status(400).json({ message: "PLease provide title and contents for the post" });
    } else {
        try {
            const post = await Posts.update(id, {title, contents});
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                const updPost = await Posts.findById(id);
                res.status(200).json(updPost);
            }
        } catch(err) {
            res.status(500).json({ message: "The post information could not be modified" });
        }
    }
});

router.delete('/api/posts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            await Posts.remove(id);
            res.json(post);
        }
    } catch(err) {
        res.status(500).json({ message: "The post could not be removed" });
    }
});

router.get('/api/posts/:id/comments', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            const comments = await Posts.findPostComments(id);
            res.status(200).json(comments);
        }
    } catch(err) {
        res.status(500).json({ message: "The comments information could not be retrieved" });
    }
});

module.exports = router;

