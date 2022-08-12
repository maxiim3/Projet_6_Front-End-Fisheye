class PhotographerCard {
   constructor(data, accessibilityIndex) {
      this._data = data
      this._index = accessibilityIndex

   }

   createCardWrapper() {
      const { name } = this._data

      const $card = document.createElement('li')
      $card.classList.value = 'card'
      $card.ariaRoleDescription = "Photographe"
      $card.ariaLabel = `Photographe : ${name}`
      return $card
   }

   createLinkSection() {
      const { id, name, portrait } = this._data

      // link to artist page | contains img and h2
      const $linkFocusable = document.createElement('a')
      $linkFocusable.classList.value = 'card__artistLink'
      $linkFocusable.href = `photographer.html?photographer=${id}`
      $linkFocusable.ariaRoleDescription = "Lien"
      $linkFocusable.ariaLabel = `Cliquer pour accéder à la page de l'artiste ${name}`
      $linkFocusable.tabIndex = this._index

      // Image Portrait
      const $portrait = document.createElement('img')
      $portrait.classList.value = 'card__link__portrait'
      $portrait.src = portrait
      $portrait.alt = `Portrait de ${name}`

      // Title with artist name
      const $h2 = document.createElement('h2')
      $h2.innerText = name
      $h2.classList.value = 'card__link__title'
      $h2.ariaLabel = name

      //Append img and title to link
      $linkFocusable.appendChild($portrait)
      $linkFocusable.appendChild($h2)

      return $linkFocusable
   }

   createInformationSection() {
      const { location, tagline, price } = this._data

      const items = [
         {
            key: 'location',
            value: location,
            ariaLabel: "Localisation de l'artiste",
         },
         {
            key: 'tagLine',
            value: tagline,
            ariaLabel: 'Slogan',
         },
         {
            key: 'price',
            value: price,
            ariaLabel: 'Tarifs journaliers',
         },
      ]
      const $information = document.createElement('ul')
      $information.classList.value = 'card__information'
      $information.ariaLabel = 'Plus d\'informations'
      $information.tabIndex = this._index + 1


      items.forEach(({ key, value, ariaLabel }) => {
         const $li = document.createElement('li')
         $li.innerText = value
         $li.classList.value = `card__information__item card__information__item--${key}`
         $li.ariaRoleDescription=`Informations ${key}`
         $li.ariaLabel = ariaLabel
         $information.appendChild($li)
      })

      return $information
   }

   // todo  remplacer BEM par tailwind style, car pas beaucoup d'element
   // todo refactoriser pour isoler la creation des e;ements redondant
   renderHeader() {
      const {name, location, portrait, tagline} = this._data

      // display active photographer in header
      // Image Portrait
      const $portrait = document.createElement('img')
      $portrait.classList.value = 'card__link__portrait'
      $portrait.src = portrait
      $portrait.alt = `Portrait de ${name}`

      const $information = document.createElement('ul')
      $information.classList.value = 'card__information'
      $information.ariaLabel = "Plus d'informations"

      const $h2 = document.createElement('h2')
      $h2.innerText = name
      $h2.classList.value = 'card__link__title'
      $h2.ariaLabel = name

      const $location = document.createElement('p')
      $location.innerText = location
      $location.classList.value = `card__information__item card__information__item--location`
      $location.ariaLabel = "Emplacement de l'artiste"

      const $slogan = document.createElement('p')
      $slogan.innerText = tagline
      $slogan.classList.value = `card__information__item card__information__item--tagLine`
      $slogan.ariaLabel = "Slogan"



      $information.appendChild($h2)
      $information.appendChild($location)
      $information.appendChild($slogan)

      return [$information, $portrait]
   }

   createPhotographerCard() {
      const card = this.createCardWrapper()
      const linkFocusable = this.createLinkSection()
      const information = this.createInformationSection()

      // add main component to card wrapper
      card.appendChild(linkFocusable)
      card.appendChild(information)

      return card
   }
}
