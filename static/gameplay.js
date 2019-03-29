window.onload = function () {


    const allInnerImages = ['fa-cat',
        'fa-dragon',
        'fa-paw',
        'fa-dog',
        'fa-bolt',
        'fa-star',
        'fa-moon',
        'fa-snowflake',
        'fa-sun',
        'fa-campground',
        'fa-apple-alt',
        'fa-chess',
        'fa-dove',
        'fa-globe-americas',
        'fa-plane',
        'fa-wine-glass-alt',
        'fa-anchor',
        'fa-spa',
        'fa-shuttle-van',
        'fa-rainbow'];

    const backImage = 'fa-stroopwafel';
    const board = document.getElementsByClassName("card");

    let shuffledDoubleImages = createShuffledImagesBoard(allInnerImages);
    let status = 'INITIAL';
    let time;
    setup();
    timer();


    /* GAME STATUSES :
    *  INITIAL - ready for first guess
    *  FIRSTSHOT - after first guess, one card flipped
    *  SECONDSHOT- after second guess, two cards flipped */

    /*case (status == INITIAL
    *       && unflippedCard == True*/


    function setup() {
        let cardOneindex;
        let cardTwoindex;
        for (let i = 0; i < board.length; i++) {
            board[i].addEventListener("click", function () {
                let unflippedCard = board[i].classList.contains(backImage);

                if (status === 'INITIAL' && unflippedCard) {
                    cardOneindex = i;
                    uncoverCard(board[i], shuffledDoubleImages[i]);
                    status = 'FIRSTSHOT';
                } else if (status === 'FIRSTSHOT' && unflippedCard) {
                    cardTwoindex = i;
                    uncoverCard(board[i], shuffledDoubleImages[i]);
                    status = 'SECONDSHOT';
                    if (status === 'SECONDSHOT') {
                        if (shuffledDoubleImages[cardOneindex] === shuffledDoubleImages[cardTwoindex]) {
                            chceckWinningCondidtion()

                        } else {
                            setTimeout(function () {
                                coverCard(board[cardOneindex], shuffledDoubleImages[cardOneindex]);
                                coverCard(board[cardTwoindex], shuffledDoubleImages[cardTwoindex]);
                            }, 1200);
                            setTimeout(function () {
                                status = 'INITIAL';
                            }, 1300)
                        }
                    }
                }
            })
        }
    }

    function chceckWinningCondidtion() {
        let unflippedCards = document.getElementsByClassName(backImage);
        if (unflippedCards.length === 0) {
            setTimeout(function () {
                alert('Congratulations! ')
            }, 100);
            clearInterval(time)
        } else {
            status = 'INITIAL'
        }
    }

    function turnCard(card, oldclass, newclass) {
        card.classList.remove(oldclass);
        card.classList.add(newclass);
    }

    function uncoverCard(card, newclass) {
        turnCard(card, backImage, newclass)
    }


    function coverCard(card, oldclass) {
        turnCard(card, oldclass, backImage)
    }

    /* shuffling images functions */

    function shuffle(myArray) {
        for (let i = myArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
        }
        return myArray;
    }


    function createShuffledImagesBoard(myArray) {
        let boardSingleImages = [];
        let shuffleAllImages = shuffle(myArray);
        for (let i = 0; i < board.length / 2; i++) {
            boardSingleImages.push(shuffleAllImages[i])
        }
        let doubledImages = boardSingleImages.slice(0);

        for (let j = 0; j < boardSingleImages.length; j++) {
            doubledImages.push(boardSingleImages[j])
        }

        return shuffle(doubledImages);

    }

    function timer() {
        let timer = document.getElementById('timer').innerText;
        time = setInterval(countdown, 1000);

        function countdown() {
            if (timer == 0) {
                clearInterval(time);
                alert('GAME OVER')
            }
            else
                {
                    timer--;
                    document.getElementById('timer').innerHTML = timer

                }

            }


        }

};








