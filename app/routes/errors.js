/*
	Error code handling

	Todo:
	http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management
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

    sender(res, '/path/', '404.html');
}