window.addEventListener('load', () => {
    alert("if not working please refresh :)");
})
// for refreshing page to get exact window and element height
const refresh = document.querySelector(".refresh");
refresh.addEventListener('click', () => {
    window.location.reload();
})
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.image');
const prevBtn = document.querySelector('.ri-arrow-left-line btn');
const nextBtn = document.querySelector('.ri-arrow-right-line btn');
const bg_img = document.querySelector('.bg_img');
const length = images.length;
slideNumber = 1;

const slideSection = document.querySelector(".slide-section");
let heightWindowpx = window.innerHeight; //total size in px of window
let elementheightpx = slideSection.offsetHeight;  //total size in px of slides


const elementHeightInVh = pxToVh(elementheightpx);
const windowHeightInVh = pxToVh(heightWindowpx);

function pxToVh(pxValue) {
    // Get the viewport height in pixels
    const vh = window.innerHeight || document.documentElement.clientHeight;
  
    // Convert px to vh and return the value
    return (pxValue / vh) * 100;
  }
  
//bottom dots JS start

const bottom = document.querySelector('.bottom');

for (let i = 0; i < length; i++) {  //loop to create dots as number of images
    const div = document.createElement('div');
    div.className = 'button';
    bottom.appendChild(div);
}

const bottom_buttons = document.querySelectorAll('.button');

bottom_buttons[0].style.backgroundColor = 'whitesmoke';

bottom_buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        resetBg();
        slides.style.transform = `translateY(-${i * elementHeightInVh}vh)`; //change slide dots click
        bg_img.style.transform = `translateY(-${i * windowHeightInVh}vh)`;  //change bg-img dots click
        button.style.backgroundColor = 'whitesmoke';
    });
});

const resetBg = () => {
    bottom_buttons.forEach((button) => {
        button.style.backgroundColor = 'transparent';
        button.style.transform = `scale(1)`;
    });
};

const changeColor = () => {
    resetBg();
    bottom_buttons[slideNumber - 1].style.backgroundColor = 'whitesmoke';
    bottom_buttons[slideNumber - 1].style.transform = 'scale(1.2)';
}
//bottom dots JS end

//slides JS start
function nxtslide() {
    slides.style.transform = `translateY(-${slideNumber * elementHeightInVh}vh)`;
    bg_img.style.transform = `translateY(-${slideNumber * windowHeightInVh}vh)`;
    slideNumber++;
}

function prevslide() {
    slides.style.transform = `translateY(-${(slideNumber - 2) * elementHeightInVh}vh)`;
    bg_img.style.transform = `translateY(-${(slideNumber - 2) * windowHeightInVh}vh)`;
    slideNumber--;
}

function firstslide() {
    slides.style.transform = `translateY(0vh)`;
    bg_img.style.transform = `translateY(0vh)`;
    slideNumber = 1;
}

function lastslide() {
    slides.style.transform = `translateY(-${(length - 1) * elementHeightInVh}vh)`;
    bg_img.style.transform = `translateY(-${(length - 1) * windowHeightInVh}vh)`;
    slideNumber = length;
}

function slideright() {
    slideNumber < length ? nxtslide() : firstslide();
    changeColor();
}

function slideleft() {
    slideNumber > 1 ? prevslide() : lastslide();
    changeColor();
}
// slides JS end

//auto slider start
let slideInterval;

const startSlideshow = () => {
    slideInterval = setInterval(() => {
        slideNumber < length ? nxtslide() : firstslide();
        changeColor();
        autoplay_btn.innerHTML = "Autoplay ON";
        CheckAutoBtn = 1;
    }, 3000);
};

const stopSlideshow = () => {
    clearInterval(slideInterval);
    autoplay_btn.innerHTML = "Autoplay OFF";
    CheckAutoBtn = 0; //Updating when stopslider function call via startslideshow condition
};

//autoplay functionality btn
const autoplay_btn = document.querySelector('.btn-autoplay');
let CheckAutoBtn = 0;

function autoFunc() {
    if (CheckAutoBtn === 0) {
        startSlideshow();
        autoplay_btn.innerHTML = "Autoplay ON";
        CheckAutoBtn = 1;
    } else {
        stopSlideshow();
        autoplay_btn.innerHTML = "Autoplay OFF";
        CheckAutoBtn = 0;
    }
}
// Attach the event listener to the button using the function
autoplay_btn.addEventListener('click', autoFunc);