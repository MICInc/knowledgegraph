var express = require('express');
var router = express.Router();

router.get('/about', function(req, res)
{
  searchMove(filter(req), res, conn, false);
});


router.get('/terms', function(req, res)
{
  searchMove(filter(req), res, conn, false);
});


router.get('/privacy', function(req, res)
{
  searchMove(filter(req), res, conn, false);
});


module.exports = router;