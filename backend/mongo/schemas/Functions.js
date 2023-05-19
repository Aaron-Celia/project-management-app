const mongoose = require('mongoose');
const { Schema } = mongoose;

const functionsSchema = new Schema({
    // _id: {
    //     type: Schema.Types.ObjectId,
    //     auto: true
    // },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    componentId: {
        type: Schema.Types.ObjectId,
        ref: 'Components'
    },
    isHelper: Boolean
});

const Functions = mongoose.model('Functions', functionsSchema);
module.exports = Functions;