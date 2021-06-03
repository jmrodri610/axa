require('dotenv').config();
const express = require('express');
const { name, version } = require('./package.json');

const { argv: [, , port], env: { PORT = port || 8080 } } = process;

const api = express();

api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));