'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});

// Function to show the selected product gallery
function showGallery(galleryId) {
  // Hide all product galleries
  const galleries = document.querySelectorAll('.product-gallery');
  galleries.forEach(gallery => gallery.classList.remove('active'));

  // Show the clicked product gallery
  const activeGallery = document.getElementById(galleryId);
  if (activeGallery) {
    activeGallery.classList.add('active');
  }
}

function toggleGallery(galleryId) {
  // Collect all product galleries
  const galleries = document.querySelectorAll('.product-gallery');

  // Find the gallery we want to toggle
  const targetGallery = document.getElementById(galleryId);
  if (!targetGallery) return; // If it doesn't exist, just stop

  // If the target gallery is already active, hide it
  if (targetGallery.classList.contains('active')) {
    targetGallery.classList.remove('active');
  } else {
    // Otherwise, first hide all galleries
    galleries.forEach(gallery => gallery.classList.remove('active'));
    
    // Then show (activate) the clicked gallery
    targetGallery.classList.add('active');
  }
}


function filterItems(country) {
  // Select all items in .food-menu-list
  const allItems = document.querySelectorAll('.food-menu-list li');

  allItems.forEach(item => {
    // Get the country data from data-country attribute
    const itemCountry = item.dataset.country; 
    // or `item.getAttribute('data-country')`

    // If user clicked 'All' OR the item's data-country matches the filter:
    if (country === 'All' || itemCountry === country) {
      item.style.display = 'block';  // Show it
    } else {
      item.style.display = 'none';   // Hide it
    }
  });
}

const slides = document.querySelectorAll('.slide');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

let currentSlideIndex = 0;
let slideInterval; // For auto-slide

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function goToNextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

function goToPrevSlide() {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  showSlide(currentSlideIndex);
}

// Start auto-slide
function startAutoSlide() {
  slideInterval = setInterval(goToNextSlide, 5000); // 5 seconds
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Event listeners
nextArrow.addEventListener('click', () => {
  stopAutoSlide();     // optional if you want to pause on manual click
  goToNextSlide();
  startAutoSlide();    // optional if you want it to resume auto-sliding
});

prevArrow.addEventListener('click', () => {
  stopAutoSlide();
  goToPrevSlide();
  startAutoSlide();
});

// Initialize
showSlide(currentSlideIndex);
startAutoSlide();