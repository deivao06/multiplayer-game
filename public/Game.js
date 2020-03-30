export default function createGame() {
    var state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10,
        }
    };

    var observers = [];

    function start() {
        var frequency = 2000;

        setInterval(addFruit, frequency);
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (var observerFunction of observers) {
            observerFunction(command);
        }
    }

    function addPlayer(command){
        var playerId = command.playerId;
        var playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        var playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
        var playerScore = 0;

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            score: playerScore
        };

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            playerScore: playerScore
        })
    }

    function removePlayer(command){
        var playerId = command.playerId;

        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function addFruit(command){
        var fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
        var fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        var fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function removeFruit(command) {
        var fruitId = command.fruitId;

        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        });
    }

    function movePlayer(command){
        notifyAll(command);

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
                removeFruit({fruitId: fruitId});
                player.score ++;
            }
        }
    }

    function setState(newState){
        Object.assign(state, newState);
    }

    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        setState,
        subscribe,
        start,
        state
    }
}