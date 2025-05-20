// src/game/board.ts

import { CellState } from '../types';
import { Position } from '../types';
import { Ship } from '../types';

export class Board {
  private field: CellState[][] = Array.from({ length: 10 }, () => Array(10).fill('empty'));
  private ships: Ship[] = [];

  addShip(ship: Ship): boolean {
    const cells = this.getCells(ship.position, ship.direction, ship.length);
    if (!cells || cells.some(cell => this.isOccupied(cell.x, cell.y))) return false;

    cells.forEach(cell => {
      // @ts-ignore
      this.field[cell.x][cell.y] = 'ship';
    });

    this.ships.push(ship);
    return true;
  }



  getCells(pos: Position, direction: boolean, length: number): Position[] {
    const result: Position[] = [];

    for (let i = 0; i < length; i++) {
      if (direction) {
        // Горизонтально
        result.push({ x: pos.x, y: pos.y + i });
      } else {
        // Вертикально
        result.push({ x: pos.x + i, y: pos.y });
      }
    }
    // Проверка на выход за границы поля
    return result.filter(c => c.x >= 0 && c.x < 10 && c.y >= 0 && c.y < 10);
  }


  private isOccupied(x: number, y: number): boolean {
    return this.field[x]?.[y] === 'ship';
  }

}