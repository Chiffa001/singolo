const nav = document.querySelector(".main-navigation__list");
const navigationItems = nav.querySelectorAll(".main-navigation__item");
const header = document.querySelector(".main-header");

nav.addEventListener("click", scrollPage);
document.addEventListener("scroll", pageScrollingIdentification);

function disableListItems(listItems, className) {
  listItems.forEach(el => el.classList.remove(`${className}--active`));
}

function changeActiveItemToList(el, listItems, className) {
  if (Array.prototype.includes.call(listItems, el)) {
    disableListItems(listItems, className);
    el.classList.add(`${className}--active`);
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
      top: el.offsetTop - header.scrollHeight - 6
    });
    changeActiveItemToList(
      current.parentNode,
      navigationItems,
      "main-navigation__item"
    );
  }
}

function getSizeBlocks(nameClass) {
  const sections = document.querySelectorAll(".block");
  if (sections.length === 0) throw new Error(`element ${nameClass} not found`);
  const sizeBlocks = [];
  for (const iterator of sections) {
    sizeBlocks.push(iterator.offsetHeight);
  }
  return sizeBlocks;
}

function pageScrollingIdentification() {
  let currentScrollValue = window.pageYOffset;
  disableListItems(navigationItems, "main-navigation__item");

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

// portfolio tabs

const portfolioFilter = document.querySelector(".portfolio__filter");
const portfolioButtons = document.querySelectorAll(".filter__btn");

portfolioFilter.addEventListener("click", portfolioItemsSort);

function portfolioItemsSort(e) {
  const current = e.target;
  if (current.type === "button") {
    if (current === document.querySelector(".filter__btn--active")) return;
    const wrapperImages = document.querySelector(".portfolio__images");
    const arrImages = document.querySelectorAll(".portfolio__image");

    changeActiveItemToList(current, portfolioButtons, "filter__btn");
    wrapperImages.append(...sortImages(arrImages));
  }
}

function sortImages(images) {
  return shuffle(Array.from(images));
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// interaction with portfolio images

const wrapperImages = document.querySelector(".portfolio__images");
wrapperImages.addEventListener("click", interactionWithImages);

function interactionWithImages(e) {
  const current = e.target;
  if (current.nodeName === "IMG") {
    const images = document.querySelectorAll(".portfolio__image");
    if (!current.classList.contains("portfolio__image--active"))
      changeActiveItemToList(current, images, "portfolio__image");
    else current.classList.toggle("portfolio__image--active");
  }
}

// modal
const modal = document.querySelector(".modal");
const modalWindow = document.querySelector(".modal__window");
setLocationOfItemOnCenterWindow(modalWindow);
window.addEventListener("resize", resizeWindow);

function resizeWindow() {
  setLocationOfItemOnCenterWindow(modalWindow);
}

function setLocationOfItemOnCenterWindow(el) {
  el.style.top = (window.innerHeight - el.clientHeight) / 2 + "px";
  el.style.left = (window.innerWidth - el.clientWidth) / 2 + "px";
}

const feedbackBtn = document.querySelector(".feedback__btn");
feedbackBtn.addEventListener("click", submitForm);

function getModalMessageObject() {
  return {
    subject: document.querySelector(".feedback__subject").value,
    description: document.querySelector(".feedback__description").value
  };
}

function setModalFields() {
  const modalTextTheme = document.querySelector(".modal__theme");
  const modalTextDescription = document.querySelector(".modal__description");
  const { subject, description } = getModalMessageObject();

  // console.log(subject, description)
  modalTextTheme.innerHTML =
    subject.trim() === "" ? "No subject" : `Subject: ${subject.trim()}`;
  modalTextDescription.innerHTML =
    description.trim() === ""
      ? "No description"
      : `Description: ${description.trim()}`;
}

function submitForm(e) {
  const name = document.querySelector(".feedback__name");
  const email = document.querySelector(".feedback__email");
  if (!name.validity.valid) return;
  if (!email.validity.valid) return;
  e.preventDefault();

  modal.classList.remove("visually-hidden");

  setModalFields();

  function closeModal() {
    modal.classList.add("visually-hidden");
    document.querySelector(".feedback__form").reset();
    modalBtn.removeEventListener("click", closeModal);
  }

  const modalBtn = document.querySelector(".modal__btn");
  modalBtn.addEventListener("click", closeModal);
}

// slider

const sliderBlock = document.querySelector(".slider");
const arrowsSlider = document.querySelectorAll(".arrow-btn");

function setLocationOfItemOnCenterBlock(block, item) {
  item.style.top = `${(block.offsetHeight - item.offsetHeight) / 2}px`;
}

function drawArrowFromSlider() {
  const wrapperInActiveSlide = document.querySelector(
    ".slide--active .wrapper"
  );
  setLocationOfItemOnCenterBlock(sliderBlock, arrowsSlider[0]);
  setLocationOfItemOnCenterBlock(sliderBlock, arrowsSlider[1]);
  arrowsSlider[0].style.left = `${(sliderBlock.offsetWidth -
    (wrapperInActiveSlide.offsetWidth - 8)) /
    2}px`;
  arrowsSlider[1].style.left = `${sliderBlock.offsetWidth / 2 -
    arrowsSlider[1].offsetWidth +
    wrapperInActiveSlide.offsetWidth / 2}px`;
}

drawArrowFromSlider();
window.addEventListener("resize", drawArrowFromSlider);

function mutualReplacementOfSlides(activeEl, inactiveEl) {
  inactiveEl.style.left = "0px";
  inactiveEl.classList.remove("slide--move");
  inactiveEl.classList.add("slide--active");
  activeEl.classList.remove("slide--move");
  activeEl.classList.remove("slide--active");
  activeEl.classList.add("visually-hidden");
}

function preparingToMove(activeEl, inactiveEl) {
  inactiveEl.classList.remove("visually-hidden");
  inactiveEl.classList.add("slide--move");
  activeEl.classList.add("slide--move");
}

function moveSlide(activeEl, inactiveEl, direction = "left") {
  function moveLeftInner() {
    inactiveEl.style.left = `${sliderBlock.offsetWidth}px`;

    const moveIntervalLeft = setInterval(() => {
      inactiveEl.style.left = inactiveEl.style.left.slice(0, -2) - 10 + "px";

      activeEl.style.left = activeEl.style.left.slice(0, -2) - 10 + "px";

      if (inactiveEl.style.left.slice(0, -2) <= 10) {
        clearInterval(moveIntervalLeft);
        mutualReplacementOfSlides(activeEl, inactiveEl);
      }
    }, 1);
  }

  function moveRightInner() {
    inactiveEl.style.left = `-${sliderBlock.offsetWidth}px`;

    const moveIntervalRight = setInterval(() => {
      inactiveEl.style.left = +inactiveEl.style.left.slice(0, -2) + 10 + "px";

      activeEl.style.left = +activeEl.style.left.slice(0, -2) + 10 + "px";

      if (inactiveEl.style.left.slice(0, -2) > -10) {
        clearInterval(moveIntervalRight);
        mutualReplacementOfSlides(activeEl, inactiveEl);
      }
    }, 1);
  }

  if (direction === "right") moveRightInner();
  else moveLeftInner();
}

function moveLeft() {
  const slideInactive = document.querySelector(".slide.visually-hidden");
  const slideActive = document.querySelector(".slide.slide--active");

  preparingToMove(slideActive, slideInactive);
  moveSlide(slideActive, slideInactive, "left");
}

function moveRight() {
  const slideInactive = document.querySelector(".slide.visually-hidden");
  const slideActive = document.querySelector(".slide.slide--active");

  preparingToMove(slideActive, slideInactive);
  moveSlide(slideActive, slideInactive, "right");
}

arrowsSlider[0].addEventListener("click", moveLeft);
arrowsSlider[1].addEventListener("click", moveRight);

// for mobile

const hamburger = document.querySelector(".main-header__toggle");
const navigationMenu = document.querySelector(".main-navigation");
const logo = document.querySelector(".main-header__logo");
const containerOfHeader = document.querySelector(".main-header .container");
hamburger.addEventListener("click", toggleNavigationMenu);

function toggleNavigationMenu(e) {
  const current = e.target;
  const visibleWidthNavigationMenu = navigationMenu.offsetWidth;

  console.log(logo);
  console.log(containerOfHeader);

  if (current.classList.contains("main-header__toggle--active")) {
    //do invisible
    let currentLeft = 0;
    const moveMenu = setInterval(() => {
      navigationMenu.style.left = `${(currentLeft -= 10)}px`;
      if (currentLeft - 10 <= -visibleWidthNavigationMenu) {
        navigationMenu.style.left = `${-visibleWidthNavigationMenu}px`;
        clearInterval(moveMenu);
      }
    }, 10);
    containerOfHeader.prepend(logo);
  } else {
    // do visible
    let currentLeft = -visibleWidthNavigationMenu;
    const moveMenu = setInterval(() => {
      navigationMenu.style.left = `${(currentLeft += 10)}px`;
      if (currentLeft + 10 >= 0) {
        navigationMenu.style.left = `0px`;
        clearInterval(moveMenu);
      }
    });
    navigationMenu.prepend(logo);
  }
  current.classList.toggle("main-header__toggle--active");
}

function showHamburger() {
  let currentWidthWindows = document.body.scrollWidth;

  if (currentWidthWindows <= 767) {
    if (hamburger.classList.contains("main-header__toggle--hidden"))
      hamburger.classList.remove("main-header__toggle--hidden");

    if (hamburger.classList.contains("main-header__toggle--active"))
      hamburger.classList.remove("main-header__toggle--active");

  } else {
    if (!hamburger.classList.contains("main-header__toggle--hidden")) {
      hamburger.classList.add("main-header__toggle--hidden");
    }    

    navigationMenu.removeAttribute("style");
    containerOfHeader.prepend(logo);
  }
}

showHamburger();

window.addEventListener("resize", showHamburger);
