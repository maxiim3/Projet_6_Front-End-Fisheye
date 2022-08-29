class Modal {
   constructor() {
      this.$modal = document.querySelector('#contact_modal')
      this.$modal.tabIndex = -1
      this.$openBtn = document.querySelector('#showModal')
      this.$openBtn.tabIndex = "Ouvrir le formulaire"
      this.$openBtn.ariaLabel =
      this.$closeBtn = document.querySelector('#closeModal')
      this.$closeBtn.tabIndex = 0
      this.$closeBtn.ariaLabel = "Fermer la fenêtre du formulaire"

   }

   openModal(e) {
      e.preventDefault()
      this.showModal()
   }

   showModal() {
      // update dom
      this.$modal.style.display = 'flex'
      this.$modal.dataset.isOpen = 'true'

      // remove listeners
      this.$openBtn.removeEventListener('click', this.openModal)

      // add listeners
      this.$closeBtn.addEventListener('click', e => this.closeWithMouse(e))
      document.addEventListener('keydown', e => this.closeWithKeyboard(e))
   }

   hideModal() {
      // update dom
      this.$modal.style.display = 'none'
      this.$modal.dataset.isOpen = 'false'

      // remove listeners
      this.$closeBtn.removeEventListener('click', this.closeWithMouse)
      document.removeEventListener('keydown', this.closeWithKeyboard)

      // add listeners
      this.$openBtn.addEventListener('click', e => this.openModal(e))
   }

   closeWithKeyboard(e) {
      if (e?.key === 'Escape') {
         this.hideModal()
      }
   }

   closeWithMouse(e) {
      e.preventDefault()
      this.hideModal()
   }

   init() {
      if (!this.$modal.dataset?.isOpen)
         this.$openBtn.addEventListener('click', e => this.openModal(e))
   }
}
