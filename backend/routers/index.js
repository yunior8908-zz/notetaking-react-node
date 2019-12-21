const router = require('express').Router();

router.use('/api', require('./api/note'));

module.exports = router;