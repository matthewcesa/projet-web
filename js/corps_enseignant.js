function moveRight() {
    var slider = document.getElementById('slider-prof');
    var cards = slider.getElementsByClassName('card');
    slider.appendChild(cards[0]);
}

function moveLeft() {
    var slider = document.getElementById('slider-prof');
    var cards = slider.getElementsByClassName('card');
    slider.insertBefore(cards[cards.length - 1], cards[0]);
}

