import { createInputListener } from "./createInputListener.js"

const textArea = document.querySelector('[data-js="textArea"]')

function cleanTextAreaWithRegexQueries() {
    const paragraphsTagRegex = /<(\/|p)(\s|p)([^>]+)?>/gi
    const underlinesTagRegex = /<(\/|u)u?>/g
    const anchorsTagRegex = /<(a|\/)(a|\s)([^>]+)?>/g
    const fontsTagRegex = /<(?:font)([^>]+)>/g
    const spansTagRegex = /<(?:span)[^>]+>/g

    textArea.innerHTML = textArea.innerHTML.replace(paragraphsTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(underlinesTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(anchorsTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(fontsTagRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(spansTagRegex, '')
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
    const strongsTag = textArea.querySelectorAll('strong')

    strongsTag.forEach(strong => {
        const cleanLowerArrayText = cleanBoldTextArray(strong)

        const colorKey = guideColorsKeys.find(color => {
            return color.indexOf(cleanLowerArrayText[0]) > -1
        })

        strong.style.color = guideColors[colorKey]
    })
}

function copyFromTextAreaToCodeArea() {
    const codeArea = document.querySelector('[data-js="code"]')
    textArea.innerHTML = textArea.innerHTML.split('\n').join(' ')
    textArea.innerHTML = textArea.innerHTML.split('\n').join(' ')
    codeArea.innerHTML = textArea.innerHTML
}

function changeBoldsTagToStrongsTag() {
    textArea.innerHTML = textArea.innerHTML.replace(/b>/g, 'strong>')
}

const inputListener = createInputListener(textArea)
inputListener.subscribe(cleanTextAreaWithRegexQueries)
inputListener.subscribe(changeBoldsTagToStrongsTag)
inputListener.subscribe(setColorsOnBoldsTag)
inputListener.subscribe(copyFromTextAreaToCodeArea)

