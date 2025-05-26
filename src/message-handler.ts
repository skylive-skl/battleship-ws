import { WebSocket } from "ws";
import { ConnectionController } from "./controllers/connection.controller.js";
import { Player } from "./models/player.js";
import { PlayerController } from "./controllers/player.controller.js";
import { RoomController } from "./controllers/room.controller.js";
import type { Ship } from "./types";

export class MessageHandler {
  private connectionController: ConnectionController;
  private playerController: PlayerController;
  private roomController: RoomController;

  constructor(connectionController: ConnectionController, playerController: PlayerController, roomController: RoomController) {
    this.connectionController = connectionController;
    this.playerController = playerController;
    this.roomController = roomController;
  }

  handle(ws: WebSocket, message: string) {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message.toString());
    const bodyData = JSON.parse(data?.data || '{}');
    console.log('data', data);
    console.log('bodyData', bodyData);
    switch (data.type) {
      case 'reg':
        this.handleRegistration(ws, bodyData);
        break;

      case "get_all_players":
        console.log('Getting all players');
        const players = this.playerController.getAllPlayers();
        this.connectionController.sendTo(ws, {
          type: 'all_players',
          data: JSON.stringify(players),
          id: 0,
        });
        break;

      case 'create_room':
        this.handleCreateRoom(ws);
        break;

      case 'add_user_to_room':
        this.handleAddUserToRoom(ws, bodyData);
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
    this.connectionController.setPlayer(ws, data);
    const { name, password } = data;

    if (!name || !password) {
      this.connectionController.sendTo(ws, {
        type: 'reg',
        data: { name, error: true, errorText: 'Missing name or password' },
        id: 0,
      });
      return;
    }

    const existingPlayer = this.playerController.getPlayerByName(name);
    let player: Player | null = null;

    if (existingPlayer) {
      player = this.playerController.login(data);
    } else {
      player = this.playerController.register(data);
    }

    if (player) {
      this.connectionController.setPlayer(ws, player);
      this.connectionController.sendTo(ws, {
        type: 'reg',
        data: JSON.stringify({ name: player.name, error: false }),
        id: 0,
      });
    } else {
      this.connectionController.sendTo(ws, {
        type: 'reg',
        data: JSON.stringify({ name, error: true, errorText: 'Registration failed' }),
        id: 0,
      });
    }
  }
  handleCreateRoom(ws: WebSocket) {
    const player = this.connectionController.getPlayer(ws);
    if (!player) {
      this.connectionController.sendTo(ws, {
        type: 'create_room',
        data: { error: true, errorText: 'Player not found' },
        id: 0,
      });
      return;
    }

    this.roomController.createRoom(player);
    this.broadcastUpdateRoom();
  }

  handleAddUserToRoom(ws: WebSocket, data: { indexRoom: string }) {
    const player = this.connectionController.getPlayer(ws);
    if (!player) {
      this.connectionController.sendTo(ws, {
        type: 'add_user_to_room',
        data: { error: true, errorText: 'Player not found' },
        id: 0,
      });
      return;
    }

    const indexRoom = data.indexRoom;
    const room = this.roomController.getRoomById(indexRoom);

    if (!room) {
      this.connectionController.sendTo(ws, {
        type: 'add_user_to_room',
        data: { error: true, errorText: 'Room not found' },
        id: 0,
      });
      return;
    }
    this.roomController.joinRoom(player, indexRoom);
    this.broadcastUpdateRoom();

  }
  handleAddShips(ws: WebSocket, data: {
    gameId: string,
    ships: Ship[]
    index: number,
  }) {
    console.log('Adding ships:', data);
    console.log('ws', ws);
  }
  handleAttack(ws: WebSocket, data: any) {
    console.log('Attacking:', data);
    console.log('ws', ws);
  }

  private broadcastUpdateRoom() {
    const rooms = this.roomController.getAvailableRooms();

    this.connectionController.sendToAll({
      type: 'update_room',
      data: JSON.stringify(rooms),
      id: 0,
    });
  }
}