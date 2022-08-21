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
      this.$main = document.querySelector('#main')
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

      allMedias
         .filter(data => data.photographerId === this._photographer.id)
         .map(data => {
            this._medias.push(MediaWithPhotographer(new MediaConstructor(data), this._photographer))
         })
   }

   async renderData() {
      this.spinnerLoader.removeSpinner()

      const heroBanner = new HeroBanner(this._photographer, this._startingTabIndex)
      heroBanner.createHeroBanner()

      const aside = new AsideInformation(this._photographer)
      aside.init()

      this._medias.forEach(media => {
         const cardTemplate = new CardTemplateFactory(media, this._startingTabIndex, 'media')
         const card = cardTemplate.createCard()
         this.$mediasContainer.appendChild(card)
         this._startingTabIndex += 2
      })
      this._medias.map(media => MediaWithLikeCounter(media, new LikeCounter(media)))
   }

   async init() {
      this.spinnerLoader.renderSpinner()

      await this.getData()

      document.title = this._photographer.name
      const modal = new Modal()
      const $form = createForm()
      modal.init()
      handleForm($form)

      // todo refactor
      setTimeout(async () => {
         await this.renderData()
         const lb = new Lightbox(this._photographer, this._medias)
         await lb.init()

         const $asideLike = document
            .querySelector('.photographer__aside')
            .querySelector('.aside__count-like')

         const $allLikesWrapper = [...document.querySelectorAll('.card__information__wrapper')]
         $allLikesWrapper.forEach(wrapper => {
            const like = wrapper.querySelector('.card__information__likes')
            this._countLikes += parseInt(like.innerText)
         })
         $asideLike.textContent = this._countLikes

      }, 450)
   }
}

const app = new App()
app.init()
