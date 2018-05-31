const assert = require('assert');
const User = require('../src/user');

describe('Sub Documents', (done)=>{
    it('can create a subdocument', (done)=>{
        const john = new User({
            name: 'John',
            posts: [{ title: 'PostTitle'}]
        });

        john.save()
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle')
                done();
            })

    });

    it('Can add subdocuments to an existing record', (done)=>{
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               user.posts.push({ title: 'New Post' });
               return user.save();
           })
           .then(() => User.findOne({name: 'Joe'}))
           .then((user)=>{
               assert(user.posts[0].title === 'New Post');
               done();
           })


    });
});