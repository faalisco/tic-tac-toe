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
        // return board;
    }

    const addMarkerToBoard = (el, player, board) => {
        let table = document.querySelector('table');
        if (el.classList.contains("markerHolder")) {
            board[el.getAttribute('id')] = player.getMarker();
            renderBoard(board);
        }

    }

    // const winner = (player, board) => {
    //     if (board[0] === player.getMarker() && board[1] === player.getMarker() && board[2] === player.getMarker()) {
    //         console.log(`the winner is: ${player.getName()}.`)
    //         return true;
    //     }

    // }

    return { renderBoard, addMarkerToBoard };

})()





let currentPlayer = ' ';
const gameBoard = (() => {
    let gamBoardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    let playerX = player("tara", 'X');
    let playerO = player("tago", 'O');
    gameControl.renderBoard(gamBoardArray);
    currentPlayer = playerX;

    document.querySelector('table').addEventListener('click', function play(e) {
        if (e.target.textContent !== " ") {
            e.target.removeEventListener('click', play);
        }
        else if (currentPlayer === playerX) {
            gameControl.addMarkerToBoard(e.target, currentPlayer, gamBoardArray);
            currentPlayer = playerO;
        } else if (currentPlayer === playerO) {
            gameControl.addMarkerToBoard(e.target, currentPlayer, gamBoardArray, play);
            currentPlayer = playerX;
        }

    });

    return { currentPlayer };
})()