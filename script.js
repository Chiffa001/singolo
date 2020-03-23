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
      top: el.offsetTop - header.scrollHeight
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
    sizeBlocks.push(iterator.scrollHeight);
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
setLocationOfItem(modalWindow);
window.addEventListener("resize", resizeWindow);

function resizeWindow() {
  setLocationOfItem(modalWindow);
}

function setLocationOfItem(el) {
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
    modalBtn.removeEventListener("click", closeModal);
  }

  const modalBtn = document.querySelector(".modal__btn");
  modalBtn.addEventListener("click", closeModal);
}
