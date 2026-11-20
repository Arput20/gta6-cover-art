// presets.js: Color presets (Sunset Vice, Neon Night, Golden Coast)

export const PRESETS = {
  sunsetVice: {
    name: 'Sunset Vice',
    skyColor1: 'rgba(120, 20, 120, 0.4)',
    skyColor2: 'rgba(240, 90, 40, 0.3)',
    skyColor3: 'rgba(255, 200, 60, 0.45)',
    halftone: true,
    grain: 1.2
  },
  neonNight: {
    name: 'Neon Night',
    skyColor1: 'rgba(10, 30, 90, 0.5)',
    skyColor2: 'rgba(180, 20, 140, 0.35)',
    skyColor3: 'rgba(0, 220, 200, 0.3)',
    halftone: false,
    grain: 1.5
  },
  goldenCoast: {
    name: 'Golden Coast',
    skyColor1: 'rgba(200, 80, 20, 0.3)',
    skyColor2: 'rgba(240, 160, 40, 0.35)',
    skyColor3: 'rgba(255, 230, 120, 0.4)',
    halftone: true,
    grain: 0.8
  }
};
