class LinkComponent {
   desc
   tabIndex
   photographerIdKey
   photographerIdValue
   mediaIdKey
   mediaIdValue
   $a

   constructor(desc, tabIndex, params) {
      this.photographerIdKey = params.photographer.id
      this.photographerIdValue = params.photographer.value
      this.mediaIdKey = params?.media?.id
      this.mediaIdValue = params?.media?.value
      this.desc = desc
      this.tabIndex = tabIndex
      this.$a = document.createElement('a')
   }

   setHTMLAttributes() {
      const paramsPhotographer = `${this.photographerIdKey}=${this.photographerIdValue}`
      const paramsMedia = this.mediaIdKey
         ? `&${this.mediaIdKey}=${this.mediaIdValue || 'all-medias'}`
         : ''
      this.$a.classList.value = 'photographer__link media__link'
      this.$a.href += `photographer.html?${paramsPhotographer}${paramsMedia}`
      this.$a.ariaRoleDescription = this.desc
      this.$a.ariaLabel = `Cliquez pour${this.desc}`
      this.$a.tabIndex = this.tabIndex
   }

   createComponent() {
      this.setHTMLAttributes()
      return this.$a
   }
}
