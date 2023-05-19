const mongoose = require('mongoose');
const { Schema } = mongoose;

const tablesSchema = new Schema({
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
    columns: [{ type: Schema.Types.ObjectId, ref: 'Columns' }]
});

const Tables = mongoose.model('Tables', tablesSchema);
module.exports = Tables;