const Components = require("../mongo/schemas/Components");

const router = require("express").Router();

router.post('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const component = await Components.create({
            projectId,
            name: 'Sample Component',
            description: 'sample description',
            isNested: false,
            isParent: false,
        })
        res.json({
            success: true,
            data: {
                component
            }
        });
    } catch(err) {
        res.json({
            success: false,
            error: err
        })
    }
})

module.exports = router;
