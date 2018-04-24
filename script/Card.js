function Card(frontCords, skirtCords, index){
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    let cardFace = document.createElement('div');
    cardFace.classList.add('front');
    cardFace.style.background = 'url(images/new.png)' + frontCords;
    card.appendChild(cardFace);
    let cardBack = document.createElement('div');
    cardBack.classList.add('back');
    cardBack.style.background = 'url(images/new.png) ' + skirtCords;
    card.appendChild(cardBack);
    this.card = card;
}

Card.prototype.rotate = function () {
    this.classList.add('rotate');
    this.classList.add('flip');
};

Card.prototype.rotateBack = function() {
    this.forEach(function(node) {
        node.classList.remove('rotate');
    })
};

Card.prototype.hide = function() {
    this.forEach(function(node) {
        node.lastChild.classList.add('backHide');
        node.classList.add('match');
    })
};

Card.prototype.clearFlip = function() {
    this.forEach(function(node) {
        node.classList.remove('flip');
    })
};

Card.prototype.isMatch = function () {
    return this[0].dataset.index === this[1].dataset.index
};
