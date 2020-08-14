const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));



app.use('/api/educators', require('./routes/educator'));
app.use('/api/learners', require('./routes/learner'));
app.use('/api/auth/educator', require('./routes/auth/educator'));
app.use('/api/auth/learner', require('./routes/auth/learner'));
app.use('/api/courses', require('./routes/courses'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log('server started on port' + PORT) });