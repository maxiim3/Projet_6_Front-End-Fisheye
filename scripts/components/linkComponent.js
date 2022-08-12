class LinkComponent {
   idKey
   idValue
   desc
   tabIndex
   /**
    * @type {HTMLAnchorElement}
    */
   $a

   constructor(idKey, idValue, desc, tabIndex) {
      this.idKey = idKey
      this.idValue = idValue
      this.desc = desc
      this.tabIndex = tabIndex

      this.$a = document.createElement('a')
   }
   setHTMLAttributes() {
         this.$a.classList.value = 'flex flex__col justifyCenter alignCenter '
         this.$a.href = `photographer.html?${this.idKey}=${this.idValue}`
         this.$a.ariaRoleDescription = this.desc
         this.$a.ariaLabel = `Cliquez pour${this.desc}`
         this.$a.tabIndex = this.tabIndex
   }
   createComponent() {
      this.setHTMLAttributes()
      return this.$a
   }
}