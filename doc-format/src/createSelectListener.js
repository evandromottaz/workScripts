export function createSelectListener(area) {
    const textArea = document.querySelector(area)

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function alertObservers(selection) {
        console.log(`Alert ${observers.length} observers`)
        observers.forEach(observer => observer(selection))
    }

    textArea.addEventListener('mouseup', handleSelect)

    function handleSelect(e) {
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

    return {
        subscribe
    }
}