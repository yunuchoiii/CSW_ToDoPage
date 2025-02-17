export const getRGBAFromHex = (color: string) => {
  return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 1)`;
}

export const changeBackgroundColor = (color?: string) => {
  const root = document.documentElement;
  if (color) {
    const rgbaColor = getRGBAFromHex(color);
    const startColor = rgbaColor.replace(", 1)", ", 0.1)");
    const endColor = rgbaColor.replace(", 1)", ", 0.5)");
    root.style.setProperty('--background', `linear-gradient(150deg, ${startColor} 0%, ${endColor} 100%)`);
  } else {
    root.style.removeProperty('--background');
  }
}