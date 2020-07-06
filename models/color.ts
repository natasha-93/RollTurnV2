export type ColorId =
  | 'ORANGE'
  | 'YELLOW'
  | 'BLUE'
  | 'RED'
  | 'GREEN'
  | 'BLACK'
  | 'WHITE';

export type Color = {
  id: ColorId;
  value: string;
};

export const colors: Color[] = [
  {
    id: 'ORANGE',
    value: '#FFA500',
  },
  {
    id: 'YELLOW',
    value: '#F3F925',
  },
  {
    id: 'BLUE',
    value: '#2128fc',
  },
  {
    id: 'RED',
    value: '#F92525',
  },
  {
    id: 'GREEN',
    value: '#1ba303',
  },
  {
    id: 'BLACK',
    value: '#666',
  },
  {
    id: 'WHITE',
    value: '#eee',
  },
];
