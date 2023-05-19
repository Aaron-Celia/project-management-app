const mongoose = require('mongoose');
const { Schema } = mongoose;

const columnsSchema = new Schema({
    // _id: {
    //     type: Schema.Types.ObjectId,
    //     auto: true
    // },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    },
    tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Tables',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    datatype: {
        type: String,
        enum: ['string', 'float', 'integer', 'boolean', 'date', 'array', 'uuid']
    },
    isNullable: Boolean,
    isUnique: Boolean,
    isPrimaryKey: Boolean,
    isForeignKey: Boolean,
    foreignTable: {
        type: Schema.Types.ObjectId,
        ref: 'Tables'
    },
    foreignColumn: {
        type: Schema.Types.ObjectId,
        ref: 'Columns'
    },
});

const Columns = mongoose.model('Columns', columnsSchema);
module.exports = Columns;
