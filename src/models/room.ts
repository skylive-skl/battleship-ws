import { Player } from "./player";
import { v4 as uuidv4 } from 'uuid';

export class Room {
  roomId: string;
  roomUsers: Player[];

  constructor(owner: Player) {
    this.roomId = uuidv4();
    this.roomUsers = [];
    this.roomUsers.push(owner);
  }

  addPlayer(player: Player) {
    this.roomUsers.push(player);
  }

  isFull(): boolean {
    return this.roomUsers.length >= 2;
  }

  getPlayers(): Player[] {
    return this.roomUsers;
  }

}
