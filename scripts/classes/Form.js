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
      $wrapper.ariaLabel = `Entrez votre ${label}`
      $wrapper.tabIndex = 0

      // set label
      if (type !== 'button') {
         const $label = document.createElement('label')
         $label.htmlFor = id
         $label.innerText = label
         $label.tabIndex = -1
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
            $input.tabIndex = 0
            // append input and label to wrapper
            $wrapper.appendChild($input)
            break

         case 'textarea':
            // set input attributes and valu
            const $textarea = document.createElement('textarea')
            $textarea.id = id
            $textarea.classList.value = `input input__${id}`
            $textarea.tabIndex = 0
            // append input and label to wrapper
            $wrapper.appendChild($textarea)
            break

         case 'email':
            // set input attributes and valu
            const $email = document.createElement('input')
            $email.id = id
            $email.type = type
            $email.classList.value = `input input__${id}`
            $email.tabIndex = 0
            $wrapper.appendChild($email)
            break

         case 'button':
            // set input attributes and valu
            const $btn = document.createElement('button')
            $btn.classList.value = 'contact_button'
            $btn.innerText = label
            $btn.id = 'sendForm'
            $btn.tabIndex = 0
            $wrapper.appendChild($btn)
            break
      }

      return $wrapper
   }
}

function createForm() {
   // form
   const inputs = [
      {
         label: 'Prénom',
         type: 'text',
      },
      {
         label: 'Nom',
         type: 'text',
      },
      {
         label: 'Email',
         type: 'email',
      },
      {
         label: 'Votre Message',
         type: 'textarea',
      },
      {
         label: 'Envoyer',
         type: 'button',
      },
   ]

   const form = new Form('form')
   inputs.forEach(({ label, type }) => {
      const newInput = form.createField(label, type)
      form.getForm().appendChild(newInput)
   })

   return form
}

function handleForm(form) {
   const submit = document.getElementById('sendForm')
   const $modal = document.querySelector('#contact_modal')
   $modal.tabIndex = 0

   submit.addEventListener('click', e => {
      const { value: prenom } = document.getElementById('prenom')
      const { value: nom } = document.getElementById('nom')
      const { value: mail } = document.getElementById('email')
      const { value: msg } = document.getElementById('votre-message')
      e.preventDefault()

      try {
         if (!prenom || !nom || !mail || !msg) throw new Error('Erreur de saisie')
         else {
            const outputs = [
               `Nom et prénom : %c${nom} ${prenom}`,
               `Email : %c${mail}`,
               `Message : %c${msg}`,
            ]
            outputs.forEach(out => console.log(out, 'color: green'))
            $modal.style.display = 'none'
         }
      } catch (e) {
         console.warn(e + '\nTous les champs doivent être renseignés')
      }
   })
}
