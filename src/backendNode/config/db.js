const mongoose = require('mongoose');
const dbUrl = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbUrl, {useNestedStrict: true})
        .then(() => {
            console.log(`Mongo connected on ${dbUrl} `)
        }).catch((err) =>{
           console.log(`Connection Error: ${err}`)
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Mongo is disconnected`);
            process.exist(0).then(r => console.log(`Close Process`));
        });
    });
}