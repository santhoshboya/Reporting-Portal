import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImageElement = styled(LazyLoadImage)`
   ${tw``}
   object-fit: contain;
`
export { ImageElement }
