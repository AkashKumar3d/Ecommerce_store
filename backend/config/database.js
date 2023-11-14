const mongoose = require('mongoose');

const connectdatabase = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
        console.log(`mongodb connected with server ${res.connection .host}`)
    })
    // .catch((err) => {
    //     console.log(`mongodb connection error: ${err}`)
    // })
}

module.exports = connectdatabase
