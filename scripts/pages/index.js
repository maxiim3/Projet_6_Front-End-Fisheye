class App {
   constructor() {
      this.api = new Api('/data/photographers.json')
      this.$mediasContainer = document.getElementById('cardWrapper')
      this.spinnerLoader = new LoadingSpinner(this.$mediasContainer)
   }

   async getPhotographers() {
      const allData = await this.api.fetch()
      return allData['photographers']
   }

   async displayPhotographers(photographers) {
      this.spinnerLoader.removeSpinner()
      return photographers
         .map(photographer => new PhotographerConstructor(photographer))
         .forEach(photographer => {
            const template = new CardTemplateFactory(photographer, 'photographer')
            const card = template.createCard()
            this.$mediasContainer.appendChild(card)
         })
   }

   async init() {
      this.spinnerLoader.renderSpinner()
      const photographers = await this.getPhotographers()
      return await this.displayPhotographers(photographers)
   }
}

const app = new App()
app.init()
