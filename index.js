const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();

const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user/', userRoute);
app.use('/note/', noteRoute);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}.`);
});
