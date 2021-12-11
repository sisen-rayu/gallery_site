const $toggle = document.querySelector('.navigation__button');
const $navi = document.querySelector('.navigation__list')
$toggle.addEventListener('click', () => {
  console.log('hi');
  $navi.classList.toggle('js-shown');
});