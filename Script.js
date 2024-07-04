const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

const board = Chessboard(boardElement, {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    onDrop: handleMove
});

const game = new Chess();

function handleMove(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) {
        return 'snapback';
    }

    updateStatus();

    window.setTimeout(makeRandomMove, 250);
}

function makeRandomMove() {
    const possibleMoves = game.moves();

    if (game.game_over()) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());
    updateStatus();
}

function updateStatus() {
    const status = game.in_checkmate() ? 'Checkmate!' :
        game.in_draw() ? 'Draw!' :
        game.in_check() ? 'Check!' :
        `${game.turn() === 'w' ? 'White' : 'Black'} to move`;

    statusElement.innerHTML = status;
}

updateStatus();
