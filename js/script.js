

// Mini hero carousel auto-rotation
    (function(){
      const slides = document.querySelectorAll('.hero-slide');
      if(!slides || slides.length === 0) return;
      let idx = 0;
      function show(n){
        slides.forEach(s=>s.classList.remove('active'));
        slides[n].classList.add('active');
      }
      // start
      show(idx);
      setInterval(()=>{
        idx = (idx + 1) % slides.length;
        show(idx);
      }, 4000);
    })();
