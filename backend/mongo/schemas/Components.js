const mongoose = require('mongoose');
const { Schema } = mongoose;

const componentsSchema = new Schema({
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
    functions: [{ type: Schema.Types.ObjectId, ref: 'Functions' }],
    props: [{ type: Schema.Types.ObjectId, ref: 'Props' }],
    isNested: Boolean,
    isParent: Boolean,
    parentComponentId: {
        type: Schema.Types.ObjectId,
        ref: 'Components'
    },
    nestedComponents: [{ type: Schema.Types.ObjectId, ref: 'Components' }]
});

const Components = mongoose.model('Components', componentsSchema);
module.exports = Components;