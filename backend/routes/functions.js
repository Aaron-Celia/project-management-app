const Functions = require("../mongo/schemas/Functions");

const router = require("express").Router();

router.post("/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const func = await Functions.create({
			projectId,
			name: "Sample Function",
			description: "sample description",
			isHelper: false
		});
		res.json({
			success: true,
			data: {
				function: func
			}
		});
	} catch (err) {
		res.json({
			success: false,
			error: err
		});
	}
});

module.exports = router;
