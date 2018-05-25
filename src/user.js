const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({                         // creates the schema
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number
});

const User = mongoose.model('user', UserSchema);        // creates the model

module.exports = User;                                  // exports the model