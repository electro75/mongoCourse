const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', ()=>{
    let john;

    beforeEach((done)=>{
        john = new User({name: 'John'})
        john.save()
            .then(()=> done())
    })

    it('Model instance remove', (done)=>{
        john.remove()
            .then(()=> User.findOne({name: 'John'}))
            .then((user)=>{
                assert(user === null)
                done();
            })
    });

    it('Class method remove', (done)=>{
        User.remove({name: 'John'})
            .then(()=> User.findOne({name: 'John'}))
            .then((user)=>{
                assert(user === null)
                done();
            })
    });

    it('Class method findAndRemove', (done)=>{
        User.findOneAndRemove({name: 'John'})
            .then(()=> User.findOne({name: 'John'}))
            .then((user)=>{
                assert(user === null)
                done();
            });
    });

    it('Class method findByIdAndRemove', (done)=>{
        User.findByIdAndRemove(john._id)
            .then(()=> User.findOne({name: 'John'}))
            .then((user)=>{
                assert(user === null)
                done();
        });
    })
})