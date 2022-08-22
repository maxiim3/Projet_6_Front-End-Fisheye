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

   async renderFormModal() {
      document.title = this._photographer.name
      const modal = new Modal()
      const $form = createForm()
      modal.init()
      return handleForm($form)
   }

   // Trier Par :
   // Popularity (likes) || Date || Titre
   async sortBy(data, type, sort) {
      await sortBy(data, type, sort)
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

      const lb = new Lightbox(this._photographer, this._medias)
      await lb.init()

      const heroBanner = new HeroBanner(this._photographer, this._startingTabIndex)
      heroBanner.createHeroBanner()

      const aside = new AsideInformation(this._photographer)
      aside.init()
      this._medias = this._medias.map(media => MediaWithLikeCounter(media, new LikeCounter(media)))

    /*  const data = await sortBy(this._medias, 'titre', "inc")
      await this.renderMedias(data)*/
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

   async init() {
      this.spinnerLoader.renderSpinner()

      await this.getData()
      await this.renderFormModal()
      setTimeout(async () => {
         await this.renderPage()
         await this.updateAsideOnLike()
         // await this.sortBy()
      }, 450)

      // creer block filter
      // regler les style pour afficher/cacher le bloque
      // recuperer la valeur du filtre selectionner
      // l'emvoyer dans sortBy()
   }
}

const app = new App()
app.init()
/*const arr = [
   { age: 54, sub: { price: 64, birth: '2005/11/6', name: 'Walter' } },
   { age: 12, sub: { price: 98, birth: '1908/06/24', name: 'Armel' } },
   { age: 18, sub: { price: 2, birth: '1787/08/31', name: 'Boby' } },
]
sort(arr, 'sub.price', 'inc')
arr.forEach(a => console.table(a.sub))*/

// console.log('3'.localeCompare('2'))