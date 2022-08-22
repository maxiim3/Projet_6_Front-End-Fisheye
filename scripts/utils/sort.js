/**
 * Sort an Array
 * @param arr { [...MediaConstructor] } Array of medias
 * @param type { String } "titre" | "date" | "popularite"
 * @param sort { String } "INC" | "DEC"
 * @return arr
 */
async function sortBy(arr, type, sort) {
   arr.sort((a, b) => {
      switch (formatText(type)) {
         case 'titre':
            const titleA = a._data.title
            const titleB = b._data.title

            switch (sort.toUpperCase()) {
               case 'INC':
                  return titleA.localeCompare(titleB, 'en', { sensitivity: 'base' })
               case 'DEC':
                  return titleB.localeCompare(titleA, 'en', { sensitivity: 'base' })
            }
            break

         case 'date':
            const dateA = new Date(a._data.date)
            const dateB = new Date(b._data.date)

            switch (sort.toUpperCase()) {
               case 'INC':
                  return dateA - dateB
               case 'DEC':
                  return dateB - dateA
            }
            break

         case 'popularite':
            const countA = a.LikeCounter.count
            const countB = b.LikeCounter.count

            switch (sort.toUpperCase()) {
               case 'INC':
                  return countA - countB
               case 'DEC':
                  return countB - countA
            }
            break
      }
   })
   return arr
}
