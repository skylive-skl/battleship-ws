import { Game } from "./game";
import { Player } from "./player";
import { v4 as uuidv4 } from 'uuid';

export class Room {
  roomId: string;
  roomUsers: Player[];
  private game: Game | null = null;

  constructor(owner: Player) {
    this.roomId = uuidv4();
    this.roomUsers = [];
    this.roomUsers.push(owner);
  }

  public getGameId(): string | null {
    return this.game ? this.game.gameId : null;
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

  createGame(): Game {
    if (this.game) {
      throw new Error("Game already started");
    }
    this.game = new Game(this.roomUsers);
    return this.game;
  }

}
