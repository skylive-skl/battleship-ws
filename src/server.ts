
import { ConnectionController } from './controllers/connection.controller';
import { WebSocketServer } from 'ws';

export class WSServer {
  private wss: WebSocketServer;

  constructor(port: number) {
    const connectionController = new ConnectionController();
    this.wss = new WebSocketServer({ port });
    this.wss.on('connection', (ws) => {
      console.log('New client connected');
      connectionController.addConnection(ws);
      ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        const data = JSON.parse(message.toString());
        console.log('data', data);
        console.log('connectionController', connectionController);
      });
      ws.on('close', () => {
        console.log('Client disconnected');
        connectionController.removeConnection(ws);
      });
    });
    console.log(`WebSocket server is running on ws://localhost:${port}`);
  }
}
export const startWSServer = (port: number) => {
  return new WSServer(port);
};
