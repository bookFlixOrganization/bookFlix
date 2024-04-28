const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');

icon.onclick = function() {
    search.classList.toggle('active');
};

clear.onclick = function() {
    document.getElementById("mySearch").value = '';
};




var swiper = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: -20,
    freeMode: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


//const swiper = new Swiper('.swiper', {
    // Optional parameters
    

  
    // Navigation arrows
    //navigation: {
      //nextEl: '.swiper-button-next',
      //prevEl: '.swiper-button-prev',
    //},
//});