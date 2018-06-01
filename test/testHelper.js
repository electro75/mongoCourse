const mongoose = require('mongoose');

mongoose.Promise = global.Promise;      //Commands mongoose to use Es6 promises.

before((done)=>{                        //Commands Mocha to pause excection untill mongoose has successfully connected to Mongo.
        mongoose.connect('mongodb://localhost/users_test');
        mongoose.connection
                .once('open', ()=>{ done(); })
                .on('error', (error)=>{ console.warn('Warning', error) 
        });
})


beforeEach((done)=>{
        const { users, comments, blogposts } = mongoose.connection.collections
        users.drop(()=>{
                comments.drop(()=>{
                        blogposts.drop(()=>{
                                done();
                        })
                })
        });
});