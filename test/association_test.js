const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', ()=>{
    let joe, blogPost, comment;         // intialise instances

    beforeEach((done)=>{
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ 
            title: 'JS is fun.',
            content: 'I like JS better than other stuff.'
        });
        comment = new Comment({ content: 'This is my first post btw.'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);

        /*  in the above lines mongoose takes care by 
            only associating the blogPost with the user
            and not push the entire model. */

        comment.user = joe;
    });
});