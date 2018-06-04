const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', ()=>{

    let joe, blogPost;

    beforeEach((done)=>{
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ 
            title: 'JS is fun.',
            content: 'I like JS better than other stuff.'
        });
        joe.blogPosts.push(blogPost);

        Promise.all([ joe.save(), blogPost.save() ])        
               .then(()=> done());
    });

    it('clean up blogposts of deleted users', (done)=>{
        joe.remove()
            .then(()=> BlogPost.count())
            .then((count)=>{
                assert(count === 0)
                done();
            })
    })
})