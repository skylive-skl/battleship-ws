import { Player } from "../models/player";
import { Room } from "../models/room";
import { ConnectionController } from "./connection.controller";

export class RoomController {
  private rooms: Room[] = [];
  private availableRooms: Set<string> = new Set();

  constructor(private connectionController: ConnectionController) { }

  createRoom(owner: Player): Room {
    const room = new Room(owner);
    this.rooms.push(room);
    this.availableRooms.add(room.roomId);
    return room;
  }

  joinRoom(player: Player, roomId: string): boolean {
    const room = this.rooms.find(r => r.roomId === roomId);
    if (!room || !this.availableRooms.has(roomId)) return false;
    room.addPlayer(player);
    if (room.isFull()) {
      this.availableRooms.delete(roomId);
      room.createGame();
      this.notifyPlayers(room);
    }

    return true;
  }

  getAvailableRooms(): Room[] {
    return this.rooms.filter(r => this.availableRooms.has(r.roomId));
  }

  getRoomById(roomId: string): Room | null {
    const room = this.rooms.find(r => r.roomId === roomId);
    return room || null;
  }

  notifyPlayers(room: Room) {
    const players = room.getPlayers();
    const gameId = room.getGameId();
    players.forEach(player => {
      const gameData = {
        idGame: gameId,
        idPlayer: player.index
      }
      this.connectionController.sendToPlayer(player, {
        type: 'create_game',
        data: JSON.stringify(gameData),
        index: 0
      })
    });
  }
}