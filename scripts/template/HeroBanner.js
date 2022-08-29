/**
 * @param {PhotographerConstructor} data
 * @param {number} accessibilityIndex Index for screen Readers
 * @method {function } createHeroBanner() return the node element
 * @return {HTMLTemplateElement}
 * @type {HTMLTemplateElement}
 */
class HeroBanner {
   constructor(data, accessibilityIndex) {
      this._data = data
      this._index = accessibilityIndex
      this.$heroBanner = document.querySelector('#hero-banner')
   }
   getInformationSection() {
      const $information = document.createElement('article')
      $information.classList.value = 'header__information'
      $information.ariaLabel = "Informations"
      $information.tabIndex = this._index + 1
      return $information
   }
   getH1({ name }) {
      const $h1 = document.createElement('h2')
      $h1.innerText = name
      $h1.classList.value = 'header__title'
      $h1.ariaLabel = `Nom de du/de la photographe: ${name}`

      return $h1
   }

   getCity({ location }) {
      const $li = document.createElement('p')
      $li.innerText = location
      $li.classList.value = `header__location`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getTagLine({ tagline }) {
      const $li = document.createElement('p')
      $li.innerText = tagline
      $li.classList.value = `header__tagline`
      $li.ariaRoleDescription = `Slogan de l'artiste`
      $li.ariaLabel = 'Slogan'

      return $li
   }

   getPortrait({ portrait, name }) {
      const portraitFactory = new Portrait({ portrait, name })
      return portraitFactory.createComponent()
   }

   createHeroBanner(){
      const $information = this.getInformationSection()

      const $h1 = this.getH1(this._data)
      const $city = this.getCity(this._data)
      const $tagline = this.getTagLine(this._data)
      const $portrait = this.getPortrait(this._data)

      $information.appendChild($h1)
      $information.appendChild($city)
      $information.appendChild($tagline)

      this.$heroBanner.prepend($information)
      this.$heroBanner.appendChild($portrait)
   }
}
