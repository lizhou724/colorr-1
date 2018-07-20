import ColorRanges from './def/color_range';
import { hexToRgb, hexaToGRBa } from './libs/converter';
import { isolateAHexaColorString } from './libs/iso';

const bestTextColor = (backgroundColor) => {
  try {
    const inputColor = isolateAHexaColorString(backgroundColor);
    const rgbColor = hexToRgb(inputColor);
    const { r, g, b } = rgbColor;
    return ((r * ColorRanges.MAX_RED) + (g * ColorRanges.MAX_GREEN) + (b * ColorRanges.MAX_BLUE)) > ColorRanges.MAX_RANGE ? '#000000' : '#ffffff';
  } catch (e) {
    return '#000000';
  }
};

const lighterColor = (color, sensitivity = 50) => {
  const sens = sensitivity < 0 ? -sensitivity : sensitivity;
  return lightenDarkenColor(color, sens);
};

const darkerColor = (color, sensitivity = -50) => {
  const sens = sensitivity > 0 ? -sensitivity : sensitivity;
  return lightenDarkenColor(color, sens);
};

const lightenDarkenColor = (color, amt = -50) => {
  try {
    let usePound = false;
    let col = color;

    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  } catch (e) {
    return '#199e55';
  }
};

const getGRBAStringFromHexa = (hexaString) => {
  const rbga = hexaToGRBa(hexaString);
  const { r, g, b, a } = rbga;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export { lighterColor, darkerColor, bestTextColor, getGRBAStringFromHexa };
