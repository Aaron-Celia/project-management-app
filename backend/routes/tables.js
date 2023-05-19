const Tables = require("../mongo/schemas/Tables");

const router = require("express").Router();

router.post("/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const table = await Tables.create({
			projectId,
			name: "Sample Table",
			description: "sample description",
		});
		res.json({
			success: true,
			data: {
				table
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