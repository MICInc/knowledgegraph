module.exports = function(req)
{
	var api = req.path;

	if(!api.match(/^[a-zA-Z0-9\-\/%]+$/))
		return null;

	api = api.toLowerCase();

	if(api.match(/\/results/g) && (typeof req.param('query') != 'undefined'))
	{
		api = req.param('query').toLowerCase().replace(/%20/g, ' ').replace(/\+/g, ' ').replace(/%/g, '');
		console.log(api);

		if(api.match(/pbar|p-bar/g))
		{
			api = api.replace(/pbar|p-bar/g, 'parallel bar');
		}

		if(api.match(/ë/g))
		{
			api = api.replace(/ë/g, 'e');
		}

		if(api.match(/gaetan|gaetan bouillet|bouillet/g))
		{
			api = api.replace(/gaetan|gaetan bouillet|bouillet/g, 'gaet');
		}
		
		if(api.match(/full out|fullout/g))
		{
			api = api.replace(/full out|fullout/g, 'full-out');
		}		

		if(api.match(/full up|fullup/g))
		{
			api = api.replace(/full up|fullup/g, 'full-up');
		}
		
		if(api.match(/full down|fulldown/g))
		{
			api = api.replace(/full down|fulldown/g, 'full-down');
		}

		if(api.match(/full in|fullin/g))
		{
			api = api.replace(/full in|fullin/g, 'full-in');
		}
		
		if(api.match(/back out|backout/g))
		{
			api = api.replace(/back out|backout/g, 'back-out');
		}

		if(api.match(/\scast\s/g))
		{
			api = api.replace(/\scast\s/g, ' castaway ');
		}

		if(api.match(/td|touch down/g))
		{
			api = api.replace(/td|touch down/g, 'touchdown');
		}

		if(api.match(/atwist/g))
		{
			api = api.replace(/atwist/g, 'a-twist');
		}

		if(api.match(/btwist/g))
		{
			api = api.replace(/btwist/g, 'b-twist');
		}

		if(api.match(/wallflip/g))
		{
			api = api.replace(/wallflip/g, 'wall flip');
		}

		if(api.match(/dub/g))
		{
			api = api.replace(/dub/g, 'double');
		}

		if(api.match(/trip/g))
		{
			api = api.replace(/trip/g, 'triple');
		}

		if(api.match(/kg/g))
		{
			api = api.replace(/kg/g, 'kong gainer');
		}

		if(api.match(/hang/g))
		{
		  api = api.replace(/hang/g, 'hanging');
		}

		if(api.match(/1 hand|one hand/g))
		{
		  api = api.replace(/1 handed|1 hand|one handed|one hand/g, 'one-hand');
		}
		else if(api.match(/2 hand|two hand/g))
		{
		  api = api.replace(/2 handed|2 hand|two handed|two hand/g, 'two-hand');
		}
		else if(api.match(/1 foot|one foot|1 step|one step/g))
		{
		  api = api.replace(/1 footed|1 foot|one footed|one foot|1 step|one step/g, 'one-step');
		}
		else if(api.match(/2 foot|two foot|2 feet|two feet/g))
		{
		  api = api.replace(/2 footed|2 foot|two footed|two foot|2 feet|two feet/g, 'two-foot');
		}
		else if(api.match(/2 step|two step/g))
		{
		  api = api.replace(/2 steps|two steps|2 step|two step/g, 'two-step');
		}
		else if(api.match(/3 step|three step/g))
		{
		  api = api.replace(/3 steps|three steps|3 step|three step/g, 'three-step');
		}
		console.log(api);
		return api;
	}
	else if(api.match(/\/move\//g))
	{
		return req.originalUrl.toLowerCase().replace(/%20/g, ' ').replace(/\+/g, ' ').replace(/%/g, '');
	}
	else if(api.match(/\/category\//g))
	{
		if(api == 'allmoves' || api == 'basicmoves' || api == 'vaultmoves' || api == 'flipmoves' ||
		   api == 'wallmoves' || api == 'barmoves' || api == 'submit' || api == 'about')
		{
			api = api.replace(/move/g, 'Move');
			return api.replace(/\/category\//, '');
		}
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
