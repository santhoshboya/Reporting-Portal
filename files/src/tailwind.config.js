const colors = {
   azulTwo: '#1665d8',
   black: '#000000',
   black12: 'rgba(0, 0, 0, 0.12)',
   black32: 'rgba(0, 0, 0, 0.32)',
   blackSeven: '#101010',
   black80: 'rgba(0, 0, 0, 0.8)',
   blueGreyTwo: '#7b8fac',
   blueyGrey: '#8892a4',
   dark: '#1e2a3f',
   darkGreyBlueTwoSix: 'rgba(53, 78, 110, 0.6)',
   dusk: '#4c637d',
   darkBlueGrey: '#171f46',
   lightBlueGrey24: 'rgba(215, 223, 233,0.24)',
   mango: '#ffbc2f',
   pageNotFoundBottomBgColor: '#cad9f0',
   pageNotFoundInfoSectionBgColor: '#f6f6f8',
   pageNotFoundPointHyperlink: '#ff6b3c',
   pageNotFoundText: '#5e6977',
   pageNotFoundTopBgColor: '#f3f4f8',
   paleGrey: '#f6f7f9',
   paleGreyFour: '#fbfcfc',
   whiteTwo: 'rgba(255,255,255,0.2)',
   primaryColor: '#2196f3',
   pinkishOrange: '#ff6b3c',
   silver: '#c1c4c8',
   white50: 'rgba(255,255,255,0.5)',
   solitude: '#f5f7fa',
   lightSlateGrey: '#7b8794',
   grey: '#9aa5b1',
   white: '#ffffff',
   white8: 'rgba(255, 255, 255, 0.08)',

   cloudyBlue: '#bdc7d2',
   cloudBurst: '#323f4b',
   mischka: '#9aa5b1',
   fireEngineRed: '#cf1124',

   textColorDefault: '#1f2933',
   pimary1000: '#00091a',
   basic500: '#9aa5b1',
   basic400: '#cbd2d9',
   basic600: '#7b8794',
   steel: '#7b9095',
   basic700: '#616e7c',
   textcolordisabled: '#cbd2d9',
   basic200: '#f5f7fa',
   basic300: '#e4e7eb',
   textcolorhint: '#9aa5b1',
   basic800: '#52606d',
   shadowColor: '#ccc',
   basic900: '#3e4c59',
   basic1000: '#323f4b',
   basic1100: '#1f2933',
   transparentBasic8: '#7b879414',
   transparentBasic16: '#7b879428',
   transparentBasic24: '#7b87943d',
   transparentBasic40: '#7b879466',
   success50: '#effcf6',
   transparentBasic48: '#7b87947a',
   success100: '#c6f7e2',
   success200: '#8eedc7',
   success300: '#65d6ad',
   success400: '#3ebd93',
   success500Default: '#27ab83',
   success600: '#199473',
   success700: '#147d64',
   success800: '#0c6b58',
   success900: '#014d40',
   transparentsuccess8: '#27ab8314',
   transparentsuccess16: '#27ab8328',
   transparentBasic32: '#7b879451',
   transparentsuccess24: '#27ab833d',
   transparentsuccess32: '#27ab8351',
   transparentsuccess40: '#27ab8366',
   transparentsuccess48: '#27ab837a',
   info50: '#e1fcf8',
   info100: '#c1fef6',
   info200: '#92fdf2',
   info300: '#62f4eb',
   info400: '#3ae7e1',
   info500: '#1cd4d4',
   info600Default: '#0fb5ba',
   info700: '#099aa4',
   info800: '#07818f',
   info900: '#05606e',
   transparentInfo8: '#1cd4d414',
   transparentInfo16: '#1cd4d428',
   transparentInfo32: '#1cd4d451',
   transparentInfo24: '#1cd4d43d',
   transparentInfo40: '#1cd4d466',
   transparentInfo48: '#1cd4d47a',
   warning100: '#fff3c4',
   warning200: '#fce588',
   warning300: '#fadb5f',
   warning400: '#f7c948',
   warning600Default: '#De911d',
   warning700: '#cb6e17',
   warning500: '#f0b429',
   warning800: '#b44d12',
   warning900: '#8d2b0b',
   transparentWarning8: '#f0b42914',
   transparentWarning16: '#f0b42928',
   transparentWarning24: '#f0b4293d',
   transparentWarning40: '#f0b42966',
   transparentWarning48: '#f0b4297a',
   transparentWarning32: '#f0b42951',
   danger50: '#ffe3e3',
   danger100: '#ffbdbd',
   danger300: '#f86a6a',
   danger400: '#ef4e4e',
   danger500: '#e12d39',
   danger600Default: '#cf1124',
   danger700: '#ab091e',
   danger900: '#610316',
   danger800: '#8a041a',
   transparentDanger8: '#e12d3914',
   transparentDanger16: '#e12d3928',
   danger200: '#ff9b9b',
   transparentDanger24: '#e12d393d',
   transparentDanger32: '#e12d3951',
   transparentDanger40: '#e12d3966',
   transparentDanger48: '#e12d397a',
   extraOrange50: '#ffe8d9',
   extraOrange100: '#ffd0b5',
   extraOrange300: '#ff9466',
   extraOrange200: '#ffb088',
   extraOrange400: '#f9703e',
   extraOrange500: '#f35627',
   extraOrange600: '#De3a11',
   extraOrange800: '#ad1d07',
   extraOrange700: '#c52707',
   extraOrange900: '#841003',
   extratTransparentOrange8: '#f3562714',
   extratTransparentOrange16: '#f3562728',
   extratTransparentOrange32: '#f3562751',
   extratTransparentOrange24: '#f356273d',
   extratTransparentOrange40: '#f3562766',
   extratTransparentOrange48: '#f356277a',
   extraPurple50: '#f2ebfe',
   warning50: '#fffbea',
   extraPurple600: '#7a0ecc',
   extraPurple300: '#a368fc',
   extraPurple500: '#8719e0',
   extraPurple100: '#dac4ff',
   extraPurple400: '#9446ed',
   extraPurple200: '#b990ff',
   extraPurple700: '#690cb0',
   extraPurple800: '#580a94',
   extraTransparentPurple8: '#8719e014',
   extraTransparentPurple24: '#8719e03d',
   extraTransparentPurple16: '#8719e028',
   extraTransparentPurple32: '#8719e051',
   extraTransparentPurple40: '#8719e066',
   extraTransparentPurple48: '#8719e07a',
   extraPurple900: '#44056e',
   primary50: '#e6f6ff',
   pimary100: '#bae3ff',
   pimary200: '#7cc4fa',
   pimary300: '#47a3f3',
   pimary400: '#2186eb',
   primary500Default: '#0967d2',
   pimary600: '#0552b5',
   pimary700: '#03449e',
   pimary800: '#01337d',
   pimary900: '#002159',
   transparentPrimary4: '#0967d20a',
   transparentPrimary8: '#0967d214',
   transparentPrimary16: '#0967d228',
   transparentPrimary24: '#0967d23d',
   transparentPrimary32: '#0967d251',
   transparentPrimary40: '#0967d266',
   transparentPrimary48: '#0967d27a',
   lightBlueGrey: '#d7dfe9'
}

