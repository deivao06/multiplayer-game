export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId){
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

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId);
    });
}