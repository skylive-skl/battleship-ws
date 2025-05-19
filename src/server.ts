
import { WebSocketServer } from 'ws';

export class WSServer {
  private wss: WebSocketServer;

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.wss.on('connection', (ws) => {
      console.log('New client connected');
      ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
      });
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
    console.log(`WebSocket server is running on ws://localhost:${port}`);
  }
}
export const startWSServer = (port: number) => {
  return new WSServer(port);
};
