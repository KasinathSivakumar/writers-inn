/*=========================================================
WRITER'S INN
MAIN.JS
=========================================================*/

/*==============================
HEADER ON SCROLL
==============================*/

const header = document.querySelector(".header");
const hero = document.querySelector("#hero");

window.addEventListener("scroll", () => {

    if (window.scrollY >= hero.offsetHeight - 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/*==============================
REVIEW CAROUSEL
==============================*/

const track = document.querySelector(".review-track");

const slides = document.querySelectorAll(".review-card");

const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

let autoSlide;


/*==============================
UPDATE SLIDER
==============================*/

function updateSlider() {

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => {

        dot.classList.remove("active");

    });

    dots[currentSlide].classList.add("active");

}


/*==============================
NEXT
==============================*/

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    updateSlider();

}


/*==============================
PREVIOUS
==============================*/

function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }

    updateSlider();

}


/*==============================
BUTTON EVENTS
==============================*/

nextBtn.addEventListener("click", () => {

    nextSlide();

    restartAuto();

});

prevBtn.addEventListener("click", () => {

    prevSlide();

    restartAuto();

});


/*==============================
DOT EVENTS
==============================*/

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide=index;

        updateSlider();

        restartAuto();

    });

});


/*==============================
AUTO SLIDE
==============================*/

function startAuto(){

    autoSlide=setInterval(nextSlide,6000);

}

function stopAuto(){

    clearInterval(autoSlide);

}

function restartAuto(){

    stopAuto();

    startAuto();

}

startAuto();


/*==============================
PAUSE ON HOVER
==============================*/

const slider=document.querySelector(".review-slider");

slider.addEventListener("mouseenter",stopAuto);

slider.addEventListener("mouseleave",startAuto);


/*==============================
TOUCH SWIPE
==============================*/

let touchStartX=0;

let touchEndX=0;

slider.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].screenX;

});

slider.addEventListener("touchend",(e)=>{

    touchEndX=e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    if(touchEndX<touchStartX-50){

        nextSlide();

        restartAuto();

    }

    if(touchEndX>touchStartX+50){

        prevSlide();

        restartAuto();

    }

}


/*==============================
SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==============================
MOBILE SIDEBAR
==============================*/

const menuBtn=document.querySelector(".menu-toggle");

const sidebar=document.querySelector(".sidebar");

const overlay=document.querySelector(".overlay");

const closeBtn=document.querySelector(".close-menu");

menuBtn.addEventListener("click",()=>{

    sidebar.classList.add("active");

    overlay.classList.add("active");

});

closeBtn.addEventListener("click",closeMenu);

overlay.addEventListener("click",closeMenu);

function closeMenu(){

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}

document.querySelectorAll(".sidebar a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});

/*=========================================================
LIGHTBOX
=========================================================*/

const galleryImages = [
    "assets/images/gallery/gallery-01.jpeg",
    "assets/images/gallery/gallery-02.jpeg",
    "assets/images/gallery/gallery-03.jpeg",
    "assets/images/gallery/gallery-04.jpeg",
    "assets/images/gallery/gallery-05.jpeg",
    "assets/images/gallery/gallery-06.jpeg",
    "assets/images/gallery/gallery-07.jpeg",
    "assets/images/gallery/gallery-08.jpeg",
    "assets/images/gallery/gallery-09.jpeg",
    "assets/images/gallery/gallery-10.jpeg",
    "assets/images/gallery/gallery-11.jpeg",
    "assets/images/gallery/gallery-12.jpeg",
    "assets/images/gallery/gallery-13.jpeg",
    "assets/images/gallery/gallery-14.jpg"
];

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-image");

const closeLightboxBtn = document.querySelector(".lightbox-close");
const nextLightboxBtn = document.querySelector(".lightbox-next");
const prevLightboxBtn = document.querySelector(".lightbox-prev");

const viewAllBtn = document.getElementById("viewAllPhotos");

const galleryThumbs = document.querySelectorAll(".gallery-image");

let currentImage = 0;

function openLightbox(index){

    currentImage = index;

    lightboxImg.src = galleryImages[currentImage];

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

function updateImage(){

    lightboxImg.src = galleryImages[currentImage];

}

galleryThumbs.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        openLightbox(index);

    });

});

viewAllBtn.addEventListener("click",()=>{

    openLightbox(0);

});

nextLightboxBtn.addEventListener("click",()=>{

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    updateImage();

});

prevLightboxBtn.addEventListener("click",()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    updateImage();

});

closeLightboxBtn.addEventListener("click",closeLightbox);

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape") closeLightbox();

    if(e.key==="ArrowRight") nextLightboxBtn.click();

    if(e.key==="ArrowLeft") prevLightboxBtn.click();

});

/*=========================================================
GALLERY REVEAL
=========================================================*/

const galleryItems = document.querySelectorAll(".gallery-image");

const galleryObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            galleryObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

galleryItems.forEach((item,index)=>{

    item.style.transitionDelay = `${index * 100}ms`;

    galleryObserver.observe(item);

});

/*==============================
FAQ ACCORDION
==============================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(faq => {

            faq.classList.remove("active");

        });

        if (!isActive) {

            item.classList.add("active");

        }

    });

});

/*==============================
SCROLL REVEAL
==============================*/

const revealSections = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

revealSections.forEach(section=>{

    revealObserver.observe(section);

});

/*==============================
SCROLL PROGRESS
==============================*/

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

/*==============================
SCROLL TO TOP
==============================*/

const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        scrollTopBtn.classList.add("show");

    }else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});