module.exports = function(req)
{
	var api = req.path;

	if(!api.match(/^[a-zA-Z0-9\-\/%]+$/))
		return null;

	api = api.toLowerCase();

	if(api.match(/\/results/g) && (typeof req.param('query') != 'undefined'))
	{
		// api = req.param('query').toLowerCase().replace(/%20/g, ' ').replace(/\+/g, ' ').replace(/%/g, '');
		// console.log(api);

		return api;
	}
	else if(api.match(/\/path\//g))
	{
		api = api.replace('\/path\/', '').replace(/%/g, '');
		
		if(api == 'about' || api == 'help' || api == 'terms' || api == 'submit' || api == 'support' || api == 'privacy')
		{
			return api;
		}
		else if(api == 'sitemap')
		{
			return 'sitemap.xml';
		}
	}

	return null;
}
