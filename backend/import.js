// code from https://coderwall.com/p/th6ssq/absolute-paths-require
const path = require('path');

global.base_dir = __dirname;
global.abs_path = function(rel_dir) {
	return path.join(base_dir, rel_dir);
}

global.include = function(file) {
	return require(abs_path(file));
}