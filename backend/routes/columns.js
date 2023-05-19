const Columns = require("../mongo/schemas/Columns");

const router = require("express").Router();

router.post("/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const { tableId } = req.body;
		const column = await Columns.create({
			projectId,
			tableId,
			name: "Sample Column",
			description: "sample description",
			datatype: 'string',
			isNullable: false,
			isUnique: false,
			isPrimaryKey: true,
			isForeignKey: false,
		});
		res.json({
			success: true,
			data: {
				column
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
