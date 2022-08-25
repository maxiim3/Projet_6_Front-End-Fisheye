class CardPhotographer {
   #data

   constructor(data, accessibilityIndex) {
      this.#data = data
      this._index = accessibilityIndex
   }

   get data() {
      return this.#data
   }

   getCardWrapper({ name }) {
      const card = new CardComponent(name, 'Photographe')
      return card.createComponent()
   }

   getInformationSection() {
      const $information = document.createElement('ul')
      $information.classList.value = 'photographer__information'
      $information.ariaLabel = 'Plus d\'informations'
      $information.tabIndex = this._index + 1
      return $information
   }

   getLink({ id }) {
      const link = new LinkComponent(
         'accéder à la page de l\'artiste',
         this._index,
         { photographer: { id: 'photographer', value: id } },
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
      $h2.classList.value = 'photographer__name'
      $h2.ariaLabel = name

      return $h2
   }

   getCity({ location }) {
      const $li = document.createElement('li')
      $li.innerText = location
      $li.classList.value = `photographer__information__location`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getTagLine({ tagline }) {
      const $li = document.createElement('li')
      $li.innerText = tagline
      $li.classList.value = `photographer__information__tagline`
      $li.ariaRoleDescription = `Localisation de l'artiste`
      $li.ariaLabel = 'Ville et Pays'

      return $li
   }

   getPrice({ price }) {
      const $li = document.createElement('li')
      $li.innerText = price
      $li.classList.value = `photographer__information__price`
      $li.ariaRoleDescription = `Tarifs`
      $li.ariaLabel = 'Tarifs journaliers'

      return $li
   }

   createCard() {
      // wrapper
      const $card = this.getCardWrapper(this.data)
      //Link
      const $link = this.getLink(this.data)
      //img
      const $portrait = this.getPortrait(this.data)
      //h2
      const $h2 = this.getH2(this.data)
      //Info
      const $information = this.getInformationSection()
      //city
      const $city = this.getCity(this.data)
      //tag
      const $tagline = this.getTagLine(this.data)
      // price
      const $price = this.getPrice(this.data)

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
