// todo  remplacer BEM par tailwind style, car pas beaucoup d'element
// todo refactoriser pour isoler la creation des e;ements redondant

class RenderHeader {
   constructor(data, accessibilityIndex) {
      this._data = data
      this._index = accessibilityIndex
      this.$headerWrapper = document.querySelector('.photograph-header')
   }
   getInformationSection() {
      const $information = document.createElement('ul')
      $information.classList.value = 'flex flex__col alignCenter gap__m'
      $information.ariaLabel = "Informations"
      $information.tabIndex = this._index + 1
      return $information
   }
   getH1({ name }) {
      const $h1 = document.createElement('h1')
      $h1.innerText = name
      $h1.classList.value = 'card__link__title text__xxl clr__secondary'
      $h1.ariaLabel = name

      return $h1
   }

   getCity({ location }) {
      const $li = document.createElement('li')
      $li.innerText = location
      $li.classList.value = `text__l clr__primary`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getTagLine({ tagline }) {
      const $li = document.createElement('li')
      $li.innerText = tagline
      $li.classList.value = `text__m clr__dark`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getPortrait({ portrait, name }) {
      const portraitFactory = new Portrait({ portrait, name })
      return portraitFactory.createComponent()
   }

   createHeader(){
      const $information = this.getInformationSection()
      const $h1 = this.getH1(this._data)
      const $city = this.getCity(this._data)
      const $tagline = this.getTagLine(this._data)
      const $portrait = this.getPortrait(this._data)
      $information.appendChild($h1)
      $information.appendChild($city)
      $information.appendChild($tagline)
      this.$headerWrapper.prepend($information)
      this.$headerWrapper.appendChild($portrait)
   }
}
