import '../sass/style.scss';

let headerElem = document.querySelector('#pageHeader');
window.addEventListener('scroll', toggleClassOnScroll.bind(headerElem, 10));
function toggleClassOnScroll(pxAmount) {
    let scrollTop = window.pageYOffset;

    if(scrollTop > pxAmount) {
        this.classList.add('fixed');
    } else {
        this.classList.remove('fixed');
    }
}

let toggleElem = document.querySelector('.navToggle');
let navigationElem = document.querySelector('.navigation');
toggleElem.addEventListener('click', function(e) {
    this.classList.toggle('opened');
    toggleMenuShow();
});
function toggleMenuShow() {
    if(navigationElem.classList.contains('navigationShow'))
        navigationElem.classList.remove('navigationShow');
    else navigationElem.classList.add('navigationShow');
}