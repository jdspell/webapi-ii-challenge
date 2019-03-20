const express = require('express');

const db = require('./db.js');


const router = express.Router();

//fetches the posts
router.get('/', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

//creates a new post in the database
router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body;
        if(!title || !contents) {
            return res.status(404).json({ errorMessage: "Please provide title and contents for the post." });
        }

        const posts = await db.insert(req.body);
        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

//fetches a specific post by using its ID
router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        
        if(post.length > 0){
            return res.status(200).json(post);
        } else {
            return res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        
    } catch (error) {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

//deletes a post using its ID
router.delete('/:id', async (req, res) => {
    try {
        const count = await db.remove(req.params.id);

        if(count > 0) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        
    } catch (error) {
        res.status(500).json({ error: "The post could not be removed" });
    }
});

//updates a post 
//needs parameters of id and updated body of the post
router.put('/:id', async (req, res) => {
    try {
        const { title, contents } = req.body;
        const count = await db.update(req.params.id, req.body);
        
        if(!title || !contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        } else if(count > 0) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        
    } catch (error) {
        res.status(500).json({ error: "The post information could not be modified." });
    }
});

module.exports = router;