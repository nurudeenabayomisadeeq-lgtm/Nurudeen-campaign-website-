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
// Election Countdown
const electionDate = new Date("February 08, 2027 08:00:00").getTime();

const timer = setInterval(function () {

    const now = new Date().getTime();
    const distance = electionDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML =
        days + " Days " + hours + " Hours " + minutes + " Minutes";

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "Election Day!";
    }

}, 1000);
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        darkBtn.innerHTML="☀️ Light Mode";
    }else{
        darkBtn.innerHTML="🌙 Dark Mode";
    }

});
