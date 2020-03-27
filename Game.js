export default function createGame() {
    var state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10,
        }
    };

    function addPlayer(command){
        var playerId = command.playerId;
        var playerX = command.playerX;
        var playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command){
        var playerId = command.playerId;

        delete state.players[playerId];
    }

    function addFruit(command){
        var fruitId = command.fruitId;
        var fruitX = command.fruitX;
        var fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        var fruitId = command.fruitId;

        delete state.fruits[fruitId];
    }

    function movePlayer(command){
        var acceptedMoves = {
            ArrowUp(player) {
                if(player.y - 1 >= 0){
                    player.y -= 1;
                }
            },
            ArrowDown(player) {
                if(player.y + 1 < state.screen.height){
                    player.y += 1;
                }
            },
            ArrowRight(player) {
                if(player.x + 1 < state.screen.width){
                    player.x += 1;
                }
            },
            ArrowLeft(player) {
                if(player.x - 1 >= 0){
                    player.x -= 1;
                }
            }
        };

        var keyPressed = command.keyPressed;
        var playerId = command.playerId;
        var player = state.players[playerId];
        var moveFunction = acceptedMoves[keyPressed];

        if (player && moveFunction){
            moveFunction(player);
            checkForFruitCollision(playerId);
        }
    }

    function checkForFruitCollision(playerId) {
        var player = state.players[playerId];

        for (var fruitId in state.fruits){
            var fruit = state.fruits[fruitId];

            if (player.x === fruit.x && player.y === fruit.y){
                removeFruit({fruitId: fruitId})
            }
        }
    }

    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state
    }
}