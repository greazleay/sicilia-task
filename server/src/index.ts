import http from 'http';
import app from '@/app';

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.info(`Server Started on port: ${PORT}`)
});

httpServer.on('error', (error: NodeJS.ErrnoException) => {

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
});