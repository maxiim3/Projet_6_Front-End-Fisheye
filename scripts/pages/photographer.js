class App {
   constructor() {
      // Import API
      this.api = new Api('/data/photographers.json')

      // DOM
      this.$photographersHeader = document.querySelector('.photograph-header')
      this.$photographersCardWrapper = document.querySelector('.media_section')
      this.$modal = document.getElementById('contact_modal')

      // Modal Observer
      this.Open = new OpenButtonObserver()
      this.Close = new CloseButtonObserver()
      this.WatcherModal = new ModalSubject()

      // Index for screen reader
      this.startingTabIndex = 4

      // Get params from URl
      this.params = new URL(document.location).searchParams
      this.paramsId = parseInt(this.params.get('photographer'))
   }

   initModal() {
      this.WatcherModal.subscribe(this.Open)
      this.WatcherModal.subscribe(this.Close)
      this.WatcherModal.fire(this.$modal)
   }

   renderMedia(photographers, medias) {
      const { name, id } = photographers
      medias
         .filter(media => media.photographerId === id)
         .map(data => {
            const mediaData = new MediaConstructor(data)
            const mediaWithName = MediaWithName(mediaData, name)
            return new CardFactory(mediaWithName, this.startingTabIndex, 'media')
         })
         .forEach(template => {
            const card = template.createMediaCard()

            this.$photographersCardWrapper.appendChild(card)
            this.startingTabIndex += 2
         })
   }

   async init() {
      // Get data from photographers and media
      const mediasData = await this.api.getMedia()
      const photographers = await this.api.getPhotographers()

      const activePhotographer = photographers.filter(ph => ph.id === this.paramsId)[0]
      const activePhotographerData = new PhotographerConstructor(activePhotographer)
      const header = new CardFactory(activePhotographerData, this.startingTabIndex, 'photographer')
      const [ information, picture ] = header.renderHeader()

      this.$photographersHeader.prepend(information)
      this.$photographersHeader.append(picture)

      this.initModal()
      this.renderMedia(activePhotographer, mediasData)
   }
}

const app = new App()
app.init()
