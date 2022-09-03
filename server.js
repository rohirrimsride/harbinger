const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harbingerDB', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));