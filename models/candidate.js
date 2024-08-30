const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const candidateSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },

});

candidateSchema.plugin(passportLocalMongoose,{
    usernameField: 'email'
});

module.exports = mongoose.model('Candidate', candidateSchema);