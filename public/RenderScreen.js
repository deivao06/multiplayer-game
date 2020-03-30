export default function renderScreen(screen, scoreBoard, game, requestAnimationFrame, currentPlayerId){
    var context = screen.getContext('2d');
    context.clearRect(0, 0, screen.width, screen.height);

    for(var fruitId in game.state.fruits){
        var fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    for(var playerId in game.state.players){
        var player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1)
    }

    var currentPlayer = game.state.players[currentPlayerId];

    if (currentPlayer) {
        context.fillStyle = "#F0D84F";
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
    }

    updateScoreBoard(scoreBoard, game, currentPlayerId);

    requestAnimationFrame(() => {
        renderScreen(screen, scoreBoard, game, requestAnimationFrame, currentPlayerId);
    });
}

function updateScoreBoard(scoreTable, game, currentPlayerId) {
    const maxResults = 10;

    let scoreTableInnerHTML = `
        <tr class="header">
            <td>Top 10 Jogadores</td>
            <td>Pontos</td>
        </tr>
    `;

    const playersArray = [];

    for (var socketId in game.state.players) {
        const player = game.state.players[socketId];
        playersArray.push({
            playerId: socketId,
            x: player.x,
            y: player.y,
            score: player.score,
        })
    }

    const playersSortedByScore = playersArray.sort( (first, second) => {
        if (first.score < second.score) {
            return 1
        }

        if (first.score > second.score) {
            return -1
        }

        return 0
    });

    const topScorePlayers = playersSortedByScore.slice(0, maxResults);

    scoreTableInnerHTML = topScorePlayers.reduce((stringFormed, player) => {
        return stringFormed + `
            <tr ${player.playerId === currentPlayerId ? 'class="current-player"' : ''}>
                <td class="socket-id">${player.playerId}</td>
                <td class="score-value">${player.score}</td>
            </tr>
        `
    }, scoreTableInnerHTML);
    
    scoreTable.innerHTML = scoreTableInnerHTML;
}