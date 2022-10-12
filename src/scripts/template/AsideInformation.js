/**
 * @return {HTMLElement} return an aside element with information about the photographer
 * @param {PhotographerConstructor} price get the price data from the active photographer
 * @method {type: function} init(), add the node to the dom
 */

class AsideInformation {
   constructor(media) {
      this._price = media.price
      this.$main = document.querySelector('#main')
      this.$aside = document.createElement('aside')
      this.likeWrapper = document.createElement('div')
      this.$likes = document.createElement('p')
      this.$likesIcon = document.createElement('span')
      this.$price = document.createElement('p')
   }

   init() {
      this.$likesIcon.alt = 'Cliquez pour ajouter à vos favoris'
      this.$likesIcon.classList.value = 'fa-solid fa-heart likeIcon'

      this.$likes.innerText = `3000`
      this.$likes.classList.value = `aside__count-like`
      this.$likes.ariaLabel = 'Nombre de likes'
      this.$likes.tabIndex = 0

      this.likeWrapper.classList.value = 'aside__wrapper'
      this.likeWrapper.ariaHidden = 'true'

      this.$price.innerText = this._price
      this.$price.ariaLabel = 'Tarifs journaliers'
      this.$aside.ariaLabel = 'Informations sur le photographe'
      this.$aside.classList.value = 'photographer__aside'

      this.likeWrapper.appendChild(this.$likes)
      this.likeWrapper.appendChild(this.$likesIcon)

      this.$aside.appendChild(this.likeWrapper)
      this.$aside.appendChild(this.$price)

      this.$main.appendChild(this.$aside)
   }
}
