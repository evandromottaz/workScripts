import { createInputListener } from "./createInputListener.js"

const textArea = document.querySelector('[data-js="textArea"]')

function cleanTextAreaWithRegexQueries() {
    const getParagraphsTagRegex = /<(\/|p)(\s|p)([^>]+)?>/gi
    const getUnderlinesTagRegex = /<(\/|u)u?>/g
    const anchorsTagRegex = /<(a|\/)(a|\s)([^>]+)?>/g
    const fontsFaceTagRegex = /<(?:font face)([^>]+)>/g
    const fontsColorTagRegex = /<(?:font)[^>]+>/g

    textArea.innerHTML = textArea.innerHTML.replace(getParagraphsTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(getUnderlinesTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(anchorsTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(fontsFaceTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(fontsColorTagRegex, '')
    
}



function setColorsOnBoldsTag() {
    function cleanBoldTextArray(text) {
        return text.innerText.toLowerCase().replace(/(\.)|(\!)|(\,)|(\s+\S*$)/g, '').split(" ")
    }

    const guideColors = {  
        'cliente smiles': '#FF7020', 
        'clube smiles':'#663399',
        'diamante': '#231F20' 
    }

    const guideColorsKeys = Object.keys(guideColors) 
    const boldTags = textArea.querySelectorAll('b')

    boldTags.forEach(bold => {
        const cleanLowerArrayText = cleanBoldTextArray(bold)

        const colorKey = guideColorsKeys.find(color => {
            const firstWordArray = color.split(" ")
            return firstWordArray[0].indexOf(cleanLowerArrayText[0]) > -1
        })

        bold.style.color = guideColors[colorKey]
    })
}

function copyFromTextAreaToCodeArea() {
    const codeArea = document.querySelector('[data-js="code"]')
    codeArea.innerHTML = textArea.innerHTML
}

function changeBoldsTagToStrongsTag() {
    textArea.innerHTML = textArea.innerHTML.replace(/b(\s)/g, 'strong')
}

function putBreakLinesInTheFinalCharacter() {
    textArea.innerHTML = textArea.innerHTML.replace(/(\n$)/gm, '\n<br /><br />\n')
}

const inputListener = createInputListener(textArea)
inputListener.subscribe(cleanTextAreaWithRegexQueries)
inputListener.subscribe(setColorsOnBoldsTag)
// inputListener.subscribe(putBreakLinesInTheFinalCharacter)
inputListener.subscribe(copyFromTextAreaToCodeArea)

