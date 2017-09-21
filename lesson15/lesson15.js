const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

const Cat = mongoose.model('Cat', {
    name: String,
    friends: [String],
    age: Number
})

const kitty = new Cat({name: 'Hotown', friends:['1', '2']})
kitty.age = 20

kitty.save(function(err) {
    if(err) {
        console.error(err)
    }
    console.log('meow')
})