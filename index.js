// Import library
const express = require('express') 
const dotenv = require('dotenv')
const connectDB = require('./database/db')
const cors = require('cors');
const multipart = require('connect-multiparty')

const app = express(); // Define application

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

dotenv.config() // Env Configuration

connectDB(); // Database Connection

app.use(express.json()); //JSON middleware
app.use(multipart({
    uploadDir: './public/uploads/'
}));

const port = process.env.PORT || 3600;  // Port

app.listen(port, () => {
console.log(`App running at port: ${port}`)
}) // start server


app.get('/test', (req, res) => {
    res.send('Fine!')
})

app.get('/test-new', (req, res) => {
    res.send('Fine!')
})

app.use('/api/user', require('./routes/userRoutes')) //User Routes
app.use('/api/product', require('./routes/productRoutes')) //Product Routes
app.use('/api', require('./routes/uploadRoutes')) //Upload Routes


