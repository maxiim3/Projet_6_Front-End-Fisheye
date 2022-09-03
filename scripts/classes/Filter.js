class Filter {
   constructor() {
      this.$mediasContainer = document.getElementById('cardWrapper')
   }

   async renderFilter() {
      const options = document.createElement('div')
      options.ariaLabel = 'sélectionner pour trier les éléments'
      options.classList.value = 'sort__options'
      options.dataset.dropped = 'false'
      options.tabIndex = 0

      const date = document.createElement('p')
      date.ariaLabel = 'trier les éléments par date'
      date.classList.value = 'sort__options--date'
      date.textContent = 'Date'
      date.tabIndex = options.dataset.dropped === 'true' ? 0 : -1
      date.ariaHidden = options.dataset.dropped === 'true' ? 'false' : 'true'

      const popularity = document.createElement('p')
      popularity.ariaLabel = 'trier les éléments par popularité'
      popularity.classList.value = 'sort__options--popularity'
      popularity.textContent = 'Popularité'
      popularity.tabIndex = options.dataset.dropped === 'true' ? 0 : -1
      popularity.ariaHidden = options.dataset.dropped === 'true' ? 'false' : 'true'

      const title = document.createElement('p')
      title.ariaLabel = 'trier les éléments par tite'
      title.classList.value = 'sort__options--title'
      title.textContent = 'Titre'
      title.tabIndex = options.dataset.dropped === 'true' ? 0 : -1
      title.ariaHidden = options.dataset.dropped === 'true' ? 'false' : 'true'

      const icon = document.createElement('span')
      icon.classList.value = 'sort__options--icon fa-solid fa-angle-down'
      icon.ariaHidden = 'true'

      const label = document.createElement('label')
      label.ariaHidden = 'true'
      label.classList.value = 'sort__label'
      label.textContent = 'Trier les éléments'
      label.tabIndex = 0

      options.appendChild(icon)
      options.appendChild(title)
      options.appendChild(popularity)
      options.appendChild(date)

      const wrapper = document.querySelector('.sort__wrapper')
      wrapper.appendChild(label)
      wrapper.appendChild(options)
      wrapper.tabIndex = -1
   }

   async handleSort(ev, obj) {
      ev.preventDefault()
      const { options, buttons, btn } = obj

      switch (options.dataset.dropped) {
         case 'true':
            btn.dataset.selected = 'true'
            btn.ariaHidden = 'false'

            options.dataset.dropped = 'false'
            options.ariaExpanded = false

            buttons
               .filter(others => others !== btn)
               .forEach(
                  other =>
                     (other.dataset.hidden = 'true') &&
                     (other.ariaHidden = 'true') &&
                     (other.dataset.selected = 'false')
               )

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
            options.ariaExpanded = true
            buttons.forEach(btn => (btn.dataset.hidden = 'false') && (btn.ariaHidden = 'false'))
            break

         default:
            throw 'Something went wrong..'
      }
   }

   async init() {
      await this.renderFilter()
      const options = document.querySelector('.sort__options')
      const buttons = [
         ...options.querySelectorAll('p'),
         document.querySelector('.sort__options--icon'),
      ]

      buttons.forEach(btn => {
         btn.addEventListener('click', async ev => this.handleSort(ev, { options, buttons, btn }))
      })
      /*options.addEventListener('focus', ev => {
         document.addEventListener('keypress', ev => {
            if (ev.key === 'Enter' || ev.key === ' ') {
               ev.preventDefault()
               console.log(ev.key)
               const activeBtn = options.querySelector("p.dataset.selected")
               this.handleSort(ev, { options, buttons, activeBtn })
               // todo focus on element
            }
         })
      })*/
   }
}
