// Menu toggle (mobile)
const menu = document.querySelector('.menu');
const menuBar = document.querySelector('.menu-bar');
menu.onclick = () => {
  menuBar.classList.toggle('active');
};