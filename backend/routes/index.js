const router = require('express').Router();

router.use('/projects', require('./projects'));
router.use('/devices', require('./devices'));
router.use('/components', require('./components'));
router.use('/columns', require('./columns'));
router.use('/functions', require('./functions'));
router.use('/props', require('./props'));
router.use('/tables', require('./tables'));

module.exports = router;