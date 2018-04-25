function onLoad() {
    let prevChoice = {};
    let playerMoves = 0;
    let playTime;
    let activeCards = [];
    let playField = document.getElementsByClassName('playField')[0];
    let mainScreen = document.getElementsByClassName('mainScreen')[0];
    let endGame = document.getElementsByClassName('winner')[0];
    let movesCounter = document.getElementsByClassName('moves')[0];
    let timer = document.getElementsByClassName('timer')[0];
    let winnerSection = document.getElementsByClassName('winner');

    document.getElementById('gameStart').addEventListener('click', gameInit);
    endGame.addEventListener('click', resetGame);
    playField.addEventListener('click',onClickBoard);

    function getParams(value) {
        let elements = document.getElementsByName(value);
        let param;
        elements.forEach(function(item){
            if (item.checked) {
                param = item.getAttribute('value');
            }
        });
        return param;
    }

    function getShuffledArray(params) {
        let ret = [];
        for (let i = 0; i < params / 2; i++) {
            ret.push(i, i);
        }
        return ret.sort(() => Math.random() - 0.5);
    }


    function showOptions() {
        let element = document.getElementsByClassName('options');
        element[0].classList.toggle('optionsShow')
    }

    function printNumbersInterval() {
        let sec = 0;
        let min = 0;
        return function () {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min < 10 && min[0] != '0') {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            timer.innerHTML = min + ":" + sec;
        };
    }

    function comparePairs(cards) {
        if (Card.prototype.isMatch.call(cards)) {
            Card.prototype.hide.call(cards);
            let cardsCount = getParams('difficult');
            if (document.getElementsByClassName('match').length == cardsCount) {
                document.getElementsByClassName('endMoves')[0].innerHTML = movesCounter.innerHTML;
                document.getElementsByClassName('endTime')[0].innerHTML = timer.innerHTML;
                winnerSection[0].classList.remove('hide');
                winnerSection[0].classList.add('show');
                document.getElementsByClassName('againYou')[0].innerHTML = 'Maybe want one wore round?';
                clearInterval(playTime);
                playerMoves = 0;
            }
        }
        else {
            Card.prototype.rotateBack.call(cards);
        }
        Card.prototype.clearFlip.call(cards);
        prevChoice = {};
    }

    function onClickCardBack(card) {
        if(prevChoice !== card){
            prevChoice = card;
            playerMoves++;
            if (playerMoves === 1) {
                playTime = setInterval(printNumbersInterval(), 1000);
            }
            movesCounter.innerHTML = playerMoves;
            Card.prototype.rotate.call(card);
            setTimeout(function () {
                activeCards.push(card);
                if (activeCards.length === 2) {
                    comparePairs(activeCards);
                    activeCards = [];
                }
            }, 500)
        }
    }

    function changeSections(hideSection, showSection) {
        hideSection.classList.add('hide');
        hideSection.classList.remove('show');
        showSection.classList.remove('hide');
        showSection.classList.add('show');
    }

    function resetGame() {
        if (document.getElementById('boardCreated')) {
            playField.removeChild(document.getElementById('boardCreated'));
        }
        changeSections(playField, mainScreen);
        endGame.classList.add('hide');
        endGame.classList.remove('show');
        movesCounter.innerHTML = '0';
        timer.innerHTML = '00:00';
        playerMoves = 0;
        clearInterval(playTime);
        prevChoice = {};
    }

    function gameInit() {
        resetGame();
        let difficultValue = getParams('difficult');
        let skirtsCords = choiceArray[getParams('cardSkirts')];
        let boardStyle = choiceArray[difficultValue];
        let frontCords = choiceArray[getParams('cardFronts')];
        let arr = getShuffledArray(difficultValue);
        let fragment = document.createDocumentFragment();
        let board = document.createElement('div');
        board.classList.add('board');
        board.id = 'boardCreated';
        board.classList.add(boardStyle);
        for (let i = 0; i < difficultValue; i++) {
            let newCard = new Card(frontCords[arr[i]], skirtsCords, arr[i], board);
            board.appendChild(newCard.card);
        }
        fragment.appendChild(board);
        playField.appendChild(fragment);
        changeSections(mainScreen, playField);
    }

    function onClickBoard(event) {
        if(event.path[1].classList.contains('card')){
            onClickCardBack(event.path[1]);
        }
    }
}

document.addEventListener('DOMContentLoaded', onLoad());
