export function createInputListener(textArea) {
    const observers= []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    textArea.addEventListener('input', handleTextEnter)

    function handleTextEnter({target}) {
        console.log(`alert ${observers.length} observers`)

        alertObservers(target.innerHTML)
    }

    function alertObservers(innerHTML) {
        observers.forEach(observer => observer(innerHTML))
    }

    return {
        subscribe
    }
}