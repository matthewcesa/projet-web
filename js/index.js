let currentSlideIndex = 0;
    
    function currentSlide(n) {
      const slides = document.querySelectorAll('.carousel-slide');
      const dots = document.querySelectorAll('.carousel-dot');
      
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[n].classList.add('active');
      dots[n].classList.add('active');
      currentSlideIndex = n;
    }
    
    // Auto-rotation du carrousel
    setInterval(() => {
      const slides = document.querySelectorAll('.carousel-slide');
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      currentSlide(currentSlideIndex);
    }, 1000);