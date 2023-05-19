const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Projects = require("../mongo/schemas/Projects");
const Components = require('../mongo/schemas/Components');
const Functions = require('../mongo/schemas/Functions');
const Tables = require('../mongo/schemas/Tables');

router.get("/", async (req, res) => {
	try {
        let { deviceId } = req.query;
		const projects = await Projects.find({
                deviceId
        });
		res.json({
			success: true,
			data: {
				projects
			}
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			error: err
		});
	}
});

router.get("/:projectId", async (req, res) => {
	try {
        const { deviceId } = req.query;
        const { projectId } = req.params;
		const project = await Projects.find({
                deviceId,
                _id: projectId
        });
        console.log('🔮project: ', project);
		res.json({
			success: true,
			data: {
				project: project[0]
			}
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			error: err
		});
	}
});

router.get("/:projectId/components", async (req, res) => {
	try {
        const { deviceId } = req.query;
        const { projectId } = req.params;
		const components = await Components.find({
                deviceId,
                _id: projectId
        });
		res.json({
			success: true,
			data: {
				components
			}
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			error: err
		});
	}
});

router.get("/:projectId/functions", async (req, res) => {
	try {
        const { deviceId } = req.query;
        const { projectId } = req.params;
		const functions = await Functions.find({
                deviceId,
                _id: projectId
        });
		res.json({
			success: true,
			data: {
				functions
			}
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			error: err
		});
	}
});

router.get("/:projectId/tables", async (req, res) => {
	try {
        const { deviceId } = req.query;
        const { projectId } = req.params;
		const tables = await Tables.find({
                deviceId,
                _id: projectId
        });
		res.json({
			success: true,
			data: {
				tables
			}
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			error: err
		});
	}
});

router.post("/", async (req, res) => {
	try {
		const { projectName, deviceId } = req.body;
        let newProject;
        let nameArray = projectName.split(' ');
        nameArray.map(word => {
            let arr = word.split('');
            let firstLetter = arr.shift();
            firstLetter = firstLetter.toUpperCase();
            arr.unshift(firstLetter);
            return arr.join('');
        })
        const name = nameArray.join(' ');
        console.log('name after modification: ', name);
		if (req.body.projectDescription) {
            let array = req.body.projectDescription.split('')
            array[0].toUpperCase();
            description = array.join('');
			newProject = await Projects.create({
				name,
				description,
				deviceId
			});
		} else {
			newProject = await Projects.create({
				name,
				deviceId
			});
		}
		res.json({
			success: true,
			data: {
				project: newProject
			}
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			error: err
		});
	}
});

router.delete('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log('project Id in DELETE route: ', projectId);
        await Projects.deleteOne({
            _id: projectId
        });
        const allProjects = await Projects.find();
        res.json({
            success: true,
            data: {
                projects: [...allProjects] ///////////////////// if the find method already returns an array, be careful, then you are possibly** returning a nested array
            }
        });
    } catch(err){
        console.log('error: ', err);
        res.json({
            success: false,
            error: err
        })
    }
});

router.put('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { description } = req.body;
        console.log('BACKEND PROJECT ID: ', projectId);
        console.log('BACKEND DESCRIPTION: ', description);
        await Projects.updateOne({
            _id: projectId
        }, {
            description: description
        })
        const allProjects = await Projects.find();
        console.log('new updated all projects: ', allProjects);
        res.json({
            success: true,
            data: {
                projects: [...allProjects] ///////////////////// if the find method already returns an array, be careful, then you are possibly** returning a nested array
            }
        });
    } catch(err){
        console.log('error: ', err);
        res.json({
            success: false,
            error: err
        })
    }
});



module.exports = router;
