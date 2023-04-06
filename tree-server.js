
var restify = require('restify');
const ParseCsvData = require('./parseCsvData');

const data = ParseCsvData.getData();

function getSquirrel(req, res, next) {
  res.send(data[req.params.id]);
  next();
}

function getSquirrels(req, res, next) {
    let result = data;
    let pageSize = 10;
    if (!!req.params.page){
        let start = (req.params.page - 1) * pageSize;
        let end = start + pageSize;
        result = result.slice(start, end);
    }
    res.send(result);
    next();
  }
var server = restify.createServer();
server.get('/squirrel/:id', getSquirrel);
server.get('/squirrels/:page', getSquirrels);


server.listen(3001, function() {
  console.log('%s listening at %s', server.name, server.url);
});