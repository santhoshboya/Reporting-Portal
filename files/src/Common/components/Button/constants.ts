export const variants = {
   basic: 'BASIC',
   primary: 'PRIMARY',
   success: 'SUCCESS',
   info: 'INFO',
   warning: 'WARNING',
   danger: 'DANGER',
   control: 'CONTROL'
}

export const shapes = {
   rectangular: 'RECTANGULAR',
   pill: 'PILL',
   round: 'ROUND'
}

export const types = {
   filled: 'FILLED',
   outline: 'OUTLINE'
}

export const sizes = {
   large: 'LARGE',
   medium: 'MEDIUM',
   small: 'SMALL',
   tiny: 'TINY'
}

// TODO: These has to be removed and imported from themes/Colors
// TODO: After Removing make an export of themes/Colors  (reason: dependencies in /styledComponents)
export const Colors = {
   basic200: '#f5f7fa',
   basic300: '#e4e7eb',
   basic600: '#7b8794',
   basic800: '#52606d',
   transparentBasic24: 'rgba(123, 135, 148, 0.24)',
   transparentBasic48: 'rgba(123, 135, 148, 0.48)',
   transparentPrimary24: 'rgba(9, 103, 210, 0.24)',
   primary500Default: '#0967d2',
   success500Default: '#27ab83',
   info500Default: '#0fb5ba',
   warning500Default: '#de911d',
   danger500Default: '#cf1124',
   textColorDefault: '#1f2933',
   transparentBasic8: 'rgba(123, 135, 148, 0.08)',
   transparentPrimary8: 'rgba(9, 103, 210, 0.08)',
   transparentSuccess8: 'rgba(39, 171, 131, 0.08)',
   transparentInfo8: 'rgba(28, 212, 212, 0.08)',
   transparentWarning8: 'rgba(240, 180, 41, 0.08)',
   transparentDanger8: 'rgba(225, 45, 57, 0.08)',
   white: '#fff',
   white8: 'rgba(255, 255, 255, 0.08)'
}
