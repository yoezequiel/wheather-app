import type { WeatherCode } from './weather';

export interface WeatherTheme {
  background: string;
  icon: string;
  iconColor: string;
}

export const weatherThemes: Record<WeatherCode, WeatherTheme> = {
  sunny: {
    background: 'linear-gradient(135deg, #FDB813 0%, #F59E0B 50%, #EA580C 100%)',
    icon: `<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41M12 7a5 5 0 100 10 5 5 0 000-10z"/>`,
    iconColor: 'rgba(254, 243, 199, 0.95)'
  },
  cloudy: {
    background: 'linear-gradient(135deg, #64748B 0%, #475569 50%, #334155 100%)',
    icon: `<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>`,
    iconColor: 'rgba(226, 232, 240, 0.9)'
  },
  rainy: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)',
    icon: `<path d="M16 13v8m-8-8v8m-5-8h18M5 5a7 7 0 1114 0"/>`,
    iconColor: 'rgba(203, 213, 225, 0.9)'
  },
  stormy: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 50%, #0c0a09 100%)',
    icon: `<path d="M19 16.9A5 5 0 0018 7h-1.26a8 8 0 10-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>`,
    iconColor: 'rgba(196, 181, 253, 0.9)'
  },
  snowy: {
    background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)',
    icon: `<path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="22" x2="12.01" y2="22"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/>`,
    iconColor: 'rgba(7, 89, 133, 0.9)'
  },
  foggy: {
    background: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%)',
    icon: `<path d="M3 15h18M3 9h18M3 12h18"/>`,
    iconColor: 'rgba(243, 244, 246, 0.9)'
  }
};
