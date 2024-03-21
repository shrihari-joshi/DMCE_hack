const mongoose = require('mongoose');

const CONNECTION_URL = "mongodb+srv://mayur:mayur123@cluster0.pxcsm3r.mongodb.net/secure-meet?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit with error code
    }
}

module.exports = connectDB;
