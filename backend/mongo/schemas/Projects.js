const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectsSchema = new Schema({
	// _id: {
	// 	type: Schema.Types.ObjectId,
    //     auto: true
	// },
    deviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Devices',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    components: [{ type: Schema.Types.ObjectId, ref: 'Components' }],
    functions: [{ type: Schema.Types.ObjectId, ref: 'Functions' }],
    tables: [{ type: Schema.Types.ObjectId, ref: 'Tables' }],
});

const Projects = mongoose.model('Projects', projectsSchema);
module.exports = Projects;
