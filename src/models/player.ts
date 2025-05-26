import { v4 as uuidv4 } from 'uuid';
export class Player {
  public index: string;
  public idInGame: string | null = null;
  public shipsSet: boolean = false;

  constructor(
    public readonly name: string,
    public readonly password: string
  ) {
    this.index = uuidv4();
  }

  setGameId(id: string) {
    this.idInGame = id;
  }

  resetForNewGame() {
    this.idInGame = null;
    this.shipsSet = false;
  }
}