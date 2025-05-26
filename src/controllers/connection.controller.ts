import { Player } from '../models/player.js';
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
  sendToAll(message: any) {
    this.connections.forEach((_, ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }
  sendToPlayer(player: Player, message: any) { 
    const ws = this.getConnectionByPlayer(player);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }

  getConnectionByPlayer(player: Player): WebSocket | null {
    const ws = Array.from(this.connections.entries()).find(([_, p]) => p?.index === player.index)?.[0];
    return ws || null;
  }
}