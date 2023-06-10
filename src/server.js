import createExpressApp from './app';
import config from './config';

const startServer = async () => {
  try {
    const application = await createExpressApp();
    const server = application.listen(config.server.port, () => {
      console.log(`Server running at ${config.server.host}`);
    });

    // Perform a graceful shutdown
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
    console.error(`Server startup failed due to an error: ${error}`);
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
