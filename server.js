const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('front-end/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log('server started on port' + PORT) });