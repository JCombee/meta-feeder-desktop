const colors = {
  red: {
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
  purple: {
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
  'dark-blue': {
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
  'light-yellow': {
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
  yellow: {
    100: '#FDFAF0',
    200: '#FBF2D9',
    300: '#F9EAC3',
    400: '#F4DB95',
    500: '#EFCB68',
    600: '#D7B75E',
    700: '#8F7A3E',
    800: '#6C5B2F',
    900: '#483D1F',
  },
  blue: {
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
  green: {
    100: '#EAF0EB',
    200: '#CBDACC',
    300: '#ACC4AE',
    400: '#6E9771',
    500: '#306B34',
    600: '#2B602F',
    700: '#1D401F',
    800: '#163017',
    900: '#0E2010',
    },
    diamond: {
      100: '#F1F2F6',
      200: '#DDDFE9',
      300: '#C9CBDC',
      400: '#A0A4C1',
      500: '#777DA7',
      600: '#6B7196',
      700: '#474B64',
      800: '#36384B',
      900: '#242632',
      },
      bronze: {
      100: '#F3F0EE',
      200: '#E2D9D4',
      300: '#D0C1BA',
      400: '#AD9386',
      500: '#8A6552',
      600: '#7C5B4A',
      700: '#533D31',
      800: '#3E2D25',
      900: '#291E19',
      },
      silver: {
      100: '#EEEFF1',
      200: '#D4D7DD',
      300: '#BBBFC8',
      400: '#878E9E',
      500: '#545E75',
      600: '#4C5569',
      700: '#323846',
      800: '#262A35',
      900: '#191C23',
      },
      iron: {
      100: '#EBEBEB',
      200: '#CDCDCD',
      300: '#AFAEAF',
      400: '#727273',
      500: '#363537',
      600: '#313032',
      700: '#202021',
      800: '#181819',
      900: '#101011',
      },
      master: {
      100: '#FCF0FA',
      200: '#F6DAF3',
      300: '#F1C3EC',
      400: '#E797DD',
      500: '#DC6ACF',
      600: '#C65FBA',
      700: '#84407C',
      800: '#63305D',
      900: '#42203E',
      },
      gold: {
      100: '#FCF9F4',
      200: '#F6F0E3',
      300: '#F1E7D2',
      400: '#E7D6B0',
      500: '#DCC48E',
      600: '#C6B080',
      700: '#847655',
      800: '#635840',
      900: '#423B2B',
      },
      challenger: {
      100: '#FCF4EE',
      200: '#F7E4D4',
      300: '#F2D3B9',
      400: '#E8B285',
      500: '#DE9151',
      600: '#C88349',
      700: '#855731',
      800: '#644124',
      900: '#432C18',
      },
      grandmaster: {
      100: '#EEEDEC',
      200: '#D5D3CF',
      300: '#BCB8B1',
      400: '#8A8277',
      500: '#584D3D',
      600: '#4F4537',
      700: '#352E25',
      800: '#28231B',
      900: '#1A1712',
      },
      platinum: {
      100: '#E8EBEC',
      200: '#C6CCCE',
      300: '#A3ADB1',
      400: '#5E7077',
      500: '#19323C',
      600: '#172D36',
      700: '#0F1E24',
      800: '#0B171B',
      900: '#080F12',
      },
      
};

module.exports = {
  theme: {
    backgroundColor: colors,
    textColor: colors,
    extend: {
      height: {
        fill: 'calc(100% - 4rem)'
      }
    },
  },
  variants: {},
  plugins: [],
};