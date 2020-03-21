const nav = document.querySelector(".main-navigation__list");
nav.addEventListener('click', changeActiveItemToHeader);
document.addEventListener('scroll', scrollPage);

function changeActiveItemToHeader(e) {
  const arrItem = nav.querySelectorAll(".main-navigation__item");
  arrItem.forEach(el => el.classList.remove("main-navigation__item--active"));
  const parentEl = e.target.parentNode;
  if(Array.prototype.includes.call(arrItem, parentEl))
    parentEl.classList.add("main-navigation__item--active");
}

function scrollPage(e) {
  let currentScrollValue = window.pageYOffset;
  const sections = document.querySelectorAll(".block");
  
  console.log(sections);
}
