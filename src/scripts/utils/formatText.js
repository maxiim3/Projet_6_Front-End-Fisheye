/**
 *
 * @param {string} text Repace extras whitespaces, accented voyelles
 * @return {string}
 */
function formatText(text) {
   return text.toLowerCase().replaceAll(' ', '-').replaceAll('é', 'e').replaceAll('è', 'e')
}