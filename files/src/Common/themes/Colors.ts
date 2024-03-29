/*


------

NOTE: 

Dont use colors from this file
This is being deprecated: use from tailwind.config.js

All Styles have to be applied using tailwind macro. No styled components.


Use src/Common/components/TailwindComponent.stories.ts as reference


------



*/
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
   white: 'rgba(255,255,255,1)',
   cobaltTwo: '#0047AB',
   paleLilac: '#c8a2c8',
   darkSkyBlueThree: '#00bfff',
   marineBlue: '#1e3f5a',
   solitude: '#f5f7fa',
   lightSlateGrey: '#7b8794',
   grey: '#9aa5b1',
   white8: 'rgba(255, 255, 255, 0.08)',
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
   turquoiseblue: '#00b2ca',
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
   gray200: '#fbfbfb',
   cloudyBlue: '#bdc7d2',
   lightBlueGrey: '#d7dfe9'
}

export default colors
