export interface PlayerData {
  name: string;
  password: string;
}


export type CellState = 'empty' | 'ship' | 'hit' | 'miss';

export type AttackStatus = 'miss' | 'shot' | 'killed';

export type ShipType = 'small' | 'medium' | 'large' | 'huge';


export interface Position {
  x: number;
  y: number;
}

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
}

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean; // true for horizontal, false for vertical
  length: number;
  type: "small" | "medium" | "large" | "huge";
}