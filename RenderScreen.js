export default function renderScreen(screen, game, requestAnimationFrame){
    var context = screen.getContext('2d');
    context.clearRect(0, 0, screen.width, screen.height);

    for(const fruitId in game.state.fruits){
        var fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    for(const playerId in game.state.players){
        var player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame);
    });
}