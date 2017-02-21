var mongoose = require('mongoose');
var schema_url = 'mongodb://localhost:27017/titanic';
if (!mongoose.connection.db) {
    mongoose.connect(schema_url, function (err) {
        if (err) console.log(JSON.stringify(err));
        else console.log('Connected: ' + schema_url);
    });
}
var Schema = mongoose.Schema;

/* User Schema */
var userSchema = new Schema({
    username: {
        type: String,
        index: {
            unique: true
        },
        required: true
    }, // Username
    password: {
        type: String,
        required: true
    }, // Encrypted password
    salt: {
        type: String,
        required: true
    }, // Salt used to encrypt the user's password
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
});
var User = mongoose.model('User', userSchema);

var formSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    port: {
        type: String,
        required: true
    },
    num_siblings_spouses: {
        type: Number,
        required: true
    },
    num_parents_children: {
        type: Number,
        required: true
    },
    survived: {
        type: Boolean,
        required: false
    }
});
var Form = mongoose.model('Form', formSchema);

module.exports = {
    User: User,
    Form: Form
};
