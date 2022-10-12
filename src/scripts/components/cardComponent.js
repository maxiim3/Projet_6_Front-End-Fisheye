class CardComponent {
   data
   description
   /**
    *
    * @type {HTMLLIElement}
    */
   $li
   constructor(data, description) {
      this.data = data
      this.description = description
      this.$li = document.createElement('li')
   }
   setHTMLAttributes() {
      this.$li.classList.value = 'cardLayout'
      this.$li.ariaRoleDescription = this.description
      this.$li.ariaLabel = `${this.description} : ${this.data}`
   }
   createComponent() {
      this.setHTMLAttributes()
      return this.$li
   }
}