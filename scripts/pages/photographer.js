   const getPhotographer = async () => {
      //Import API
      const api = new Api('/data/photographers.json')
      const allPhotographers = await api.getPhotographers()

      // Get params from URl
      const params = new URL(document.location).searchParams
      const paramsId = parseInt(params.get('photographer'))

      //Filter data to get active photographer
      const activePhotographer = allPhotographers.filter(ph => ph.id === paramsId)[0]
      return new PhotographerConstructor(activePhotographer)
   }

   const getHeader = async (data, index) => {
      const header = new PhotographerFactory(
         data,
         index,
         'header',
      )
      return await header.createHeader()
   }
   const getMedia = async () => {
      //Import API
      const api = new Api('/data/photographers.json')
      return await api.getMedia()
   }

   const watchModal = () => {
      const $modal = document.getElementById('contact_modal')

      // Modal Observer
      const Open = new OpenButtonObserver()
      const Close = new CloseButtonObserver()
      const WatcherModal = new ModalSubject()

      WatcherModal.subscribe(Open)
      WatcherModal.subscribe(Close)
      WatcherModal.fire($modal)
   }


   const displayData = async (photographer, medias, index) => {
      const $photographersCardWrapper = document.querySelector('.media_section')
      // Index for screen reader


      const { name, id } = photographer
      medias
         .filter(media => media.photographerId === id)
         .map(data => {
            const mediaData = new MediaConstructor(data)
            const mediaWithName = MediaWithName(mediaData, name)
            return new PhotographerFactory(mediaWithName, index, 'media')
         })
         .forEach(template => {
            const card = template.createMediaCard()

            $photographersCardWrapper.appendChild(card)
            index += 2
         })

   }

   const init = async () => {
      let startingTabIndex = 4
      const photographer = await getPhotographer()
      const medias = await getMedia()

      watchModal()
      await getHeader(photographer, startingTabIndex)
      return await displayData(photographer, medias, startingTabIndex)
   }

   init()
