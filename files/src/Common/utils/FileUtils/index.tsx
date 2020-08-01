export const downloadTextAsFile = (
   fileName: string,
   downloadText: string
): void => {
   const element = document.createElement('a')
   const file = new Blob([downloadText], {
      type: 'text/plain'
   })
   element.href = URL.createObjectURL(file)
   element.download = fileName
   document.body.appendChild(element) // Required for this to work in FireFox
   element.click()
}
