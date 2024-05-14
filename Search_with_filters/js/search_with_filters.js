const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');

icon.onclick = function() {
    search.classList.toggle('active');
};

clear.onclick = function() {
    document.getElementById("mySearch").value = '';
};


function toggleVisibility() {
    let element = document.getElementById('hiddenDiv');
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}


