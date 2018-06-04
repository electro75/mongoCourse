const mongoose = require('mongoose');
const PostSchema = require('./post');
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
    posts: [ PostSchema ],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function(next) {
    return this.posts.length;
});

UserSchema.pre('remove', function () {
    const BlogPost = mongoose.model('blogPost');

    BlogPost.remove({ _id: { $in: this.blogPosts } })
            .then(()=> next());
});

const User = mongoose.model('user', UserSchema);        // creates the model

module.exports = User;                                  // exports the model