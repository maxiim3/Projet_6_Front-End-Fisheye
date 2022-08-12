class App {
   constructor() {
      //Import API
      this.api = new Api('/data/photographers.json')

      // DOM
      this.$photographersCardWrapper = document.querySelector('.photographer_section')

      // Index for screen reader
      this.startingTabIndex = 2
   }

   async init() {
      // get data from photographers
      const photographers = await this.api.getPhotographers()

      // Create photographer object
      // and create new template cards from factory
      photographers
         .map(data => {
            const photographer = new PhotographerConstructor(data)
            return new CardFactory(photographer, this.startingTabIndex, 'photographer')
         })
         .forEach(template => {
            const card = template.createPhotographerCard()
            this.$photographersCardWrapper.appendChild(card)
            this.startingTabIndex += 2
         })
   }
}

const app = new App()
app.init()
