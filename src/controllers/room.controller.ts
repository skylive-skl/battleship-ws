import { Player } from "../models/player";
import { Room } from "../models/room";

export class RoomController {
  private rooms: Room[] = [];
  private availableRooms: Set<string> = new Set();

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
    if (room.isFull()) this.availableRooms.delete(roomId);
    return true;
  }

  getAvailableRooms(): Room[] {
    return this.rooms.filter(r => this.availableRooms.has(r.roomId));
  }


}