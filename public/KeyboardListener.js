export default function createKeyboardListener(document) {
    var state = {
        observers: [],
        playerId: null,
    };

    function registerPlayerId(playerId){
        state.playerId = playerId;
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (var observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(event){
        var keyPressed = event.key;

        var command = {
            type: 'move-player',
            playerId : state.playerId,
            keyPressed: keyPressed,
        };

        notifyAll(command)
    }

    return {
        registerPlayerId,
        subscribe
    }
}