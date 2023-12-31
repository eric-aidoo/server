import createApplication from './app';
import config from './config/appConfig';
import database from './database';
import libraries from './helpers/libraries';

const startServer = async () => {
  const port = config.server.port;
  const host = config.server.host;
  const wildcardIp = config.server.wildcardIp;
  try {
    const expressFramework = libraries.expressFramework();
    const application = await createApplication(expressFramework);

    const server = application
      .listen(port, async () => {
        await database.initializeTables({ typeOfDatabase: 'SQL' });
        console.log(`Server running at ${host}`);
      })
      .on('error', (error) => {
        console.error(error);
        process.exit(1);
      });

    process.on('unhandledRejection', (error) => {
      console.log(`Server error: ${error}`);
    });

    // Initiate a graceful shutdown
    const signalInterruptionOrTermination = config.server.isInDevMode ? 'SIGINT' : 'SIGTERM';
    process.on(signalInterruptionOrTermination, () => {
      console.log('SIGINT received...');
      console.log('server is starting cleanup');
      server.close(() => {
        console.log('Server is now closed...');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

startServer();

// const cluster = require('cluster');
// const os = require('os');
// const runExpressServer = require('./app');

// // Check if current process is master.
// if (cluster.isMaster) {
//   // Get total CPU cores.
//   const cpuCount = os.cpus().length;

//   // Spawn a worker for every core.
//   for (let j = 0; j < cpuCount; j++) {
//     cluster.fork();
//   }
// } else {
//   // This is not the master process, so we spawn the express server.
//   runExpressServer();
// }

// // Cluster API has a variety of events.
// // Here we are creating a new process if a worker die.
// cluster.on('exit', function (worker) {
//   console.log(`Worker ${worker.id} died'`);
//   console.log(`Staring a new one...`);
//   cluster.fork();
// });
