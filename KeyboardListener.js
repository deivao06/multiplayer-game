export default function createKeyboardListener(document) {
    var state = {
        observers: []
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log(`keyboardListener -> Notifying ${state.observers.length} observers`);

        for (var observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(event){
        var keyPressed = event.key;

        var command = {
            playerId : 'player1',
            keyPressed: keyPressed,
        };

        notifyAll(command)
    }

    return {
        subscribe
    }
}