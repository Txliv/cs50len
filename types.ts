
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface SearchStep {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  message: string;
}
