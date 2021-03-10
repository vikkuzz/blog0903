const burger = document.querySelector('icon');
const topNav = document.getElementById('myTopnav');

burger.addEventListener('click', () => {
  if (topNav.className === 'topnav') {
    topNav.className += ' responsive';
  } else {
    topNav.className = 'topnav';
  }
});
