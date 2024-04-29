const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');

icon.onclick = function() {
    search.classList.toggle('active');
};

clear.onclick = function() {
    document.getElementById("mySearch").value = '';
};




// Show more (для раскрытия карточек с отзывами)
const showMore = document.querySelector('.show-more');
const productsLength = document.querySelectorAll('.block').length;
let items = 10;

showMore.addEventListener('click', () => {
	items += 4;
	const array = Array.from(document.querySelector('.container_2').children);
	const visItems = array.slice(0, items);

	visItems.forEach(el => el.classList.add('is-visible'));

	if (visItems.length === productsLength) {
		showMore.style.display = 'none';
	}
});


