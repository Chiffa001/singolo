const nav = document.querySelector(".main-navigation__list");
const navigationItems = nav.querySelectorAll(".main-navigation__item");
nav.addEventListener("click", scrollPage);
document.addEventListener("scroll", pageScrollingIdentification);

function disableNavigationItems() {
  navigationItems.forEach(el =>
    el.classList.remove("main-navigation__item--active")
  );
}

function changeActiveItemToHeader(el) {
  const parentEl = el.parentNode;
  if (Array.prototype.includes.call(navigationItems, parentEl)) {
    disableNavigationItems();
    parentEl.classList.add("main-navigation__item--active");
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
      top: el.offsetTop - 95
    });
    changeActiveItemToHeader(current);
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
      currentScrollValue + window.screen.availHeight / 2 - 95 <
      currentSizeScrollingBlocks
    ) {
      navigationItems[index].classList.add("main-navigation__item--active");
      break;
    }
  }
}
