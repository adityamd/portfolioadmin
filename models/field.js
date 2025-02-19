const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    allFields: {
        type: Object,
        required: [true, 'Please enter the description of the field']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Field', fieldSchema)