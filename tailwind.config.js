function hexToRgb(hex) {
  
  const rgb = [0,0,0];
  if (hex.length === 7) {
    rgb[0] = parseInt(hex.slice(1,3), 16);
    rgb[1] = parseInt(hex.slice(3,5), 16);
    rgb[2] = parseInt(hex.slice(5,7), 16);
  }
  if (hex.length === 4) {
    rgb[0] = parseInt(hex.slice(1,2), 16) * 17;
    rgb[1] = parseInt(hex.slice(2,3), 16) * 17;
    rgb[2] = parseInt(hex.slice(3,4), 16) * 17;
  }
  return rgb;
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

function componentToHex(c) {
  var hex = Math.floor(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getColor(hex, s, v) {
  const rgb = hexToRgb(hex);
  const hsv = rgbToHsv(...rgb);

  return rgbToHex(...hsvToRgb(
    hsv[0], s / 255, v / 255
  ));
}

function getColors(hex) {
  return {
    '100': getColor(hex, 4, 255),
    '200': getColor(hex, 4 + (250/4), 255),
    '300': getColor(hex, 4 + (250/4)*2, 250),
    '400': getColor(hex, 4 + (250/4)*3, 255),
    '500': getColor(hex, 255, 255),
    '600': getColor(hex, 255, 4 + (250/4)*3),
    '700': getColor(hex, 255, 4 + (250/4)*2),
    '800': getColor(hex, 255, 4 + (250/4)*1),
    '900': getColor(hex, 255, 4),
  };
}

module.exports = {
  theme: {
    backgroundColor: theme => ({
      'red': {
          100: '#FBE9EC',
          200: '#F5C9CF',
          300: '#EFA8B1',
          400: '#E36777',
          500: '#D7263D',
          600: '#C22237',
          700: '#811725',
          800: '#61111B',
          900: '#410B12',
        },
        'purple': {
          100: '#EDEAF0',
          200: '#D2CBDA',
          300: '#B6ACC4',
          400: '#806E97',
          500: '#49306B',
          600: '#422B60',
          700: '#2C1D40',
          800: '#211630',
          900: '#160E20',
        },
        'blue': {
          100: '#E6E8EA',
          200: '#C0C5CA',
          300: '#9AA3AA',
          400: '#4E5D6B',
          500: '#02182B',
          600: '#021627',
          700: '#010E1A',
          800: '#010B13',
          900: '#01070D',
        },
        'yellow': {
          100: '#FFFCF8',
          200: '#FFF7ED',
          300: '#FFF3E1',
          400: '#FFE9CB',
          500: '#FFE0B5',
          600: '#E6CAA3',
          700: '#99866D',
          800: '#736551',
          900: '#4D4336',
        },
        'cyan': {
          100: '#E6F5FE',
          200: '#C0E5FD',
          300: '#99D5FB',
          400: '#4DB6F9',
          500: '#0197F6',
          600: '#0188DD',
          700: '#015B94',
          800: '#00446F',
          900: '#002D4A',
        },
        
    }),
    extend: {},
  },
  variants: {},
  plugins: [],
};