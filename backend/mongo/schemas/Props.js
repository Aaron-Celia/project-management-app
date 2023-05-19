const mongoose = require('mongoose');
const { Schema } = mongoose;

const propsSchema = new Schema({
    // _id: {
    //     type: Schema.Types.ObjectId,
    //     auto: true
    // },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    componentId: {
        type: Schema.Types.ObjectId,
        ref: 'Components'
    },
    name: {
        type: String,
        required: true,
    },
    description: String
});

const Props = mongoose.model('Props', propsSchema);
module.exports = Props;