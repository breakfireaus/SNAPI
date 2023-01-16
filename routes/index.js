const router = require('express').Router();
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

router.use((req, res) => {
  res
    .status(404)
    .send(
      `<h2>You are searching for something that has not been created. 404 Error!</h2>`
    );
});

module.exports = router;
