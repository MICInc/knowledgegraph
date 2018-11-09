module.exports = function(router, conn)
{
  //filter apis
  var filter     = require('./filter');
  var sender     = require('./sender');
  var searchMove = require('./search');


  router.get('/robots.txt', function(req, res)
  {
    sender(res, '/path/', 'robots.txt');
  });

  router.get('/path/*', function(req, res)
  {
    var fileName = filter(req);
    
    if (fileName.match(/about/))
    {
      searchMove(fileName, res, conn, false);
    }
    else
    {
      sender(res, '/path/', fileName);
    }
  });

  router.get('/category/*', function(req, res) 
  {
    searchMove(filter(req), res, conn, false);
  });

  router.get('/move/*', function(req, res) 
  {
    var move = filter(req).replace(/\/move\//, '');
    //console.log(move);
    searchMove(move, res, conn, false);
  });

  router.get('/api/browse/*', function(req, res) 
  {
    	var fileName = req.originalUrl.replace('/api/browse/', '');

      sender(res, '/vids', fileName);
  });

  router.get('/results*', function(req, res) 
  {   
      var query_move = filter(req);

      if(query_move != null && query_move.length > 1)
      {
          query_move = '%'+query_move+'%';
      }

      searchMove(query_move, res, conn, true);
  });
};