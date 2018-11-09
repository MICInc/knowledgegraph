module.exports = function(res, path, fileName)
{
  if(fileName === null)
  {
    fileName = '404.html';
    path = '/path/';
  }

  var options = 
  {
    root: __dirname + path,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
	};


  //console.log("path: "+path+fileName);

  res.sendfile(fileName, options, function (err) 
  {
    if (err) 
    {
      console.log(err);
      res.status(err.status).end();
    }
  });
}