const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const port = process.env.PORT;

app.use(express.static('.'));

app.listen(port, () => {});
console.log(`Listening on port ${port}`);
