const WebSocket = require('ws');
const http_drone = require('http');
const dgram = require('dgram');
const spawn = require('child_process').spawn;
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(require('cors')());

const SerialPort = require('serialport');

let MyPort;

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({ delimiter: '\r\n' });

SerialPort.list().then((ports) => {
  ports.forEach((port) => {
    if (port.manufacturer && port.manufacturer.includes('arduino')) {
      MyPort = port.path;
    }
  });

  port = new SerialPort(MyPort, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  });

  port.pipe(parser);
});

const PORT = 8889;
const HOST = '192.168.10.1';
const STREAM_PORT = 3001;

const drone = dgram.createSocket('udp4');
drone.bind(PORT);
const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

// stream property
const streamServer = http_drone
  .createServer(function (request) {
    console.log(
      'Stream Connection on ' +
        STREAM_PORT +
        ' from: ' +
        request.socket.remoteAddress +
        ':' +
        request.socket.remotePort,
    );

    request.on('data', (data) => {
      webSocketServer.broadcast(data);
    });
  })
  .listen(STREAM_PORT);

const webSocketServer = new WebSocket.Server({
  server: streamServer,
});

webSocketServer.broadcast = function (data) {
  webSocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const parseState = (state) => {
  return state
    .split(';')
    .map((x) => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
};

const handleError = (err) => {
  if (err) {
    console.log('ERROR:', err);
  }
};

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

io.on('connection', (socket) => {
  // Control commands
  socket.on('command', (command) => {
    console.log('Command sent from browser:', command);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  });

  // Start stream
  socket.on('stream', (command) => {
    drone.send(command, 0, command.length, PORT, HOST, handleError);

    setTimeout(function () {
      const args = [
        '-i',
        'udp://0.0.0.0:11111',
        '-r',
        '30',
        '-s',
        '960x720',
        '-codec:v',
        'mpeg1video',
        '-b',
        '800k',
        '-f',
        'mpegts',
        'http://127.0.0.1:3001/stream',
      ];

      const streamer = spawn('ffmpeg', args);
      streamer.on('exit', function (code) {
        console.log('Failure', code);
      });
    }, 1000);
  });

  socket.on('test', () => {
    process.exit(1);
  });

  // Светодиод
  socket.on('lights', (data) => {
    console.log(data);
    port.write(data.status);
  });

  // Сервомотор
  socket.on('servomotor', (data) => {
    port.write(data.position);
  });

  // Дальномер
  parser.on('data', (data) => {
    io.emit('data', data);
  });
});

droneState.on('message', (state) => {
  io.sockets.emit('status', 'CONNECTED');

  // Drone state
  const formattedState = parseState(state.toString());
  io.sockets.emit('dronestate', formattedState);
});

http.listen(5000, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Сервер запущен на порту', 5000);
});
