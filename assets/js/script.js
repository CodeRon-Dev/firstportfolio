// Typing text
var typed = new Typed(".typing-text", {
    strings: ["Web Developer", "Frontend Developer", "Photo Editor", "Video Editor"],   // Array of strings to type out
    typeSpeed: 100,               // Typing speed in milliseconds
    backSpeed: 100,               // Backspacing speed in milliseconds
    backDelay: 1000,              // Time delay before starting to backspace
    loop: true                    // Whether to loop through the strings indefinitely
});


// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}  

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {   
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active section for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    //sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// reveal animation on scroll
window.addEventListener('scroll', reveal);

    function reveal() {
        var reveals = document.querySelectorAll('.reveal');

        for(var i = 0; i < reveals.length; i++) {
            
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 150;

            if(revealtop < windowheight - revealpoint) {
                reveals[i].classList.add('active-scroll');
            }
            else {
                reveals[i].classList.remove('active-scroll');
            }
        }
    }

    // progress bar
const progressBar = document.querySelectorAll(".progress-bar");
const progressBarContainer = document.querySelector(".show-on-scroll");

let start = null;
document.onscroll = function() {
    if (isElementInViewport(progressBarContainer)) {
        if (!start) {
            start = performance.now();
            window.requestAnimationFrame(loop);
        }
    } else {
        start = null;
    }
};

const animationTime = 1000;

function loop(timestamp) {
    const elapsed = timestamp - start;
    const progress = elapsed / animationTime;

    progressBar.forEach((bar) => {
        const progressComplete = bar.getAttribute("data-complete");
        const width = progress < 1 ? Math.min(progress * 100, progressComplete) : progressComplete;

        bar.style.width = width + "%";
        bar.innerHTML = Math.round(width) + "%";
    });

    if (progress < 1) {
        window.requestAnimationFrame(loop);
    } else {
        // Ensure final state is exactly data-complete value
        progressBar.forEach((bar) => {
            const progressComplete = bar.getAttribute("data-complete");
            bar.style.width = progressComplete + "%";
            bar.innerHTML = progressComplete + "%";
        });
    }
}

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
        rect.top <= windowHeight &&
        rect.bottom >= 0
    );
}
    //Circular Bar onscroll active
    // Function to check if an element is fully in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

// Function to animate radial progress bars when fully in viewport
function animateRadialBars() {
    let radialBars = document.querySelector('.skills-column .skills-content .radial-bars');
    let radialCircle = radialBars.querySelectorAll('.radial-circle');

    radialCircle.forEach(function(progress) {
        if (isInViewport(progress)) {
            if (!progress.classList.contains('animated')) {
                progress.classList.add('animated'); // Add a class to track animation state

                let degree = 0;
                let targetDegree = parseInt(progress.getAttribute('data-degree'));
                let color = progress.getAttribute('data-color');
                let percentage = progress.querySelector('.percentage');

                let interval = setInterval(function() {
                    degree += 1;
                    if (degree > targetDegree) {
                        clearInterval(interval);
                        return;
                    }
                    progress.style.background = `conic-gradient(${color} ${degree}%, #222 0%)`;
                    percentage.innerHTML = degree + '<span>%</span>';
                    percentage.style.color = color;
                }, 25);
            }
        } else {
            progress.classList.remove('animated'); // Remove animation class if not in viewport
        }
    });
}

// Initial check on page load
animateRadialBars();

// Event listener for scroll to trigger animation
window.addEventListener('scroll', function() {
    animateRadialBars();
});

// Portfolio Carousel
//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// Pop up for works 
function openPopup() {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    
    overlay.style.display = 'block';
    popup.style.display = 'block';
    
    // Disable scrolling on the main page
    document.body.style.overflow = 'hidden !important';
    
    // Ensure the popup is focused and scroll is positioned at the top
    popup.focus();
    popup.scrollTop = 0; // Scroll to top of the popup content
}

function closePopup() {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    
    overlay.style.display = 'none';
    popup.style.display = 'none';
    
    // Enable scrolling back on the main page
    document.body.style.overflow = '';
}

