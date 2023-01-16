const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder for later
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network',
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority"
  }
);

// log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));