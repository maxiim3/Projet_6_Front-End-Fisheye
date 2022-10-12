class Portrait {
   $portrait
   portrait
   name

   constructor(data) {
      this.name = data.name
      this.portrait = data.portrait
      this.$portrait = document.createElement('img')
   }

   setHTMLAttributes() {
      this.$portrait.classList.value = 'portrait'
      this.$portrait.src = this.portrait
      this.$portrait.alt = `Portrait de ${this.name}`
   }

   createComponent() {
      this.setHTMLAttributes()
      return this.$portrait
   }
}