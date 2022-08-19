/**
 * @return {HTMLElement} return an aside element with information about the photographer
 * @param {PhotographerConstructor} price get the price data from the active photographer
 * @method {type: function} init(), add the node to the dom
 */

class AsideInformation {
   constructor({ price }) {
      this._price = price
      this.$main = document.querySelector('#main')
      this.$aside = document.createElement('aside')
      this.$likes = document.createElement('span')
      this.$price = document.createElement('span')
      this.$likesIcon = document.createElement('img')
   }

   init() {
      this.$likesIcon.src = 'assets/icons/heart-solid.svg'
      this.$likesIcon.alt = 'Cliquez pour ajouter à vos favoris'
      this.$likesIcon.classList.value = 'likeIcon'

      this.$likes.innerText = `3000`
      this.$likes.ariaLabel = 'Nombre de likes'

      this.$price.innerText = this._price
      this.$price.ariaLabel = 'Tarifs journaliers'
      this.$aside.ariaLabel = 'Informations sur le photographe'
      this.$aside.classList.value = 'photographer__aside'

      this.$likes.appendChild(this.$likesIcon)

      this.$aside.appendChild(this.$likes)
      this.$aside.appendChild(this.$price)

      this.$main.appendChild(this.$aside)
   }
}
