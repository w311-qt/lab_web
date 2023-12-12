var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
  nextEl: ".swiper-button-next", //Элемент для переключения на следующий слайд
  prevEl: ".swiper-button-prev", //Элемент для переключения на предыдущий слайд
  },
  pagination: {
  el: ".swiper-pagination", //Элемент для отображения пагинации (точек)
  },
  mousewheel: true, //Включение поддержки прокрутки мышью
  keyboard: true, //Включение поддержки управления клавиатурой
  loop: true,
  });
