import { Player } from "../models/player";
import { PlayerData } from "../types";

export class PlayerController {
  private players: Map<string, Player> = new Map();

  register(playerData: PlayerData): Player | null {
    if (this.players.has(playerData.name)) return null;
    const player = new Player(playerData.name, playerData.password);
    this.players.set(playerData.name, player);
    return player;
  }

  login(playerData: PlayerData): Player | null {
    const player = this.players.get(playerData.name);
    if (!player || player.password !== playerData.password) return null;
    return player;
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  getPlayerByName(name: string): Player | null {
    return this.players.get(name) || null;
  }
}