const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is working');
});

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected!');
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();