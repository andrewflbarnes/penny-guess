const jsonServer = require('json-server');
const fs = require('fs');
const chalk = require('chalk');

const host = 'localhost';
const port = 5007;
const file_data = 'data.json';
const file_routes = 'routes.json';
const root = `http://${host}:${port}`;

const routes = JSON.parse(fs.readFileSync(file_routes));
const db = JSON.parse(fs.readFileSync(file_data));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(routes);
const router = jsonServer.router(db);

const middlewareNotEmpty = function(method, field, responseCode) {
  return (req, res, next) => {
    if (req.method === method && typeof req.body[field] !== "undefined" && req.body[field] === '') {
      res.sendStatus(responseCode);
    } else {
      next();
    }
  }
};

console.log(chalk.yellow('  Starting in-memory mock API json-server'));
console.log(chalk.grey('  To run normally using lowdb use the below command'));
console.log(chalk.grey(`  json-server --routes routes.json --port ${port} data.json`));

console.log(chalk.bold('\n  Data'));
console.log(`  ${file_data}`);

console.log(chalk.bold('\n  Home'));
console.log(`  ${root}`);

console.log(chalk.bold('\n  Resources'));
for (const key in db) {
  console.log(`  ${root}/${key}`);
}

console.log(chalk.bold('\n  Routes'));
for (const key in routes) {
  console.log(`  ${root}${key} -> ${root}/${routes[key]}`);
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  console.log(chalk.grey(JSON.stringify(req.body)));
  next()
});
server.use(middlewareNotEmpty('POST', 'name', 422));
server.use(rewriter);
server.use(router);

server.listen(port, host, () => {
  console.log(chalk.yellow('\n  Server started - to exit use ^C\n'));
});
