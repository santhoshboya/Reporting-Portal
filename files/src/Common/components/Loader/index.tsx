import * as React from 'react'
import ReactLoader from 'react-loader-spinner'

import colors from '../../themes/Colors'
import i18n from '../../i18n'

interface LoaderProps {
   height?: number
   width?: number
   type?: string
   color?: string
   [x: string]: any
}

class Loader extends React.Component<LoaderProps> {
   static defaultProps = {
      type: i18n.t('common:loader.oval'),
      color: colors.primaryColor,
      height: 30,
      width: 30
   }

   render() {
      const { height, width, type, color, ...other } = this.props
      return (
         <ReactLoader
            type={type}
            color={color}
            height={height}
            width={width}
            {...other}
         />
      )
   }
}

export default Loader
