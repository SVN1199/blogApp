const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const adminRouter = require('./routes/adminRoute')
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/admin', adminRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;