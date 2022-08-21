class MediaConstructor {
   _data

   constructor(data) {
      this._data = data
   }

   get id() {
      return this._data['id']
   }

   get photographerId() {
      return this._data['photographerId']
   }

   get title() {
      return this._data['title']
   }

   get mediaLink() {
      const {image, video} = this._data

      return `assets/images/photographers/${this.photographerId}/${image || video}`
   }

   get mediaType() {
      const {image, video} = this._data

      return (image && "image") || (video && 'video') || undefined
   }

   get likes() {
      return this._data['likes']
   }

   get date() {
      return this._data['date']
   }

   get price() {
      return this._data['price']
   }
}

/**
 * @param {MediaConstructor} Media
 * @param photographer
 */
function MediaWithPhotographer(Media, photographer){
   Media['photographer'] = photographer;
   return Media
}/**
 * @param {MediaConstructor} Media
 * @param {LikeCounter} LikeCounter
 */
function MediaWithLikeCounter(Media, LikeCounter){
   Media['LikeCounter'] = LikeCounter;

   return Media
}