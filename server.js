const express = require('express');
const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/SNAPI"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder for later
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(
  process.env.MONGODB_URI || mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => 
  {
    if (err) console.log('Unable to connect to the server : ${{err}');
    else
      console.log('MongoDB is connected')
  }
);

// log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));