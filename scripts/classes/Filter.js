class Filter {
   constructor() {
      this.$mediasContainer = document.getElementById('cardWrapper')
   }

   async renderFilter() {
      const triggerBtn = document.createElement('button')
      triggerBtn.ariaLabel = 'sélectionner pour trier les éléments'
      triggerBtn.classList.value = 'sort__trigger'

      const filterWrapper = document.createElement('div')
      filterWrapper.classList.value = 'sort__container'
      filterWrapper.dataset.dropped = 'false'

      const date = document.createElement('button')
      date.ariaLabel = 'trier les éléments par date'
      date.classList.value = 'sort__filters sort__filters--date'
      date.textContent = 'Date'
      date.tabIndex = filterWrapper.dataset.dropped === 'true' ? 0 : -1
      date.ariaHidden = filterWrapper.dataset.dropped === 'true' ? 'false' : 'true'

      const popularity = document.createElement('button')
      popularity.ariaLabel = 'trier les éléments par popularité'
      popularity.classList.value = 'sort__filters sort__filters--popularity'
      popularity.textContent = 'Popularité'
      popularity.tabIndex = filterWrapper.dataset.dropped === 'true' ? 0 : -1
      popularity.ariaHidden = filterWrapper.dataset.dropped === 'true' ? 'false' : 'true'

      const title = document.createElement('button')
      title.ariaLabel = 'trier les éléments par tite'
      title.classList.value = 'sort__filters sort__filters--title'
      title.textContent = 'Titre'
      title.tabIndex = filterWrapper.dataset.dropped === 'true' ? 0 : -1
      title.ariaHidden = filterWrapper.dataset.dropped === 'true' ? 'false' : 'true'

      const icon = document.createElement('span')
      icon.classList.value = 'sort__icon fa-solid fa-angle-down'
      icon.ariaHidden = 'true'

      const label = document.createElement('label')
      label.ariaHidden = 'true'
      label.classList.value = 'sort__label'
      label.textContent = 'Trier les éléments'
      label.tabIndex = 0

      filterWrapper.appendChild(icon)
      filterWrapper.appendChild(title)
      filterWrapper.appendChild(popularity)
      filterWrapper.appendChild(date)

      const wrapper = document.querySelector('.sort__wrapper')
      wrapper.appendChild(label)
      wrapper.appendChild(triggerBtn)
      wrapper.appendChild(filterWrapper)
      wrapper.tabIndex = -1
   }

   openDropDownMenu(ev, $dropDownBtn) {
      const $container = document.querySelector('.sort__container')
      const $filtersBtn = [...$container.querySelectorAll('button')]
      $dropDownBtn.style.visibility = 'hidden'
      $container.dataset.dropped = 'true'
      $container.ariaExpanded = 'true'
      $filtersBtn.forEach(
         btn => (btn.dataset.hidden = 'false') && (btn.ariaHidden = 'false') && (btn.tabIndex = 0)
      )

      $filtersBtn.forEach(filter => {
         filter.addEventListener('click', async ev =>
            this.handleSort(ev, $dropDownBtn, $container, $filtersBtn, filter)
         )
      })
   }

   closeDropDownMenu($dropDownBtn, $container, $filtersBtn) {
      $dropDownBtn.addEventListener('click', e => this.openDropDownMenu(e, $dropDownBtn))

      $dropDownBtn.style.visibility = 'visible'
      $container.dataset.dropped = 'false'
      $container.ariaExpanded = 'false'
   }

   async handleSort(ev, $dropDownBtn, $container, $filtersBtn, filterBtn) {
      ev.preventDefault()

      if ($container.dataset.dropped === 'false') return

      document.removeEventListener('click', this.openDropDownMenu)
      console.log(filterBtn.textContent)

      // set clicked filter
      $filtersBtn.forEach(btn => {
         btn.dataset.selected = 'false'
         btn.ariaHidden = 'false'
         btn.style.opacity = '1'
         btn.tabIndex = -1
         btn.removeEventListener('click', this.handleSort)
      })

      filterBtn.dataset.selected = 'true'

      const filterIndex = $filtersBtn.indexOf(filterBtn)
      // ⚠️ Added +1 to index because first is icon with absolute position
      const filterNodeIndex = $filtersBtn.indexOf(filterBtn) + 1
      this.closeDropDownMenu($dropDownBtn, $container, $filtersBtn)

      if (filterNodeIndex > 1) {
         // reorder buttons array
         const target = $filtersBtn[filterIndex]
         $filtersBtn.splice(filterIndex, 1)
         $filtersBtn.unshift(target)
         // ℹ️ change order => place clicked on first position
         $container.insertBefore($container.childNodes[filterNodeIndex], $container.childNodes[1])
      }
      sortBy(filterBtn.textContent, this.$mediasContainer)
   }

   async init() {
      await this.renderFilter()
      const $dropDownBtn = document.querySelector('.sort__trigger')
      $dropDownBtn.addEventListener('click', e => this.openDropDownMenu(e, $dropDownBtn))
   }
}
