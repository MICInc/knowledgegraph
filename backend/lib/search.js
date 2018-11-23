module.exports = function(move, res, pool, isQuery)
{
    function prepareQuery(move)
    {
      function reshapeProgression(moveData)
      {

        if (moveData != null && moveData.length > 0) 
        {
          var reshaped = [];
          var moves = moveData.split(', ');
          
          if(moves.length > 1) {
            
            for(i = 0; i < moves.length; i++) {

              if ((i + 1) % 2 == 0) {
                
                var row = [{name : moves[i - 1], link : moves[i - 1].replace(/ /g, '%20')}, {name : moves[i], link : moves[i].replace(/ /g, '%20')}];
                reshaped.push(row);
              }
            }
          }
          else {
            
            var row = [{name : moveData, link : moveData.replace(/ /g, '%20')}];
            reshaped.push(row);
          }

          return reshaped;
        }
        return null;
      }

      function query()
      {
        if(isQuery)
        {
          if(move.match(/missing/g))
          {
            pool.getConnection(
            function(err, connection) 
            {
              connection.query(
              "select moveName, alias, descript from move as m, clips as c where m.id = c.id and  embed like \"%unavailable.mp4%\";",
              function handleOut(err, result, fields)
              {
                  if(err) throw err;

                  var data = {numResults: result.length,
                              resMessage: "Results for "+move.replace(/%/g, '\"'),
                              moves: result};
                  
                  res.render('results', data);
                  
                  connection.release();
              });
            });
          }
          else
          {
            pool.getConnection(
            function(err, connection) 
            {

              var escapedMove = connection.escape(move).replace(" ", '%');

              connection.query("select moveName, alias, descript, rank from move where moveName like "+ escapedMove +" or alias like "+ escapedMove +";",
              function handleOut(err, result, fields)
              {
                  if(err) throw err;

                  result.sort(function (a,b) 
                  {
                    if (a.rank < b.rank)
                      return -1;
                    if (a.rank > b.rank)
                      return 1;
                    return 0;
                  });

                  var data = result.length > 0 ? {numResults: result.length, resMessage: "Results for "+move.replace(/%/g, '\"'), moves: result} : {numResults: 0, resMessage: "No results", moves: []};

                  res.render('results', data);

                  connection.release();
              });
            });
          }
        }
        else 
        {
          if(move.match(/random/))
          {
            pool.getConnection(
            function(err, connection) 
            {
              console.log(connection.escape(move));
              connection.query(
              "select * from (select * from move ORDER BY RAND() LIMIT 1) as m, clips as v where v.id = m.id;",
              function handleOut(err, result, fields)
              {
                  if(err) throw err;
                  
                  //Create helper function to reshape prereq and nextmove data before rendering
                  result[0].prereq   = reshapeProgression(result[0].prereq);
                  result[0].nextmove = reshapeProgression(result[0].nextmove);
                  
                  res.render('moveDetail', result[0]);
                  
                  connection.release();
              });
            });
          }
          else if(move.match(/about/))
          {
            pool.getConnection(
            function(err, connection) 
            {
              console.log(connection.escape(move));
              connection.query(
              "select contributorName, link from contributor UNION select count(*), null as link from move;",
              function handleOut(err, result, fields)
              {
                  if(err) throw err;
                  
                  //create data object
                  //first property is total number of moves in the database
                  //second property is list of contributors in db

                  var data = {totalMoves : result[result.length-1].contributorName};

                  result.splice(-1,1);
                  data.contributors = result;

                  console.log(data);
                  
                  res.render('moveDetail', data);
                  
                  connection.release();
              });
            });
          }
          else if(move.match(/category/))
          {
            console.log("categofsfdsfd");
          }
          else
          {
            pool.getConnection(
            function(err, connection) 
            {
              console.log(connection.escape(move));
              connection.query(
              "select * from (select * from move where moveName = " + connection.escape(move) + ") as m, clips as v where v.id = m.id;",
              function handleOut(err, result, fields)
              {
                  if(err) throw err;
                  result[0].prereq   = reshapeProgression(result[0].prereq);
                  result[0].nextmove = reshapeProgression(result[0].nextmove);

                  res.render('moveDetail', result[0]);
                  
                  connection.release();
              });
            });
          }
        }
      }
      query();
    }

    function renderEmptySearch()
    {
      res.render('results', {numResults: 0, resMessage: "No results", moves: []});
    }

    move != null ? prepareQuery(move) : renderEmptySearch();
};