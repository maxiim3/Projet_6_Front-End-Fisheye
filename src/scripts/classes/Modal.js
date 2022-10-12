class Modal {
   constructor() {
      this.$modal = document.querySelector('#contact_modal')
      this.$innerModal = document.querySelector('#contact_modal .modal__inner')
      this.$modal.tabIndex = -1
      this.$openBtn = document.querySelector('#showModal')
      this.$openBtn.ariaLabel = 'Ouvrir le formulaire'
      this.$closeBtn = document.querySelector('#closeModal')
      this.$closeBtn.ariaLabel = 'Fermer la fenêtre du formulaire'
   }

   openModal(e) {
      e.preventDefault()
      this.showModal()
   }

   showModal() {
      // update dom
      this.$modal.style.display = 'flex'
      this.$modal.dataset.isOpen = 'true'
      document.querySelector('.modal__inner').focus({ focusVisible: true })
      // remove listeners
      this.$openBtn.removeEventListener('click', this.openModal)

      // add listeners
      this.$closeBtn.addEventListener('click', e => this.closeWithMouse(e))
      document.addEventListener('keydown', e => this.closeWithKeyboard(e))
   }

   closeWithMouse(e) {
      e.preventDefault()
      this.hideModal()
   }

   closeWithKeyboard(e) {
      if (e?.key === 'Escape') {
         this.hideModal()
      }
   }

   hideModal() {
      this.$innerModal.classList.add('animate__fade-out')
      this.$innerModal.classList.add('animate__shrink')
      this.$modal.classList.add('animate__fade-out')
      const timeOutBeforeClosing = setTimeout(() => {
         // update dom
         this.$modal.style.display = 'none'
         this.$modal.dataset.isOpen = 'false'

         // remove listeners
         this.$closeBtn.removeEventListener('click', this.closeWithMouse)
         document.removeEventListener('keydown', this.closeWithKeyboard)

         // add listeners
         this.$openBtn.addEventListener('click', e => this.openModal(e))
         this.$innerModal.classList.remove('animate__fade-out')
         this.$innerModal.classList.remove('animate__shrink')
         this.$modal.classList.remove('animate__fade-out')
         clearTimeout(timeOutBeforeClosing)
      }, 450)
   }

   init() {
      if (!this.$modal.dataset?.isOpen)
         this.$openBtn.addEventListener('click', e => this.openModal(e))
   }
}
