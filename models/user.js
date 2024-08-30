const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image: {
        url: String,
        filename: String
    },
    resumePath: {
        url: String,
        filename: String
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    },
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    next();
});

const User = mongoose.model('User',UserSchema);
module.exports = User;