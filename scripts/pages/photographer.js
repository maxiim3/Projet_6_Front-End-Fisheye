class App {
   _paramsId
   _photographer
   _medias = []
   _startingTabIndex

   constructor() {
      this.api = new Api('/data/photographers.json')
      this._paramsId = this.getParamsFromURL('photographer')
      this._startingTabIndex = 4
      this._countLikes = 0

      //Modal DOM Element
      /*this.$main = document.querySelector('#main')*/
      this.$mediasContainer = document.getElementById('cardWrapper')
      this.spinnerLoader = new LoadingSpinner(this.$mediasContainer)
   }

   async fetchDataFromApi() {
      return await this.api.fetch()
   }

   getParamsFromURL(key) {
      const params = new URL(document.location).searchParams
      return parseInt(params.get(key))
   }

   async getData() {
      const { media: allMedias, photographers: allPhotographers } = await this.fetchDataFromApi()

      const filterPhotographer = allPhotographers.filter(ph => ph.id === this._paramsId)[0]
      this._photographer = new PhotographerConstructor(filterPhotographer)
      document.querySelector('h1').textContent = this._photographer.name
      allMedias
         .filter(data => data.photographerId === this._photographer.id)
         .map(data => {
            this._medias.push(MediaWithPhotographer(new MediaConstructor(data), this._photographer))
         })
   }

   async renderFormModal() {
      document.title = this._photographer.name
      document.querySelector('#form_photographer').textContent = this._photographer.name
      const modal = new Modal()
      const $form = createForm()
      modal.init()
      return handleForm($form)
   }

   async renderMedias(data) {
      return data.forEach(media => {
         const cardTemplate = new CardTemplateFactory(media, this._startingTabIndex, 'media')
         const card = cardTemplate.createCard()
         this.$mediasContainer.appendChild(card)
         this._startingTabIndex += 2
      })
   }

   async renderPage() {
      this.spinnerLoader.removeSpinner()

      const heroBanner = new HeroBanner(this._photographer, this._startingTabIndex)
      heroBanner.createHeroBanner()

      const aside = new AsideInformation(this._photographer)
      aside.init()
      this._medias = this._medias.map(media => MediaWithLikeCounter(media, new LikeCounter(media)))
      await this.renderMedias(this._medias)

      return this._medias
   }

   async updateAsideOnLike() {
      const $asideLike = document
         .querySelector('.photographer__aside')
         .querySelector('.aside__count-like')

      const $allLikesWrapper = [...document.querySelectorAll('.card__information__wrapper')]
      $allLikesWrapper.forEach(wrapper => {
         const like = wrapper.querySelector('.card__information__likes')
         this._countLikes += parseInt(like.innerText)
      })
      $asideLike.textContent = this._countLikes

      return $asideLike
   }

   renderFilter() {
      const options = document.createElement('div')
      options.ariaLabel = 'sélectionner pour trier les éléments'
      options.classList.value = 'sort__options'
      options.dataset.dropped = 'false'

      const date = document.createElement('p')
      date.ariaLabel = 'trier les éléments par date'
      date.classList.value = 'sort__options--date'
      date.textContent = 'Date'
      date.tabIndex = options.dataset.dropped === 'true' ? 0 : -1

      const popularity = document.createElement('p')
      popularity.ariaLabel = 'trier les éléments par popularité'
      popularity.classList.value = 'sort__options--popularity'
      popularity.textContent = 'Popularité'
      popularity.tabIndex = options.dataset.dropped === 'true'  ? 0 : -1

      const title = document.createElement('p')
      title.ariaLabel = 'trier les éléments par tite'
      title.classList.value = 'sort__options--title'
      title.textContent = 'Titre'
      title.tabIndex = options.dataset.dropped === 'true' ? 0 : -1

      const icon = document.createElement('span')
      icon.classList.value = 'sort__options--icon fa-solid fa-angle-down'
      icon.tabIndex = -1

      const label = document.createElement('label')
      label.ariaHidden = 'true'
      label.classList.value = 'sort__label'
      label.textContent = 'Trier les éléments'
      label.tabIndex = 0

      options.appendChild(icon)
      options.appendChild(title)
      options.appendChild(popularity)
      options.appendChild(date)

      const wrapper = document.querySelector('.sort__wrapper')
      wrapper.appendChild(label)
      wrapper.appendChild(options)
      wrapper.tabIndex = -1
   }

   async handleSort() {
      const options = document.querySelector('.sort__options')
      const buttons = [...options.querySelectorAll('p'), document.querySelector('.sort__options--icon')]

      buttons.forEach(btn => {
         btn.addEventListener('click', async ev => {
            ev.preventDefault()
            switch (options.dataset.dropped) {
               case 'true':
                  btn.dataset.selected = 'true'
                  options.dataset.dropped = 'false'
                  buttons
                     .filter(others => others !== btn)
                     .forEach(other => {
                        other.dataset.hidden = 'true'
                     })
                  btn.style.opacity = '1'
                  const buttonsIndex = buttons.indexOf(btn)
                  // ⚠️ Added +1 to index because first is icon with absolute position
                  const optionsIndex = buttons.indexOf(btn) + 1
                  if (options.childNodes[1] !== options.childNodes[optionsIndex]) {
                     // reorder buttons array
                     const target = buttons[buttonsIndex]
                     buttons.splice(buttonsIndex, 1)
                     buttons.unshift(target)
                     // ℹ️ change order => place clicked on first position
                     options.insertBefore(options.childNodes[optionsIndex], options.childNodes[1])
                  }
                  sortBy(btn.textContent, this.$mediasContainer)
                  break

               case 'false':
                  options.dataset.dropped = 'true'
                  buttons.forEach(btn => (btn.dataset.hidden = 'false'))
                  break

               default:
                  throw 'Something went wrong..'
            }
         })
      })
   }

   async init() {
      this.spinnerLoader.renderSpinner()

      await this.getData()
      await this.renderFormModal()
      setTimeout(async () => {
         await this.renderPage()
         await this.updateAsideOnLike()
         this.renderFilter()
         await this.handleSort()
         const lb = new Lightbox(this._photographer, this._medias)
         await lb.init()
      }, 450)
   }
}

const app = new App()
app.init()
