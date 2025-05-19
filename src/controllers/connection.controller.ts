import { WebSocket } from 'ws';
import { Player } from '../types';

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
}