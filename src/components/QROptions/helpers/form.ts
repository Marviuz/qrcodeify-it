import { Gradient, Options } from 'qr-code-styling';

const initialGradient: Gradient = {
  type: 'radial', // or 'linear'
  rotation: 123,
  colorStops: [
    {
      offset: 1,
      color: '#123123',
    },
  ],
};

export const defaultValues: Options & { imageName?: string } = {
  dotsOptions: {
    color: '#000',
    type: 'rounded',
  },
  type: 'svg',
  backgroundOptions: {
    color: '#fff',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 5,
  },
  margin: 20,
};

export type QRSettings = typeof defaultValues;

export const DOT_TYPES = [
  'square',
  'dots',
  'rounded',
  'classy',
  'classy-rounded',
  'extra-rounded',
];
