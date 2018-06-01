const mongoose = require('monggose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;