import { v4 as uuidv4 } from 'uuid';
import { Player } from './player';
export class Game {

  players: Player[] = [];
  public gameId: string;
  board1: any;
  board2: any;


  constructor(players: Player[]) {
    this.gameId = uuidv4();
    this.players = players;
  }

}