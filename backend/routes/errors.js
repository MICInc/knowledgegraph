/*
	Error code handling
*/
module.exports = function (err, req, res, next) 
{
    var status = err.status || err.statusCode;

    //handles invalid hex encoding in url
    if (typeof status !== 'number' || status >= 500) 
    {
      next(err);
      return;
    }

    // sender(res, '/path/', '404.html');
}