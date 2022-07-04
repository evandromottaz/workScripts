export function createSelectListener(area) {
    const textArea = document.querySelector(area)
    textArea.addEventListener('mouseup', handleSelect)

    function handleSelect() {
        const selectedText = getSelectText()
        alertObservers(selectedText)
    }

    function getSelectText() {
        if(window.getSelection) {
            return window.getSelection().toString();
        } else if(document.selection) {
            return document.selection.createRange().text
        }

        return '';
    }

    function alertObservers(selection) {
        console.log(`Alert ${observers.length} observers`)
        observers.forEach(observer => observer(selection))
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    return {
        subscribe
    }
}