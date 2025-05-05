
const clickableElement = document.querySelector('.gate');

clickableElement.addEventListener('click', function() {
  //so everything gets bigger, not just gate
  document.querySelector('.center').classList.toggle('bigger');

  //cant reset animation once it is going
  clickableElement.style.pointerEvents = 'none'; 
  clickableElement.classList.add('animate');

  //redirect (slightly before end of animation)
  setTimeout(function() {
    window.location.href = 'lookaround.html';
  }, 3500); 
  
  //make clickable, i guess only needed if doesn't redirect for some reason.....
  setTimeout(function() {
    clickableElement.style.pointerEvents = 'auto'; 
    clickableElement.classList.remove('animate');
  }, 4000); 
});