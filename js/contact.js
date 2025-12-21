(function(){
      const form = document.getElementById('contactForm');
      const submitBtn = document.getElementById('submitBtn');
      const resetBtn = document.getElementById('resetBtn');
      const statusEl = document.getElementById('formStatus');

      const fields = {
        email: document.getElementById('email'),
        lastname: document.getElementById('lastname'),
        firstname: document.getElementById('firstname'),
        role: document.getElementById('role'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
      };

      const errs = {
        email: document.getElementById('err-email'),
        lastname: document.getElementById('err-lastname'),
        firstname: document.getElementById('err-firstname'),
        role: document.getElementById('err-role'),
        subject: document.getElementById('err-subject'),
        message: document.getElementById('err-message')
      };

      const charCount = document.getElementById('charCount');
      const MAX_CHARS = 2000;

      // Character counter
      fields.message.addEventListener('input', () => {
        const len = fields.message.value.length;
        charCount.textContent = `${len} / ${MAX_CHARS}`;
        if (len > MAX_CHARS) {
          errs.message.textContent = 'Le message est trop long.';
        } else {
          errs.message.textContent = '';
        }
      });

      // simple validators
      function validateEmail(v){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      }

      function clearErrors(){
        Object.values(errs).forEach(e => e.textContent = '');
        statusEl.textContent = '';
        statusEl.className = '';
      }

      function validate(){
        clearErrors();
        let ok = true;
        if (!fields.email.value.trim() || !validateEmail(fields.email.value.trim())){
          errs.email.textContent = 'Adresse e-mail invalide.';
          ok = false;
        }
        if (!fields.lastname.value.trim()){
          errs.lastname.textContent = 'Nom requis.';
          ok = false;
        }
        if (!fields.firstname.value.trim()){
          errs.firstname.textContent = 'Prénom requis.';
          ok = false;
        }
        if (!fields.role.value){
          errs.role.textContent = 'Sélectionnez votre profil.';
          ok = false;
        }
        if (!fields.subject.value.trim()){
          errs.subject.textContent = 'Sujet requis.';
          ok = false;
        }
        const msgLen = fields.message.value.trim().length;
        if (msgLen === 0){
          errs.message.textContent = 'Message requis.';
          ok = false;
        } else if (msgLen > MAX_CHARS){
          errs.message.textContent = 'Message trop long.';
          ok = false;
        }
        return ok;
      }

      form.addEventListener('submit', function(e){
        e.preventDefault();
        if (!validate()) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi…';
        statusEl.textContent = '';
        statusEl.className = '';

        const payload = {
          email: fields.email.value.trim(),
          lastname: fields.lastname.value.trim(),
          firstname: fields.firstname.value.trim(),
          birthdate: document.getElementById('birthdate').value || '',
          role: fields.role.value,
          subject: fields.subject.value.trim(),
          message: fields.message.value.trim()
        };

        new Promise((resolve) => setTimeout(() => resolve({ok:true}), 1100))
          .then(resp => {
            if (resp && resp.ok){
              statusEl.textContent = 'Votre message a bien été envoyé. Merci !';
              statusEl.className = 'success';
              form.reset();
              charCount.textContent = `0 / ${MAX_CHARS}`;
            } else {
              throw new Error('Erreur serveur');
            }
          })
          .catch(err => {
            statusEl.textContent = 'Erreur lors de l\'envoi, veuillez réessayer.';
            statusEl.className = 'error';
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
          });
      });

      resetBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
        charCount.textContent = `0 / ${MAX_CHARS}`;
      });

      Object.values(fields).forEach(f => {
        f.addEventListener('blur', () => {
          validate();
        });
      });
    })();