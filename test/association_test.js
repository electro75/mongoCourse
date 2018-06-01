const mongoose = require('mongoose');
const assert = require('assert');

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

        /*  in the line 17 mongoose takes care by 
            only associating the with the user
            and not push the entire model like its done
            while creating a new 'post'. Same for line 18. 
            on line below, since the reference to user in
            comment is not a 'collection' it is directly
            equated to user instance and mongoose handles 
            the rest.*/
        comment.user = joe;

        // below line takes array of promises and executes .then 
        // only when all have been settled. Promises are executed 
        // in parallel.
        Promise.all([ joe.save(), blogPost.save(), comment.save() ])        
               .then(()=> done());
    });


    // it.only is used to only run a particular test.
    it('saves a relation between a user and a blogpost', (done)=>{
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            .then((user)=>{
                assert(user.blogPosts[0].title === 'JS is fun.');
                done();
            }
        );
    });

    it('saves a full relation graph', (done)=>{
        User.findOne({name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }   
                }
            }
        )
        .then((user)=>{
            assert(user.name === 'Joe');
            assert(user.blogPosts[0].title === 'JS is fun.');
            assert(user.blogPosts[0].comments[0].content === 'This is my first post btw.');
            assert(user.blogPosts[0].comments[0].user.name === 'Joe');

            done();
        })
    })
});