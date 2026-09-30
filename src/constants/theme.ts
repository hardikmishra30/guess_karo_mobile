export interface Colors {
  bg: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  primary: string;
  onPrimary: string;
  correct: string;
  skip: string;
  warn: string;
}

export const darkColors: Colors = {
  bg: '#1A0F3D',
  card: '#2A1A66',
  border: '#3D2A8C',
  text: '#FFFFFF',
  muted: '#BDB2F0',
  primary: '#FFB627',
  onPrimary: '#1A0F3D',
  correct: '#15803D',
  skip: '#BE123C',
  warn: '#C81E1E',
};

export const lightColors: Colors = {
  bg: '#FFF6E5',
  card: '#FFFFFF',
  border: '#E8D9B5',
  text: '#22124D',
  muted: '#5B4B8A',
  primary: '#FFB627',
  onPrimary: '#1A0F3D',
  correct: '#15803D',
  skip: '#BE123C',
  warn: '#C81E1E',
};

export const radius = { card: 24, button: 20, chip: 16 };
