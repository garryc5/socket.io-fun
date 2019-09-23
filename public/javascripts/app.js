var socket = io();
socket.on('add-circle', function(data)
{
addCircle(data)
});
socket.on('clear-circles',function()
{
    circles.innerHTML = '';
})

var circles = document.getElementById('circles');
var initials = '';

circles.addEventListener('click', function(evt) {
  //addCircle(evt.clientX, evt.clientY, randomBetween(10,525), getRandomRGBA());
  socket.emit('add-circle', {
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10,100),
    rgba: getRandomRGBA(),
    initials: initials
});
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
  // circles.innerHTML = '';
socket.emit('clear-circles')
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

function getInitials() {
  var input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

function addCircle({x, y, dia, rgba, initials}) {
  var el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return ['rgba(', randomBetween(0, 65), ',', randomBetween(50, 255), ',',
    randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
}
