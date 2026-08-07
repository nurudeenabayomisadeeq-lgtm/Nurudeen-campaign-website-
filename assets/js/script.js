// Campaign Website JavaScript
let slideIndex = 0;
showSlides();

function showSlides(){

    let slides=document.getElementsByClassName("slide");

    for(let i=0;i<slides.length;i++){
        slides[i].style.display="none";
    }

    slideIndex++;

    if(slideIndex>slides.length){
        slideIndex=1;
    }

    slides[slideIndex-1].style.display="block";

    setTimeout(showSlides,3000);
}
<img src="assets/images/nuru1.jpg">
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000);
}
let topButton = document.getElementById("topBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
