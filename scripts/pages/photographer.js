const fetchDataFromApi = async () => {
   const api = new Api('/data/photographers.json')
   return await api.fetch()
}

const getPhotographers = async () => {
   //Import API
   const allData = await fetchDataFromApi()
   return allData.photographers
}

const getMedia = async () => {
   //Import API
   const allData = await fetchDataFromApi()
   return allData.media
}
// const getActiveLightboxMedia = async () => {
//    // Get params from URl
//    const params = new URL(document.location).searchParams
//    const paramsId = parseInt(params.get('media'))
//    console.log(paramsId)
// }
const getActivePhotographer = async () => {
   // Get params from URl
   const params = new URL(document.location).searchParams
   const paramsId = parseInt(params.get('photographer'))

   //Filter data to get active photographer
   const allPhotographers = await getPhotographers()
   const activePhotographer = allPhotographers.filter(ph => ph.id === paramsId)[0]
   return new PhotographerConstructor(activePhotographer)
}
const getHeader = async (data, index) => {
   const header = new PhotographerFactory(data, index, 'header')
   return await header.createHeader()
}

const createForm = () => {
   // form
   const inputs = [
      {
         label: 'Prénom',
         type: 'text',
      },
      {
         label: 'Nom',
         type: 'text',
      },
      {
         label: 'Email',
         type: 'email',
      },
      {
         label: 'Votre Message',
         type: 'textarea',
      },
      {
         label: 'Envoyer',
         type: 'button',
      },
   ]
   const form = new Form('form')
   inputs.forEach(({ label, type }) => {
      const newInput = form.createField(label, type)
      form.getForm().appendChild(newInput)
   })
   return form
}
// todo Implementer Focus screereader sur Close nodal btn
const handleForm = form => {
   const submit = document.getElementById('sendForm')
   const $modal = document.querySelector('dialog')

   submit.addEventListener('click', e => {
      const { value: prenom } = document.getElementById('prenom')
      const { value: nom } = document.getElementById('nom')
      const { value: mail } = document.getElementById('email')
      const { value: msg } = document.getElementById('votre-message')
      e.preventDefault()

      try {
         if (!prenom || !nom || !mail || !msg) throw new Error('Erreur de saisie')
         else {
            const outputs = [
               `Nom et prénom : %c${nom} ${prenom}`,
               `Email : %c${mail}`,
               `Message : %c${msg}`,
            ]
            outputs.forEach(out => console.log(out, 'color: green'))
            $modal.close()
         }
      } catch (e) {
         console.warn(e + '\nTous les champs doivent être renseignés')
      }
   })
}

const watchModal = () => {
   //Modal DOM Element
   const $modal = document.querySelector('#contact_modal')
   const $openBtn = document.querySelector('#showModal')
   const $closeBtn = document.querySelector('#closeModal')

   // Modal Observer
   const Open = new OpenButtonObserver($openBtn)
   const Close = new CloseButtonObserver($closeBtn)
   const WatcherModal = new ModalSubject($modal)

   WatcherModal.subscribe(Open)
   WatcherModal.subscribe(Close)
   WatcherModal.fire()
}

const displayData = async (medias, index) => {
   const $photographersCardWrapper = document.getElementById('cardWrapper')

   medias.forEach(media => {
      const template = new PhotographerFactory(media, index, 'media')
      const card = template.createMediaCard()

      $photographersCardWrapper.appendChild(card)
      index += 2
   })
}

const lightbox = () => {}

const aside = photographer => {
   const $aside = document.createElement('aside')
   const $likes = document.createElement('span')
   const $price = document.createElement('span')

   // like Icon
   const $likesIcon = document.createElement('img')
   $likesIcon.src = 'assets/icons/heart-solid.svg'
   $likesIcon.alt = 'Cliquez pour ajouter à vos favoris'
   $likesIcon.classList.value = 'likeIcon'

   $likes.innerText = `3000`
   $likes.appendChild($likesIcon)
   $likes.ariaLabel = 'Nombre de likes'

   $price.innerText = photographer.price
   $price.ariaLabel = 'Tarifs journaliers'

   $aside.ariaLabel = 'Informations sur le photographe'
   $aside.classList.value = 'photographer__aside'

   $aside.appendChild($likes)
   $aside.appendChild($price)

   return $aside
}

const init = async () => {
   const main = document.querySelector('#main')
   // start index for screen readers
   let startingTabIndex = 4

   // get data
   const photographer = await getActivePhotographer()
   const media = await getMedia()

   const filterMedia = media
      .filter(media => media.photographerId === photographer.id)
      .map(media => {
         const mediaData = new MediaConstructor(media)
         return MediaWithPhotographer(mediaData, photographer)
      })

   // watch modal
   const mediaLink = document.querySelectorAll('.mediaLink')
   mediaLink.forEach(link => {
      link.addEventListener('click', e => {
         e.preventDefault()
         getActiveLightboxMedia()
         console.log(link)
      })
   })

   //form
   const $form = createForm()
   handleForm($form)

   // lightbox
   const $media = document.querySelectorAll('.mediaLink')
   const lightbox = document.querySelector('#lightbox')
   const previous = document.createElement('i')
   const next = document.createElement('i')
   previous.classList.value = 'fa-solid fa-angle-left'
   next.classList.value = 'fa-solid fa-angle-right'

   const img = document.createElement('img')
   const video = document.createElement('video')

   //Aside
   main.appendChild(aside(photographer))

   //render header
   await getHeader(photographer, startingTabIndex)

   // render data media
   await displayData(filterMedia, startingTabIndex)
}

init()
