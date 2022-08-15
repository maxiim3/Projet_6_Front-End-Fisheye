class ModalSubject {
   constructor($dom) {
      this.$dom = $dom
      this._observers = []
   }

   subscribe(obs) {
      this._observers.push(obs)
   }

   unsubscribe(obs) {
      this._observers = this._observers.filter(observer => observer !== obs)
   }

   fire() {
      this._observers.forEach(obs => {
         obs.btn.addEventListener('click', e => {
            e.preventDefault()
            obs.updateDom(this.$dom)
         })
      })
   }
}