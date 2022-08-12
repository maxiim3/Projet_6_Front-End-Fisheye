class PhotographerCard {
   constructor(data, accessibilityIndex) {
      this._data = data
      this._index = accessibilityIndex
   }

   getCardWrapper({ name }) {
      const card = new CardComponent(name, 'Photographe')
      return card.createComponent()
   }

   getInformationSection() {
      const $information = document.createElement('ul')
      $information.classList.value = 'flex flex__col justifyCenter alignCenter gap__sm'
      $information.ariaLabel = "Plus d'informations"
      $information.tabIndex = this._index + 1
      return $information
   }

   getLink({ id }) {
      const link = new LinkComponent(
         'photographer',
         id,
         "accéder à la page de l'artiste",
         this._index
      )
      return link.createComponent()
   }

   getPortrait({ portrait, name }) {
      const portraitFactory = new Portrait({ portrait, name })
      return portraitFactory.createComponent()
   }

   getH2({ name }) {
      const $h2 = document.createElement('h2')
      $h2.innerText = name
      $h2.classList.value = 'card__link__title text__xl clr__secondary'
      $h2.ariaLabel = name

      return $h2
   }

   getCity({ location }) {
      const $li = document.createElement('li')
      $li.innerText = location
      $li.classList.value = `text__sm clr__primary`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getTagLine({ tagline }) {
      const $li = document.createElement('li')
      $li.innerText = tagline
      $li.classList.value = `text__xs clr__dark`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getPrice({ price }) {
      const $li = document.createElement('li')
      $li.innerText = price
      $li.classList.value = `text__xs--alt clr__gray`
      $li.ariaRoleDescription = `Tarifs`
      $li.ariaLabel = 'Tarifs journaliers'

      return $li
   }

   createPhotographerCard() {
      // wrapper
      const $card = this.getCardWrapper(this._data)
      //Link
      const $link = this.getLink(this._data)
      //img
      const $portrait = this.getPortrait(this._data)
      //h2
      const $h2 = this.getH2(this._data)
      //Info
      const $information = this.getInformationSection()
      //city
      const $city = this.getCity(this._data)
      //tag
      const $tagline = this.getTagLine(this._data)
      // price
      const $price = this.getPrice(this._data)

      $link.appendChild($portrait)
      $link.appendChild($h2)

      $information.appendChild($city)
      $information.appendChild($tagline)
      $information.appendChild($price)

      $card.appendChild($link)
      $card.appendChild($information)

      return $card
   }
}
