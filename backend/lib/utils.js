const fs = require('fs');

module.exports = {
  indexOf: function(array, key, target) {
    // target (String) object id
    var index = -1;

    for(var i = 0; i < array.length; i++) if (array[i][key] == target) index = i;

    return index;
  },
  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  uniqueID: function(length=8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  generate_verification_URL: function(innerText='link', hash='', length=128, html=true) {
    if(hash.length == 0) module.exports.uniqueID(length);
    var href = 'https://machineintelligence.cc/verify?c='+hash;
    return html ? '<a href=\"'+href+'\">'+innerText+'</a>' : href;
  },
  base64(file) {
    return fs.readFileSync(file, { encoding: 'base64' }); 
  }
}