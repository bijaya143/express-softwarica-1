const mongoose = require('mongoose');

// const connectDB = mongoose.connect(process.env.MONGO_URI).then((response => {console.log('Database connected.')})).catch((error) => {console.log('error')}) // Database Connection
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then((response => {console.log('Database connected.')})).catch((error) => {console.log('error')})
}

module.exports = connectDB;