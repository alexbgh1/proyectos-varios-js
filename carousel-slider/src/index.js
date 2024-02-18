const $heroImage = document.querySelector(".slider-hero"); // Should be an array of the children of the .slider-hero element
const $selectHeroImg = document.querySelector(".select-hero-img");
$selectHeroImg.innerHTML = `<div class="wrapper-button-img flex mt-4 w-max"></div>`;
const $wrapperButtonImg = document.querySelector(".wrapper-button-img");

const srcImg = {
  1: "./public/images/slide-1.jpg",
  2: "./public/images/slide-2.jpg",
  3: "./public/images/slide-3.jpg",
  4: "./public/images/slide-4.jpg",
  5: "./public/images/slide-5.jpg",
  //   6: "./public/images/slide-5.jpg",
  //   7: "./public/images/slide-5.jpg",
  //   8: "./public/images/slide-5.jpg",
  //   9: "./public/images/slide-5.jpg",
  //   10: "./public/images/slide-5.jpg",
  //   11: "./public/images/slide-5.jpg",
};

// Generate dynamic options for the select element
for (let i = 0; i < Object.keys(srcImg).length; i++) {
  const imgIndex = i + 1;
  const classNameFirstHeroImage = imgIndex === 1 ? "hero-active" : "absolute";
  const classNameFirstButton = imgIndex === 1 ? "selected-active" : "";

  // 1. Create content
  const $appendHeroImage = `<img src=${srcImg[imgIndex]} alt="slider ${imgIndex}" class="hero-img absolute opacity-0 ${classNameFirstHeroImage} top-0 left-0 object-contain w-full h-full rounded-lg" />`;

  const $optionButtonImg = `<button class="${classNameFirstButton}">
        <img src="${srcImg[imgIndex]}" alt="slider" class="object-cover w-16 h-16 mx-1 rounded-lg" />
    </button>`;

  // 2. Add content to div's
  $wrapperButtonImg.innerHTML += $optionButtonImg;
  $heroImage.innerHTML += $appendHeroImage;
}

/* DRAGGABLE SLIDER */
let isDragging = false;
let startX, startTranslateX, maxTranslateX;

$selectHeroImg.addEventListener("mousedown", (e) => {
  isDragging = true;
  $selectHeroImg.style.cursor = "grabbing";
  startX = e.pageX;
  startTranslateX = getCurrentTranslateX();
  maxTranslateX = $wrapperButtonImg.offsetWidth;
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    $selectHeroImg.style.cursor = "grab";
    isDragging = false;
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const moveX = e.pageX - startX;
  const newTranslateX = startTranslateX + moveX;

  // Limit the movement of the slider, left and right
  if (newTranslateX > maxTranslateX - maxTranslateX / 2) return;
  if (newTranslateX < -maxTranslateX + maxTranslateX / 2) return;
  setTranslateX(newTranslateX);
});

// Function to get the current translateX value, because we are using translate3d
function getCurrentTranslateX() {
  const style = window.getComputedStyle($wrapperButtonImg);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

function setTranslateX(value) {
  $wrapperButtonImg.style.transform = `translate3d(${value}px, 0, 0)`;
}

const $buttonsImgs = $wrapperButtonImg.querySelectorAll("button");
$buttonsImgs.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Changing the last hero image
    $heroImage.querySelector(".hero-active").classList.remove("hero-active");

    // Add the z-1 class to the selected image
    $heroImage.children[index].classList.add("hero-active");

    // Changing the scale of the button (selected)
    $buttonsImgs.forEach((button) => button.classList.remove("selected-active"));
    button.classList.add("selected-active");

    // Changing the scroll position to the selected image ($selectHeroImg)
    let selectedImg = $selectHeroImg;
    const buttonWidth = button.offsetWidth; // Ancho del botón
    const offset = button.offsetLeft - buttonWidth * (2 / 3); // Adjust the position of the scroll, we leave a margin of 2/3 of the width of the next button for UX purposes
    selectedImg.scrollTo({
      left: offset,
      behavior: "smooth", // Añadir comportamiento de desplazamiento suave
    });
  });
});
