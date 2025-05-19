import { WebSocket } from "ws";
import { ConnectionController } from "./controllers/connection.controller";
import { Player } from "./types";



export class MessageHandler {
  private connectionController: ConnectionController;

  constructor(connectionController: ConnectionController) {
    this.connectionController = connectionController;
  }

  handle(ws: WebSocket, message: string) {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message.toString());
    console.log('data', data);
    switch (data.type) {
      case 'reg':
        this.handleRegistration(ws, data.data);
        break;

      case 'create_room':
        this.handleCreateRoom(ws);
        break;

      case 'add_user_to_room':
        this.handleAddUserToRoom(ws, data.data);
        break;

      case 'add_ships':
        this.handleAddShips(ws, data.data);
        break;

      case 'attack':
        this.handleAttack(ws, data.data);
        break;

      default:
        console.warn(`Unknown command type: ${data.type}`);
    }
  } catch(error: any) {
    console.error('Error handling message:', error);
  }

  handleRegistration(ws: WebSocket, data: Player) {
    console.log('Registering user:', data);
    console.log('ws', ws);
    this.connectionController.setPlayer(ws, data);
    const info = {
        name: data.name,
        index: 1,
        error: false,
        errorText: '',
      }
    ws.send(JSON.stringify({
      type: 'reg',
      data: JSON.stringify(info),
      id: 0,
    }));
    console.log('Player registered:', data);
  }
  handleCreateRoom(ws: WebSocket) {
    console.log('Creating room');
    console.log('ws', ws);
  }

  handleAddUserToRoom(ws: WebSocket, data: any) {
    console.log('Adding user to room:', data);
    console.log('ws', ws);
  }
  handleAddShips(ws: WebSocket, data: any) {
    console.log('Adding ships:', data);
    console.log('ws', ws);
  }
  handleAttack(ws: WebSocket, data: any) {
    console.log('Attacking:', data);
    console.log('ws', ws);
  }
}