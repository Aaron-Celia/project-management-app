const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema({
    // _id: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     auto: true
    // },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }]
});

const Devices = mongoose.model('Devices', deviceSchema);
module.exports = Devices;