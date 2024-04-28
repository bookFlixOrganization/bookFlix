const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');

icon.onclick = function() {
    search.classList.toggle('active');
};

clear.onclick = function() {
    document.getElementById("mySearch").value = '';
};



/* Модальное окно для рейтинга */

// Открыть модальное окно
document.getElementById("open-modal-btn").addEventListener("click", function() {
  document.getElementById("my-modal").classList.add("open")
})

// Закрыть модальное окно нажатием на крестик "Х"
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
  document.getElementById("my-modal").classList.remove("open")
})

// Закрыть модальное окно при отправке оценки
document.getElementById("opener").addEventListener("click", function() {
  document.getElementById("my-modal").classList.remove("open")
})

// Закрыть модальное окно при клике вне его области
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
  event._isClickWithInModal = true;
});

document.getElementById("my-modal").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open');
});

// Закрыть модальное окно нажатием на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    document.getElementById("my-modal").classList.remove("open")
  }
});

// Автоматическое закрытие модального окна "Спасибо за оценку!"
document.addEventListener("DOMContentLoaded", function(){
  document.querySelector("#opener").onclick = function(){
     setTimeout( function() {
         document.querySelector("[title='close']").click();
     }, 2000);
  }
 });









/* Модальное окно для отзыва */

// Открыть модальное окно
document.getElementById("leave_a_review").addEventListener("click", function() {
  document.getElementById("my-modal-1").classList.add("open-1")
})

// Закрыть модальное окно нажатием на крестик "Х"
document.getElementById("close-my-modal-btn-2").addEventListener("click", function() {
  document.getElementById("my-modal-1").classList.remove("open-1")
})

// Закрыть модальное окно при отправке отзыва
document.getElementById("safe").addEventListener("click", function() {
  document.getElementById("my-modal-1").classList.remove("open-1")
})

// Закрыть модальное окно при клике вне его области
document.querySelector("#my-modal-1 .modal__box-1").addEventListener('click', event => {
  event._isClickWithInModal = true;
});

document.getElementById("my-modal-1").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open-1');
});

// Закрыть модальное окно нажатием на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    document.getElementById("my-modal-1").classList.remove("open-1")
  }
});





// function hoverOn() {
  // document.getElementById("10").classList.add("active");
// }

// function hoverOff() {
  // document.getElementById("10").classList.remove("active");
// }



// Show more (для раскрытия карточек с отзывами)
const showMore = document.querySelector('.show-more');
const productsLength = document.querySelectorAll('.block').length;
let items = 4;

showMore.addEventListener('click', () => {
	items += 2;
	const array = Array.from(document.querySelector('.container_2').children);
	const visItems = array.slice(0, items);

	visItems.forEach(el => el.classList.add('is-visible'));

	if (visItems.length === productsLength) {
		showMore.style.display = 'none';
	}
});



// Ползунок для рейтинга
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}


