export function getPaginationResponse<T>(
   arrayOfEntities: Array<T>,
   limit: number,
   offset: number
): Array<T> {
   return arrayOfEntities.slice(offset, limit + offset)
}
