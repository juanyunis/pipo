var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('../config/logger');

/*
 * Things to add...
 * Salt
 * MD5 Hash of Original Message
 *
 * These messages could still be changed at the server so this might should be
 * based on the admin certificate in some way. Short messages would be much easier
 * to brute force without a salt but the salt would also be stored so it makes this
 * difficult.
 */

var messageSchema = new Schema({
  date: { type: Date, default: new Date() },
  _fromUser: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  fromUser: { type: String },
  _toUsers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User", default: [] }],
  toUsers: [{ type: String }],
  encryptedMessage: { type: String }
});

messageSchema.statics.sanatize = function sanatize(message, callback) {
  var toUsersArray = [];

  if (message._toUsers.length > 0) {
    message._toUsers.forEach(function(toUser) {
      toUsersArray.push(toUser._id.toString());
    });
  }

  var sanatizedMessage = {
    date: message.date,
    _fromUser: message._fromUser,
    fromUser: message.fromUser,
    _toUsers: toUsersArray,
    encryptedMessage: message.encryptedMessage
  };

  return callback(sanatizedMessage);
};

module.exports = mongoose.model('Message', messageSchema);