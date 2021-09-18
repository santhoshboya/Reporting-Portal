const colors = [
   '#1665d8',
   '#ff6b3c',
   '#52606d',
   '#ffbc2f',
   '#0967d2',
   '#e12d39',
   '#c42d78',
   '#690cb0',
   '#099aa4',
   '#19216c'
]

export function getRandomColorsArray(length: number): Array<string> {
   const colorValues = Object.values(colors)
   let i = 0
   const randomColorsArray: Array<string> = []
   while (i < length) {
      const color = colorValues[Math.floor(Math.random() * colorValues.length)]
      if (randomColorsArray.includes(color) === false) {
         randomColorsArray.push(color)
         i++
      }
   }
   return randomColorsArray
}
