const player = (name, marker) => {
    const getName = () => { return name };
    const getMarker = () => { return marker };
    return { getName, getMarker };
}

const gameControl = (() => {
    const markerHolders = document.getElementsByClassName("markerHolder");
    const renderBoard = (board) => {
        for (let i = 0; i < markerHolders.length; i++) {
            markerHolders[i].textContent = board[i];
        }

    }

    const addMarkerToBoard = (el, player, board) => {
        let table = document.querySelector('table');
        if (el.classList.contains("markerHolder")) {
            board[el.getAttribute('id')] = player.getMarker();
            renderBoard(board);
        }

    }
    const checkWinner = (player, board) => {
        let win = false;
        if (
            (board[0] === player.getMarker() && board[1] === player.getMarker() && board[2] === player.getMarker()) ||
            (board[0] === player.getMarker() && board[3] === player.getMarker() && board[6] === player.getMarker()) ||
            (board[0] === player.getMarker() && board[4] === player.getMarker() && board[8] === player.getMarker()) ||
            (board[1] === player.getMarker() && board[4] === player.getMarker() && board[7] === player.getMarker()) ||
            (board[2] === player.getMarker() && board[5] === player.getMarker() && board[8] === player.getMarker()) ||
            (board[2] === player.getMarker() && board[4] === player.getMarker() && board[6] === player.getMarker()) ||
            (board[3] === player.getMarker() && board[4] === player.getMarker() && board[5] === player.getMarker()) ||
            (board[6] === player.getMarker() && board[7] === player.getMarker() && board[8] === player.getMarker())

        ) {
            win = true;
        } else {
            win = false;
        }
        return win;
    }

    const checkDraw = (player, board) => {
        let draw = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== " ") {
                draw++;
            }
        }

        if (draw === 9) {
            return true;
        }
        // console.log(player.getName());
        return false;
    }

    const endGame = (player, board) => {
        let endGameCon = document.querySelector('.js-game-end');
        if (checkWinner(player, board)) {
            endGameCon.textContent = `${player.getName()} Wins the game`;
        }
        else if (checkDraw(player, board)) {
            endGameCon.textContent = 'The game is a draw';
        }
        else {
            endGameCon.textContent = ' ';
        }

    }

    const resetBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            board[i] = " ";
        }
        renderBoard(board);
    }

    const showPlayerToPlay = (player, showPlayerCon) => {
        showPlayerCon.textContent = `Play ${player.getName()}`;
    }

    return { renderBoard, addMarkerToBoard, endGame, resetBoard, showPlayerToPlay };

})()


const gameBoard = (() => {
    let gamBoardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let currentPlayer = ' ';
    let showCurrentPlayer = document.querySelector(".js-current-player");
    let playerX;
    let playerO;

    document.getElementById("js-play-btn").addEventListener("click", (e) => {
        document.querySelector('.js-game-end').textContent = ' ';
        let playContainer = document.querySelector(".play-container");
        let player1 = document.getElementById("js-player1-name").value;
        let player2 = document.getElementById("js-player2-name").value;

        if (player1 === "" && player2 === "") {

            playerX = player("player1", 'X');
            playerO = player("player2", 'O');

        } else {

            playerX = player(player1, 'X');
            playerO = player(player2, 'O');

        }

        playContainer.style.height = "0";
        playContainer.style.top = "-2000px";


        gameControl.renderBoard(gamBoardArray);
        currentPlayer = playerX;
        gameControl.showPlayerToPlay(currentPlayer, showCurrentPlayer);

        document.querySelector('table').addEventListener('click', function play(e) {
            let endGameCon = document.querySelector('.js-game-end');

            if (e.target.textContent !== " " || endGameCon.textContent !== ' ') {
                e.target.removeEventListener('click', play);
            }
            else if (currentPlayer === playerX) {
                gameControl.addMarkerToBoard(e.target, currentPlayer, gamBoardArray);
                gameControl.endGame(currentPlayer, gamBoardArray);
                currentPlayer = playerO;
                gameControl.showPlayerToPlay(currentPlayer, showCurrentPlayer);
            } else if (currentPlayer === playerO) {
                gameControl.addMarkerToBoard(e.target, currentPlayer, gamBoardArray);
                gameControl.endGame(currentPlayer, gamBoardArray);
                currentPlayer = playerX;
                gameControl.showPlayerToPlay(currentPlayer, showCurrentPlayer);
            }

        });

        document.getElementById("new-game").addEventListener("click", () => {
            playContainer.style.height = "100vh";
            playContainer.style.top = "8em";
            gameControl.resetBoard(gamBoardArray);
        });

        document.getElementById("restart-game").addEventListener("click", () => {
            gameControl.resetBoard(gamBoardArray);
            document.querySelector('.js-game-end').textContent = ' ';
            currentPlayer = playerX;
            gameControl.showPlayerToPlay(currentPlayer, showCurrentPlayer);
        });


    });  



    // return { currentPlayer };
})()