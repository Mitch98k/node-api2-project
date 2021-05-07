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
            const newPost = await Posts.insert({title, contents});
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
            const updPost = await Posts.update(id, {title, contents});
            if (!updPost) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                res.status(200).json(updPost);
            }
        } catch(err) {
            res.status(500).json({ message: "The post information could not be modified" });
        }
    }
});

router.delete('/api/posts/:id', async (req, res) => {
    const {id} = req.body;
    try {
        const delPost = await Posts.remove(id);
        if (!delPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            res.status(204).json(delPost);
        }
    } catch(err) {
        res.status(500).json({ message: "The post could not be removed" });
    }
});

module.exports = router;

