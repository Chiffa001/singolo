const nav = document.querySelector(".main-navigation__list");
const navigationItems = nav.querySelectorAll(".main-navigation__item");
const header = document.querySelector(".main-header");

nav.addEventListener("click", scrollPage);
document.addEventListener("scroll", pageScrollingIdentification);

function disableNavigationItems() {
  navigationItems.forEach(el =>
    el.classList.remove("main-navigation__item--active")
  );
}

function changeActiveItemToHeader(el) {
  if (Array.prototype.includes.call(navigationItems, el)) {
    disableNavigationItems();
    el.classList.add("main-navigation__item--active");
  }
}

function scrollPage(e) {
  e.preventDefault();
  const current = e.target;
  if (current.href) {
    const el = document.querySelector(
      current.href.slice(current.href.indexOf("#"))
    );
    window.scrollTo({
      top: el.offsetTop - header.scrollHeight
    });
    changeActiveItemToHeader(current.parentNode);
  }
}

function getSizeBlocks(nameClass) {
  const sections = document.querySelectorAll(".block");
  if (sections.length === 0) throw new Error(`element ${nameClass} not found`);
  const sizeBlocks = [];
  for (const iterator of sections) {
    sizeBlocks.push(iterator.scrollHeight);
  }
  return sizeBlocks;
}

function pageScrollingIdentification() {
  let currentScrollValue = window.pageYOffset;
  disableNavigationItems();

  let sizeBlocks = [];
  try {
    sizeBlocks = getSizeBlocks(".block");
  } catch (e) {
    console.error(e.message);
  }

  let currentSizeScrollingBlocks = 0;
  for (let index = 0; index < sizeBlocks.length; index++) {
    currentSizeScrollingBlocks += sizeBlocks[index];
    if (
      currentScrollValue + window.screen.availHeight / 2 - header.scrollHeight <
      currentSizeScrollingBlocks
    ) {
      navigationItems[index].classList.add("main-navigation__item--active");
      break;
    }
  }
}

// phone click

const screensPhones = document.querySelectorAll(".slide-1 .slider__background");
screensPhones.forEach(screen => screen.addEventListener("click", toggleScreen));

function toggleScreen(e) {
  const current = e.target;
  current.classList.toggle("slider__background--hidden");
}
