class App {
   _photographer
   _medias = []

   constructor() {
      //Modal DOM Element
      this.$mediasContainer = document.getElementById('cardWrapper')

      this._countLikes = 0
      this.api = new Api('/public/data/photographers.json')
      this.spinnerLoader = new LoadingSpinner(this.$mediasContainer)
   }

   /**
    * ### getParamsFromURL
    * @param key {string} key of param in URL
    * @return {number} ID of the active photographer from the URL params
    */
   getParamsFromURL(key) {
      const params = new URL(document.location).searchParams
      return parseInt(params.get(key))
   }

   /**
    * ### getData
    * @return {VoidFunction} maps an <Array> of <MediaWithPhotographer> filtered by active photographer
    */
   async getData() {
      const { media: allMedias, photographers: allPhotographers } = await this.api.fetch()

      // get photographer ID from URL params
      const paramsId = this.getParamsFromURL('photographer')
      // Filter JSON Data
      const filteredPhotographer = allPhotographers.filter(ph => ph.id === paramsId)[0]
      // Constructor Pattern
      this._photographer = new PhotographerConstructor(filteredPhotographer)
      // Filter Medias
      allMedias
         .filter(data => data.photographerId === this._photographer.id)
         .map(data => {
            this._medias.push(MediaWithPhotographer(new MediaConstructor(data), this._photographer))
         })
   }

   setDocumentTitle() {
      return (document.title = this._photographer.name)
   }

   setMainTitle() {
      return (document.querySelector('h1').textContent = this._photographer.name)
   }

   async renderFormModal() {
      document.querySelector('#form_photographer').textContent = this._photographer.name
      const modal = new Modal()
      const $form = Form.createForm()
      modal.init()
      return Form.handleForm($form)
   }

   async renderPage() {
      this.setDocumentTitle()
      this.setMainTitle()

      this.spinnerLoader.removeSpinner()

      // Render Hero Banner
      const heroBanner = new HeroBanner(this._photographer)
      heroBanner.createHeroBanner()

      // Render Aside Informations
      const aside = new AsideInformation(this._photographer)
      aside.init()

      // Decorator Pattern with Like Counter => () => renderMedias()
      this._medias = this._medias.map(media => MediaWithLikeCounter(media, new LikeCounter(media)))
      await this.renderMedias(this._medias)

      return this._medias
   }

   async renderMedias(data) {
      return data.forEach(media => {
         const cardTemplate = new CardTemplateFactory(media, 'media')
         const card = cardTemplate.createCard()
         this.$mediasContainer.appendChild(card)
      })
   }

   /**
    * @return {HTMLElement} Count and initiate the total number of likes element in the page, and set it in aside section
    */
   async countTotalLike() {
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

   async init() {
      this.spinnerLoader.renderSpinner()
      await this.getData()
      await this.renderFormModal()

      setTimeout(async () => {
         await this.renderPage()
         await this.countTotalLike()
         const filter = new Filter()
         await filter.init()
         const lb = new Lightbox(this._photographer, this._medias)
         await lb.init()
      }, 300)
   }
}

const app = new App()
app.init()
