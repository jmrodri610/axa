require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { name, version } = require('./package.json');

const { argv: [, , port], env: { PORT = port || 8080 } } = process;


const { login, clients, policies } = require('./routes')

const api = express();

api.use(bodyParser.json());

api.use('/login', login)
api.use('/clients', clients)
// api.use('/policies', policies)

api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));