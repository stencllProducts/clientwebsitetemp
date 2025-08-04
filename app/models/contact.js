import mongoose, { Schema } from "mongoose";


const contactSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxLength: [50, "First Name should not be more than 50 characters"],
        minLength: [2, "First Name should be at least 2 characters"]

    },
    last_name: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
        maxLength: [50, "Last Name should not be more than 50 characters"],
        minLength: [2, "Last Name should be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
    },

    message: {
        type: String,
        required: [true, "Message is required."],
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const Contact =
    mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;