require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { name, version } = require('./package.json');

const { argv: [, , port], env: { PORT = port || 8080, SECRET, TOKEN_EXP } } = process;
const { authenticateUser } = require('./logic')

const api = express();
api.use(bodyParser.json());

api.post('/login', async (req, res)=> {
    const {username, password} = req.body;
    try { 
    
        const id = await authenticateUser(username, password)
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: TOKEN_EXP })

        res.json({ token })
        
    } catch ({message}) {
        return res.status(401).json(message)
    }
})

api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));