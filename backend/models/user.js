const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requried: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // The passwordHash should not be revealed
    delete returnedObject.passwodHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
