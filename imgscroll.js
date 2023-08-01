document.addEventListener("DOMContentLoaded", function() {
    const sliderContainer = document.querySelector(".slider-container");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let scrollAmount = 0;
    const step = 250; // Adjust this value to change the distance each arrow click scrolls

    prevBtn.addEventListener("click", () => {
      scrollAmount = Math.max(scrollAmount - step, 0);
      sliderContainer.style.transform = `translateX(-${scrollAmount}px)`;
      updateText();
    });

    nextBtn.addEventListener("click", () => {
      const maxScrollAmount = sliderContainer.scrollWidth - sliderContainer.clientWidth;
      scrollAmount = Math.min(scrollAmount + step, maxScrollAmount);
      sliderContainer.style.transform = `translateX(-${scrollAmount}px)`;
      updateText();
    });

    function updateText() {
      const containerWidth = sliderContainer.clientWidth;
      const currentImageIndex = Math.floor(scrollAmount / containerWidth);
    }
  });