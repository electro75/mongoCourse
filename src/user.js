const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({                         // creates the schema
    name: String
});

const User = mongoose.model('user', UserSchema);        // creates the model

module.exports = User;                                  // exports the model