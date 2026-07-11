export type Theme =
  | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
  | '21' | '22' | '23' | '24';

export const themeImages: Record<Theme, string> = {
  '1': '',
  '2': '/assets/masterclass theme/1.png',
  '3': '/assets/masterclass theme/2.jpg',
  '4': '/assets/masterclass theme/3.jpg',
  '5': '/assets/masterclass theme/4.jpg',
  '6': '/assets/masterclass theme/5.jpg',
  '7': '/assets/masterclass theme/6.jpg',
  '8': '/assets/masterclass theme/7.jpg',
  '9': '/assets/masterclass theme/8.jpg',
  '10': '/assets/masterclass theme/9.jpeg',
  '11': '/assets/masterclass theme/10.png',
  '12': '/assets/masterclass theme/11.jpg',
  '13': '/assets/masterclass theme/12.webp',
  '14': '/assets/masterclass theme/13.jpg',
  '15': '/assets/masterclass theme/14.jpg',
  '16': '/assets/masterclass theme/15.jpg',
  '17': '/assets/masterclass theme/16.jpg',
  '18': '/assets/masterclass theme/17.jpg',
  '19': '/assets/masterclass theme/18.jpg',
  '20': '/assets/masterclass theme/19.jpg',
  '21': '/assets/masterclass theme/20.jpg',
  '22': '/assets/masterclass theme/21.jpg',
  '23': '/assets/masterclass theme/22.jpg',
  '24': '/assets/masterclass theme/23.jpg',
};

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const body = document.body;

  // Theme 1 is dark theme (no background image)
  if (theme === '1') {
    body.style.backgroundImage = 'none';
    body.style.backgroundColor = '#0A0A0A';

    // Set CSS variables for dark theme (solid colors, no transparency needed)
    root.style.setProperty('--primary-color', '#0054A6');
    root.style.setProperty('--secondary-color', '#FFD700');
    root.style.setProperty('--background-color', '#0A0A0A');
    root.style.setProperty('--card-color', '#121212');
    root.style.setProperty('--button-color', '#1A1A1A');
    root.style.setProperty('--hover-color', '#181818');
    root.style.setProperty('--input-color', '#2a2a2a');
  } else {
    // Other themes use background images
    const imageUrl = themeImages[theme];
    body.style.backgroundImage = `url("${imageUrl}")`;
    body.style.backgroundColor = 'transparent';
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';

    // Set CSS variables: page background stays translucent to show the image,
    // but cards, buttons, and inputs are solid dark so content remains readable.
    root.style.setProperty('--primary-color', '#0054A6');
    root.style.setProperty('--secondary-color', '#FFD700');
    root.style.setProperty('--background-color', 'rgba(0, 0, 0, 0.35)');
    root.style.setProperty('--card-color', '#121212');
    root.style.setProperty('--button-color', '#1A1A1A');
    root.style.setProperty('--hover-color', 'rgba(255, 255, 255, 0.12)');
    root.style.setProperty('--input-color', '#2a2a2a');
  }
}
