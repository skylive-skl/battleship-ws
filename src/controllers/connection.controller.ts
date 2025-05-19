import { Player } from 'src/models/player';
import { WebSocket } from 'ws'; 

export class ConnectionController {
  private connections = new Map<WebSocket, Player | null>();

  addConnection(ws: WebSocket) {
    this.connections.set(ws, null);
  }

  setPlayer(ws: WebSocket, player: Player) {
    this.connections.set(ws, player);
  }

  getPlayer(ws: WebSocket): Player | null {
    return this.connections.get(ws) || null;
  }

  removeConnection(ws: WebSocket) {
    this.connections.delete(ws);
  }

  sendTo(ws: WebSocket, message: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }
}