const router = require('express');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>Turn back now, for this way lies certain doom<h1>')
})

module.exports = router;