module.exports = {
   title: 'hello',
   purge: [],
   target: 'relaxed',
   prefix: '',
   important: false,
   separator: ':',
   theme: {
      screens: {
         sm: '640px',
         md: '768px',
         lg: '1024px',
         xl: '1280px'
      },
      colors: {
         transparent: 'transparent',
         current: 'currentColor',

         black: '#000',
         white: '#fff',

         gray: {
            100: '#f7fafc',
            200: '#edf2f7',
            300: '#e2e8f0',
            400: '#cbd5e0',
            500: '#a0aec0',
            600: '#718096',
            700: '#4a5568',
            800: '#2d3748',
            900: '#1a202c'
         },
         red: {
            100: '#fff5f5',
            200: '#fed7d7',
            300: '#feb2b2',
            400: '#fc8181',
            500: '#f56565',
            600: '#e53e3e',
            700: '#c53030',
            800: '#9b2c2c',
            900: '#742a2a'
         },
         orange: {
            100: '#fffaf0',
            200: '#feebc8',
            300: '#fbd38d',
            400: '#f6ad55',
            500: '#ed8936',
            600: '#dd6b20',
            700: '#c05621',
            800: '#9c4221',
            900: '#7b341e'
         },
         yellow: {
            100: '#fffff0',
            200: '#fefcbf',
            300: '#faf089',
            400: '#f6e05e',
            500: '#ecc94b',
            600: '#d69e2e',
            700: '#b7791f',
            800: '#975a16',
            900: '#744210'
         },
         green: {
            100: '#f0fff4',
            200: '#c6f6d5',
            300: '#9ae6b4',
            400: '#68d391',
            500: '#48bb78',
            600: '#38a169',
            700: '#2f855a',
            800: '#276749',
            900: '#22543d'
         },
         teal: {
            100: '#e6fffa',
            200: '#b2f5ea',
            300: '#81e6d9',
            400: '#4fd1c5',
            500: '#38b2ac',
            600: '#319795',
            700: '#2c7a7b',
            800: '#285e61',
            900: '#234e52'
         },
         blue: {
            100: '#ebf8ff',
            200: '#bee3f8',
            300: '#90cdf4',
            400: '#63b3ed',
            500: '#4299e1',
            600: '#3182ce',
            700: '#2b6cb0',
            800: '#2c5282',
            900: '#2a4365'
         },
         indigo: {
            100: '#ebf4ff',
            200: '#c3dafe',
            300: '#a3bffa',
            400: '#7f9cf5',
            500: '#667eea',
            600: '#5a67d8',
            700: '#4c51bf',
            800: '#434190',
            900: '#3c366b'
         },
         purple: {
            100: '#faf5ff',
            200: '#e9d8fd',
            300: '#d6bcfa',
            400: '#b794f4',
            500: '#9f7aea',
            600: '#805ad5',
            700: '#6b46c1',
            800: '#553c9a',
            900: '#44337a'
         },
         pink: {
            100: '#fff5f7',
            200: '#fed7e2',
            300: '#fbb6ce',
            400: '#f687b3',
            500: '#ed64a6',
            600: '#d53f8c',
            700: '#b83280',
            800: '#97266d',
            900: '#702459'
         },
         ...colors
      },
      spacing: {
         px: '1px',
         '0': '0',
         '1': '0.25rem',
         '2': '0.5rem',
         '3': '0.75rem',
         '4': '1rem',
         '5': '1.25rem',
         '6': '1.5rem',
         '8': '2rem',
         '10': '2.5rem',
         '12': '3rem',
         '16': '4rem',
         '20': '5rem',
         '24': '6rem',
         '32': '8rem',
         '40': '10rem',
         '48': '12rem',
         '56': '14rem',
         '64': '16rem',
         '4px': '4px',
         '8px': '8px',
         '20px': '20px',
         '12px': '12px',
         '13px': '13px',
         '14px': '14px',
         '16px': '16px',
         '25px': '25px',
         '28px': '28px',
         '32px': '32px',
         '36px': '36px',
         '48px': '48px',
         '56px': '56px',
         '78px': '78px',
         '540px': '540px',
         '290px': '290px',
         '228px': '228px',
         '208px': '208px',
         '40px': '40px',
         '24px': '24px',
         '70px': '70px',
         '162px': '162px',
         '64px': '64px'
      },
      backgroundColor: theme => theme('colors'),
      backgroundOpacity: theme => theme('opacity'),
      backgroundPosition: {
         bottom: 'bottom',
         center: 'center',
         left: 'left',
         'left-bottom': 'left bottom',
         'left-top': 'left top',
         right: 'right',
         'right-bottom': 'right bottom',
         'right-top': 'right top',
         top: 'top'
      },
      backgroundSize: {
         auto: 'auto',
         cover: 'cover',
         contain: 'contain'
      },
      borderColor: theme => ({
         ...theme('colors'),
         default: theme('colors.gray.300', 'currentColor')
      }),
      borderOpacity: theme => theme('opacity'),
      borderRadius: {
         none: '0',
         sm: '0.125rem',
         default: '0.25rem',
         md: '0.375rem',
         lg: '0.5rem',
         full: '9999px',
         '4px': '4px'
      },
      borderWidth: {
         default: '1px',
         '0': '0',
         '2': '2px',
         '4': '4px',
         '8': '8px'
      },
      boxShadow: {
         xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
         sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
         default:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
         md:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
         lg:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
         xl:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
         '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
         inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
         outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
         none: 'none'
      },
      container: {},
      cursor: {
         auto: 'auto',
         default: 'default',
         pointer: 'pointer',
         wait: 'wait',
         text: 'text',
         move: 'move',
         'not-allowed': 'not-allowed'
      },
      divideColor: theme => theme('borderColor'),
      divideOpacity: theme => theme('borderOpacity'),
      divideWidth: theme => theme('borderWidth'),
      fill: {
         current: 'currentColor'
      },
      flex: {
         '1': '1 1 0%',
         auto: '1 1 auto',
         initial: '0 1 auto',
         none: 'none'
      },
      flexGrow: {
         '0': '0',
         default: '1'
      },
      flexShrink: {
         '0': '0',
         default: '1'
      },
      fontFamily: {
         sans: [
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"'
         ],
         serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
         mono: [
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace'
         ]
      },
      fontSize: {
         xs: '0.75rem',
         sm: '0.875rem',
         base: '1rem',
         lg: '1.125rem',
         xl: '1.25rem',
         '72px': '72px',
         '60px': '60px',
         '48px': '48px',
         '30px': '30px',
         '32px': '32px',
         '24px': '24px',
         '20px': '20px',
         '18px': '18px',
         '10px': '10px',
         '12px': '12px',
         '16px': '16px',
         '14px': '14px',
         '26px': '26px',
         '36px': '36px',
         '2xl': '1.5rem',
         '3xl': '1.875rem',
         '4xl': '2.25rem',
         '5xl': '3rem',
         '6xl': '4rem'
      },
      fontWeight: {
         hairline: '100',
         thin: '200',
         light: '300',
         normal: '400',
         medium: '500',
         semibold: '600',
         bold: '700',
         extrabold: '800',
         black: '900'
      },
      height: theme => ({
         auto: 'auto',
         ...theme('spacing'),
         full: '100%',
         screen: '100vh'
      }),
      inset: {
         '0': '0',
         auto: 'auto',
         '10px': '10px'
      },
      letterSpacing: {
         tighter: '-0.05em',
         tight: '-0.025em',
         normal: '0',
         wide: '0.025em',
         wider: '0.05em',
         widest: '0.1em',
         '0.4px': '0.4px'
      },
      lineHeight: {
         none: '1',
         tight: '1.25',
         snug: '1.375',
         normal: '1.5',
         relaxed: '1.625',
         loose: '2',
         '3': '.75rem',
         '4': '1rem',
         '5': '1.25rem',
         '6': '1.5rem',
         '7': '1.75rem',
         '8': '2rem',
         '9': '2.25rem',
         '10': '2.5rem',
         '1.33': '1.33',
         '1.71': '1.71'
      },
      listStyleType: {
         none: 'none',
         disc: 'disc',
         decimal: 'decimal'
      },
      margin: (theme, { negative }) => ({
         auto: 'auto',
         ...theme('spacing'),
         ...negative(theme('spacing'))
      }),
      maxHeight: {
         full: '100%',
         screen: '100vh'
      },
      maxWidth: (theme, { breakpoints }) => ({
         none: 'none',
         xs: '20rem',
         sm: '24rem',
         md: '28rem',
         lg: '32rem',
         xl: '36rem',
         '2xl': '42rem',
         '3xl': '48rem',
         '4xl': '56rem',
         '5xl': '64rem',
         '6xl': '72rem',
         full: '100%',
         ...breakpoints(theme('screens'))
      }),
      minHeight: {
         '0': '0',
         full: '100%',
         screen: '100vh'
      },
      minWidth: {
         '0': '0',
         full: '100%'
      },
      objectPosition: {
         bottom: 'bottom',
         center: 'center',
         left: 'left',
         'left-bottom': 'left bottom',
         'left-top': 'left top',
         right: 'right',
         'right-bottom': 'right bottom',
         'right-top': 'right top',
         top: 'top'
      },
      opacity: {
         '0': '0',
         '25': '0.25',
         '50': '0.5',
         '75': '0.75',
         '100': '1'
      },
      order: {
         first: '-9999',
         last: '9999',
         none: '0',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7',
         '8': '8',
         '9': '9',
         '10': '10',
         '11': '11',
         '12': '12'
      },
      padding: theme => theme('spacing'),
      placeholderColor: theme => theme('colors'),
      placeholderOpacity: theme => theme('opacity'),
      space: (theme, { negative }) => ({
         ...theme('spacing'),
         ...negative(theme('spacing'))
      }),
      stroke: {
         current: 'currentColor'
      },
      strokeWidth: {
         '0': '0',
         '1': '1',
         '2': '2'
      },
      textColor: theme => theme('colors'),
      textOpacity: theme => theme('opacity'),
      width: theme => ({
         auto: 'auto',
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         '1/5': '20%',
         '2/5': '40%',
         '3/5': '60%',
         '4/5': '80%',
         '1/6': '16.666667%',
         '2/6': '33.333333%',
         '3/6': '50%',
         '4/6': '66.666667%',
         '5/6': '83.333333%',
         '1/12': '8.333333%',
         '2/12': '16.666667%',
         '3/12': '25%',
         '4/12': '33.333333%',
         '5/12': '41.666667%',
         '6/12': '50%',
         '7/12': '58.333333%',
         '8/12': '66.666667%',
         '9/12': '75%',
         '10/12': '83.333333%',
         '11/12': '91.666667%',
         '800': '800px',
         full: '100%',
         screen: '100vw'
      }),
      zIndex: {
         auto: 'auto',
         '0': '0',
         '10': '10',
         '20': '20',
         '30': '30',
         '40': '40',
         '50': '50'
      },
      gap: theme => theme('spacing'),
      gridTemplateColumns: {
         none: 'none',
         '1': 'repeat(1, minmax(0, 1fr))',
         '2': 'repeat(2, minmax(0, 1fr))',
         '3': 'repeat(3, minmax(0, 1fr))',
         '4': 'repeat(4, minmax(0, 1fr))',
         '5': 'repeat(5, minmax(0, 1fr))',
         '6': 'repeat(6, minmax(0, 1fr))',
         '7': 'repeat(7, minmax(0, 1fr))',
         '8': 'repeat(8, minmax(0, 1fr))',
         '9': 'repeat(9, minmax(0, 1fr))',
         '10': 'repeat(10, minmax(0, 1fr))',
         '11': 'repeat(11, minmax(0, 1fr))',
         '12': 'repeat(12, minmax(0, 1fr))'
      },
      gridColumn: {
         auto: 'auto',
         'span-1': 'span 1 / span 1',
         'span-2': 'span 2 / span 2',
         'span-3': 'span 3 / span 3',
         'span-4': 'span 4 / span 4',
         'span-5': 'span 5 / span 5',
         'span-6': 'span 6 / span 6',
         'span-7': 'span 7 / span 7',
         'span-8': 'span 8 / span 8',
         'span-9': 'span 9 / span 9',
         'span-10': 'span 10 / span 10',
         'span-11': 'span 11 / span 11',
         'span-12': 'span 12 / span 12'
      },
      gridColumnStart: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7',
         '8': '8',
         '9': '9',
         '10': '10',
         '11': '11',
         '12': '12',
         '13': '13'
      },
      gridColumnEnd: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7',
         '8': '8',
         '9': '9',
         '10': '10',
         '11': '11',
         '12': '12',
         '13': '13'
      },
      gridTemplateRows: {
         none: 'none',
         '1': 'repeat(1, minmax(0, 1fr))',
         '2': 'repeat(2, minmax(0, 1fr))',
         '3': 'repeat(3, minmax(0, 1fr))',
         '4': 'repeat(4, minmax(0, 1fr))',
         '5': 'repeat(5, minmax(0, 1fr))',
         '6': 'repeat(6, minmax(0, 1fr))'
      },
      gridRow: {
         auto: 'auto',
         'span-1': 'span 1 / span 1',
         'span-2': 'span 2 / span 2',
         'span-3': 'span 3 / span 3',
         'span-4': 'span 4 / span 4',
         'span-5': 'span 5 / span 5',
         'span-6': 'span 6 / span 6'
      },
      gridRowStart: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7'
      },
      gridRowEnd: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7'
      },
      transformOrigin: {
         center: 'center',
         top: 'top',
         'top-right': 'top right',
         right: 'right',
         'bottom-right': 'bottom right',
         bottom: 'bottom',
         'bottom-left': 'bottom left',
         left: 'left',
         'top-left': 'top left'
      },
      scale: {
         '0': '0',
         '50': '.5',
         '75': '.75',
         '90': '.9',
         '95': '.95',
         '100': '1',
         '105': '1.05',
         '110': '1.1',
         '125': '1.25',
         '150': '1.5'
      },
      rotate: {
         '-180': '-180deg',
         '-90': '-90deg',
         '-45': '-45deg',
         '0': '0',
         '45': '45deg',
         '90': '90deg',
         '180': '180deg'
      },
      translate: (theme, { negative }) => ({
         ...theme('spacing'),
         ...negative(theme('spacing')),
         '-full': '-100%',
         '-1/2': '-50%',
         '1/2': '50%',
         full: '100%'
      }),
      skew: {
         '-12': '-12deg',
         '-6': '-6deg',
         '-3': '-3deg',
         '0': '0',
         '3': '3deg',
         '6': '6deg',
         '12': '12deg'
      },
      transitionProperty: {
         none: 'none',
         all: 'all',
         default:
            'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
         colors: 'background-color, border-color, color, fill, stroke',
         opacity: 'opacity',
         shadow: 'box-shadow',
         transform: 'transform'
      },
      transitionTimingFunction: {
         linear: 'linear',
         in: 'cubic-bezier(0.4, 0, 1, 1)',
         out: 'cubic-bezier(0, 0, 0.2, 1)',
         'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
         '75': '75ms',
         '100': '100ms',
         '150': '150ms',
         '200': '200ms',
         '300': '300ms',
         '500': '500ms',
         '700': '700ms',
         '1000': '1000ms'
      },
      transitionDelay: {
         '75': '75ms',
         '100': '100ms',
         '150': '150ms',
         '200': '200ms',
         '300': '300ms',
         '500': '500ms',
         '700': '700ms',
         '1000': '1000ms'
      }
   },
   variants: {
      accessibility: ['responsive', 'focus'],
      alignContent: ['responsive'],
      alignItems: ['responsive'],
      alignSelf: ['responsive'],
      appearance: ['responsive'],
      backgroundAttachment: ['responsive'],
      backgroundColor: ['responsive', 'hover', 'focus'],
      backgroundOpacity: ['responsive', 'hover', 'focus'],
      backgroundPosition: ['responsive'],
      backgroundRepeat: ['responsive'],
      backgroundSize: ['responsive'],
      borderCollapse: ['responsive'],
      borderColor: ['responsive', 'hover', 'focus'],
      borderOpacity: ['responsive', 'hover', 'focus'],
      borderRadius: ['responsive'],
      borderStyle: ['responsive'],
      borderWidth: ['responsive'],
      boxShadow: ['responsive', 'hover', 'focus'],
      boxSizing: ['responsive'],
      cursor: ['responsive'],
      display: ['responsive'],
      divideColor: ['responsive'],
      divideOpacity: ['responsive'],
      divideWidth: ['responsive'],
      fill: ['responsive'],
      flex: ['responsive'],
      flexDirection: ['responsive'],
      flexGrow: ['responsive'],
      flexShrink: ['responsive'],
      flexWrap: ['responsive'],
      float: ['responsive'],
      clear: ['responsive'],
      fontFamily: ['responsive'],
      fontSize: ['responsive'],
      fontSmoothing: ['responsive'],
      fontStyle: ['responsive'],
      fontWeight: ['responsive', 'hover', 'focus'],
      height: ['responsive'],
      inset: ['responsive'],
      justifyContent: ['responsive'],
      letterSpacing: ['responsive'],
      lineHeight: ['responsive'],
      listStylePosition: ['responsive'],
      listStyleType: ['responsive'],
      margin: ['responsive'],
      maxHeight: ['responsive'],
      maxWidth: ['responsive'],
      minHeight: ['responsive'],
      minWidth: ['responsive'],
      objectFit: ['responsive'],
      objectPosition: ['responsive'],
      opacity: ['responsive', 'hover', 'focus'],
      order: ['responsive'],
      outline: ['responsive', 'focus'],
      overflow: ['responsive'],
      padding: ['responsive'],
      placeholderColor: ['responsive', 'focus'],
      placeholderOpacity: ['responsive', 'focus'],
      pointerEvents: ['responsive'],
      position: ['responsive'],
      resize: ['responsive'],
      space: ['responsive'],
      stroke: ['responsive'],
      strokeWidth: ['responsive'],
      tableLayout: ['responsive'],
      textAlign: ['responsive'],
      textColor: ['responsive', 'hover', 'focus'],
      textOpacity: ['responsive', 'hover', 'focus'],
      textDecoration: ['responsive', 'hover', 'focus'],
      textTransform: ['responsive'],
      userSelect: ['responsive'],
      verticalAlign: ['responsive'],
      visibility: ['responsive'],
      whitespace: ['responsive'],
      width: ['responsive'],
      wordBreak: ['responsive'],
      zIndex: ['responsive'],
      gap: ['responsive'],
      gridAutoFlow: ['responsive'],
      gridTemplateColumns: ['responsive'],
      gridColumn: ['responsive'],
      gridColumnStart: ['responsive'],
      gridColumnEnd: ['responsive'],
      gridTemplateRows: ['responsive'],
      gridRow: ['responsive'],
      gridRowStart: ['responsive'],
      gridRowEnd: ['responsive'],
      transform: ['responsive'],
      transformOrigin: ['responsive'],
      scale: ['responsive', 'hover', 'focus'],
      rotate: ['responsive', 'hover', 'focus'],
      translate: ['responsive', 'hover', 'focus'],
      skew: ['responsive', 'hover', 'focus'],
      transitionProperty: ['responsive'],
      transitionTimingFunction: ['responsive'],
      transitionDuration: ['responsive'],
      transitionDelay: ['responsive']
   },
   corePlugins: {},
   plugins: []
}
