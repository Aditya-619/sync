const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: 'NA' }
});

module.exports = model('Course', courseSchema);

