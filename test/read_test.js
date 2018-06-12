const assert = require('assert');
const User = require('../src/user');

describe('Reading Users from database', ()=>{
    let john, santosh, surekha, ramesh;

    beforeEach((done)=>{


        john = new User({name: 'John'});
        santosh = new User({name: 'Santosh'});
        surekha = new User({name: 'Surekha'});
        ramesh = new User({name: 'Ramesh'});

        Promise.all([ santosh.save(), john.save(), surekha.save(), ramesh.save()])
                .then(()=>{
                    done();
            })
    })

    it('Finds all Users with name of John', (done)=>{
        User.find({name: 'John'})
            .then((users)=>{
                assert(users[0]._id.toString() === john._id.toString());
                done();
            })
    });

    it('Finds a User with a particular id', (done)=>{
        User.findOne({ _id: john._id })
            .then((user)=>{
                assert(user.name === 'John')
                done();
            });
    });

    it('can skip and limit the res', (done)=>{
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)          // will only fetch user2 and user3.
            .then((users)=>{
                assert(users.length === 2)
                assert(users[0].name === 'Ramesh')
                assert(users[1].name === 'Santosh')
                done();
            })
    })
});