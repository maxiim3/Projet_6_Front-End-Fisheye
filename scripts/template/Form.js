class Form {
   constructor(formId) {
      this.form = document.getElementById(`${formId}`)
   }

   getForm() {
      return this.form
   }

   createField(label, type) {
      // format text
      const id = formatText(label)

      // set wrapper [label, input]
      const $wrapper = document.createElement('section')
      $wrapper.classList.value = `inputsWrapper inputWrapper__${id}`

      // set label
      if (type !== "button") {
         const $label = document.createElement('label')
         $label.htmlFor = id
         $label.innerText = label
         $wrapper.appendChild($label)
      }

      switch (type) {
         case 'text':
            // set input attributes and valu
            const $input = document.createElement('input')
            $input.type = type
            $input.id = id
            $input.name = id
            $input.classList.value = `input input__${id}`
            // append input and label to wrapper
            $wrapper.appendChild($input)
            break

         case 'textarea':
            // set input attributes and valu
            const $textarea = document.createElement('textarea')
            $textarea.id = id
            $textarea.classList.value = `input input__${id}`
            // append input and label to wrapper
            $wrapper.appendChild($textarea)
            break

         case 'email':
            // set input attributes and valu
            const $email = document.createElement('input')
            $email.id = id
            $email.type = type
            $email.classList.value = `input input__${id}`
            $wrapper.appendChild($email)
            break

         case 'button':
            // set input attributes and valu
            const $btn = document.createElement('button')
            $btn.classList.value = 'contact_button'
            $btn.innerText = label
            $btn.id = 'sendForm'
            $wrapper.appendChild($btn)
            break
      }

      return $wrapper
   }
}
