var emblaNode = document.querySelector('.embla')
var emblaOptions = { loop: true }
var emblaPlugins = [EmblaCarouselAutoplay()]
var embla = EmblaCarousel(emblaNode, emblaOptions, emblaPlugins)

var emblaNode2 = document.querySelector('.embla2') // Используем другую переменную для второй карусели
var emblaOptions2 = { loop: true }
var emblaPlugins2 = [EmblaCarouselAutoplay()]
var embla2 = EmblaCarousel(emblaNode2, emblaOptions2, emblaPlugins2)

console.log(embla.slideNodes()) // Доступ к API для первой карусели
console.log(embla2.slideNodes()) // Доступ к API для второй карусели
