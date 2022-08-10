class App {
   constructor() {
      this.photographersApi = new PhotographersApi('/data/photographers.json')
      this.$photographersCardWrapper = document.querySelector('.photographer_section')
   }

   async init() {
      const allData = await this.photographersApi.getPhotographers()
      const photographerData = allData['photographers']

      photographerData.forEach(d => {
         const photographerData = new PhotographerConstructor(d)
         const CardTemplate = new PhotographerCard(photographerData)
         const generateCardTemplate = CardTemplate.createPhotographerCard()

         this.$photographersCardWrapper.appendChild(generateCardTemplate)
      })
   }
}

const app = new App()
app.init()
