export const getString = (input): string => {
   if (typeof input === 'string') return input
   return '' //TODO: change this logic
}

export const getSelectedBoard = (location, firstBoard): string => {
   const params = new URLSearchParams(location.search)
   const board = params.get('board')
   if (board) return getString(board)
   return firstBoard
}
