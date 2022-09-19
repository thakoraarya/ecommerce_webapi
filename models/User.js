const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true, },

}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);

// userSchema.methods.generateAuthToken = async function() {
//     const user = this
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
//     user.tokens = user.tokens.concat({ token })
//     await user.save()
//     return token
// }