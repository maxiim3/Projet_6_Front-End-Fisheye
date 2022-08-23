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

   /*   // Trier Par :
      // Popularity (likes) || Date || Titre
      async sortBy(data, type, sort) {
         await sortBy(data, type, sort)
      }*/

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

   renderFilter() {
      const date = document.createElement('p')
      date.ariaLabel = 'trier les éléments'
      date.classList.value = 'sort__options--date'
      date.textContent = 'Date'
      date.tabIndex = 0

      const popularity = document.createElement('p')
      popularity.ariaLabel = 'trier les éléments'
      popularity.classList.value = 'sort__options--popularity'
      popularity.textContent = 'Popularité'
      popularity.tabIndex = 0

      const title = document.createElement('p')
      title.ariaLabel = 'trier les éléments'
      title.classList.value = 'sort__options--title'
      title.textContent = 'Titre'
      title.tabIndex = 0

      const icon = document.createElement('i')
      icon.ariaLabel = 'trier les éléments'
      icon.classList.value = 'sort__options--icon fa-solid fa-angle-down'

      const options = document.createElement('div')
      options.ariaLabel = 'trier les éléments'
      options.classList.value = 'sort__options'
      options.dataset.dropped = 'false'
      options.appendChild(icon)
      options.appendChild(title)
      options.appendChild(popularity)
      options.appendChild(date)

      const label = document.createElement('label')
      label.ariaHidden = 'true'
      label.classList.value = 'sort__label'
      label.textContent = 'Trier par'

      const wrapper = document.querySelector('.sort__wrapper')
      wrapper.ariaLabel = 'trier les éléments'
      wrapper.appendChild(label)
      wrapper.appendChild(options)
   }

   async handleSort() {
      const options = document.querySelector('.sort__options')
      const buttons = [...options.querySelectorAll('p')]

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
      }, 450)
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
/*
const wrapper = document.createElement('section')
wrapper.id = 'wrapper'
const first = document.createElement('div')
first.id = 'first'
const second = document.createElement('div')
second.id = 'second'
const third = document.createElement('div')
third.id = 'third'

first.style.cssText = "width:  250px; height: 100px; background-color: blue"
second.style.cssText = "width: 250px; height: 250px; background-color: orange; border-radius: 100%"
third.style.cssText = "width:  250px; height: 250px; background-color: lime; rotate: 45deg"

document.getElementById('main').appendChild(wrapper)
$wrapper = document.getElementById('wrapper')
$wrapper.appendChild(first)
$wrapper.appendChild(second)
$wrapper.appendChild(third)
const $first = document.getElementById('first')
const $second = document.getElementById('second')
const $third = document.getElementById('third')

debugger*/
