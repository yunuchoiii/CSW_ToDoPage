export const getRGBAFromHex = (color: string) => {
  return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 1)`;
}

export const changeBackgroundColor = (color?: string) => {
  const root = document.documentElement;
  if (color) {
    root.style.setProperty('--background', `${color}`);
  } else {
    root.style.removeProperty('--background');
  }
}