const jsonServer = require('json-server');
const fs = require('fs');
const chalk = require('chalk');

console.log(chalk.yellow('  Starting in-memory mock API json-server'));

// defaults
const defaultHost = 'localhost';
const defaultPort = 3000;
const defaultFileData = 'data.json';
const defaultFileRoutes = 'routes.json';
let fileConfig = 'server.config.json';

let host;
let port;
let fileData;
let fileRoutes;

function getNextArg(args, i) {
  const next = i + 1;
  return {
    next,
    arg: args[next],
  }
}

const { argv } = process;

let i = 1;

do (i += 1); while (argv[i - 1] && argv[i - 1] !== '--');

for (; i < argv.length; i++) {
  switch (argv[i]) {
    case '-c':
    case '--config':
      ({ next: i, arg: fileConfig } = getNextArg(argv, i));
      if (fs.existsSync(fileConfig)) {
        console.log(chalk.grey(`  User defined config: ${fileConfig}`));
      } else {
        console.log(chalk.red(`  Config file ${fileConfig} does not exist`));
        process.exit(1);
      }
      break;
    default:
      console.log(chalk.red(`  Unrecognised argument: ${argv[i]}`));
      process.exit(1);
  }
}

if (fileConfig && fs.existsSync(fileConfig)) {
  ({ port, host, fileData, fileRoutes } = JSON.parse(fs.readFileSync(fileConfig)));
}

host = host || defaultHost;
port = port || defaultPort;
fileData = fileData || defaultFileData;
fileRoutes = fileRoutes || defaultFileRoutes;

const root = `http://${host}:${port}`;

console.log(chalk.grey('  To run normally using lowdb use the below command'));
console.log(chalk.grey(`  json-server --routes routes.json --port ${port} data.json`));

console.log(chalk.bold('\n  Data'));
console.log(`  ${fileData}`);

console.log(chalk.bold('\n  Home'));
console.log(`  ${root}`);

const db = JSON.parse(fs.readFileSync(fileData));

console.log(chalk.bold('\n  Resources'));
Object.keys(db).forEach(key =>
  console.log(`  ${root}/${key}`)
);

const routes = JSON.parse(fs.readFileSync(fileRoutes));

console.log(chalk.bold('\n  Routes'));
Object.keys(routes).forEach(key =>
  console.log(`  ${root}${key} -> ${root}/${routes[key]}`)
);

const server = jsonServer.create();

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// logging middleware
server.use((req, res, next) => {
  if (req.body) {
    console.log(chalk.grey(JSON.stringify(req.body)));
  }

  next();
});

// validation middleware
server.use((req, res, next) => {
  const method = 'POST';
  const field = 'name';
  const responseCode = 422;

  if (req.method === method && typeof req.body[field] !== "undefined" && req.body[field] === '') {
    res.sendStatus(responseCode);
  } else {
    next();
  }
});

server.use(jsonServer.rewriter(routes));
server.use(jsonServer.router(db));

server.listen(port, host, () => {
  console.log(chalk.yellow('\n  Server started - to exit use ^C\n'));
});
