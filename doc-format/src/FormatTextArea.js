import { createInputListener } from "./createInputListener.js"

const textArea = document.querySelector('[data-js="textArea"]')

export function FormatTextArea(innerHTMLTextArea) {
    const codeArea = document.querySelector('[data-js="code"]')
    const getFaceStyleTagRegex = /\s*?<font\s((?:face)?(?:style)?)="\w+[-\s]\w+[:,]\s\w+">/g
    const getParagraphTagRegex = /<p\s.+>\n\s+/g
    const getEmptyParagraphRegex = /<\p><\/p>?/g
    const getBoldTagRegex = /(?:b>)/g

    

    const paragraphs = textArea.querySelectorAll('p')
    paragraphs.forEach(paragraph => {
        paragraph.innerHTML = paragraph.innerHTML.replace(getFaceStyleTagRegex, '')
        paragraph.innerHTML = paragraph.innerHTML.replace(getBoldTagRegex, 'strong>')

        const fontsTags = paragraph.querySelectorAll('font')

        if(!fontsTags.length) return;

        fontsTags.forEach(font => {
            if(!font.innerText) return font.remove()
            
            const strongs = font.querySelectorAll('strong')
            strongs.forEach(strong => {
                const lowerCleanWord = strong.innerText.toLowerCase().replace(/.|,|\s/g,'')
                const guideColorsIndex = Object.keys(guideColors)

                const index = guideColorsIndex.findIndex((item) => item.indexOf(lowerCleanWord) > -1)
                const indexObj = guideColorsIndex[index]
                strong.style.color = guideColors[indexObj]
            })
        })

    })

    textArea.innerHTML = textArea.innerHTML.replace(getParagraphTagRegex, '')
    const lastP = textArea.querySelector('p:last-child')
    lastP?.remove()
    textArea.innerHTML = textArea.innerHTML.replace(getEmptyParagraphRegex, '<br /><br />')
    
    textArea.innerHTML = textArea.innerHTML.replace(/<(\/|f)f?ont>?(\s?\w+="#[\w\d]+")?>/g,'')
    textArea.innerHTML = textArea.innerHTML.replace(/\s+/g,' ')
    textArea.innerHTML = textArea.innerHTML.replace(/(?:<br><br>)/g,'\n<br><br>\n\n')
    textArea.innerHTML = textArea.innerHTML.replace(/(^\s)/gm,'\n')

    const uTags = textArea.querySelectorAll('u')
    uTags.forEach(uTag => textArea.innerHTML = textArea.innerHTML.replace(uTag.outerHTML, uTag.innerText))

    codeArea.innerHTML = textArea.innerHTML

    textArea.addEventListener('input', () => {  
        textArea.innerHTML = textArea.innerHTML.replace(getParagraphTagRegex, '')
        textArea.innerHTML = textArea.innerHTML.replace(getEmptyParagraphRegex, '\n<br /><br />')
        codeArea.innerHTML = textArea.innerHTML
    })

}

function cleanTextAreaWithRegexQueries() {
    const getParagraphsTagsRegex = /<(\/|p)(\s|p)([^>]+)?>/gi
    const getUnderlinesTagsRegex = /<(\/|u)u?>/g
    const anchorsTagsRegex = /<(a|\/)(a|\s)([^>]+)?>/g
    const fontsFacesTagsRegex = /<(?:font face)([^>]+)>/g
    const fontColorTagRegex = /<(?:font)[^>]+>/g

    textArea.innerHTML = textArea.innerHTML.replace(getParagraphsTagsRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(getUnderlinesTagsRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(anchorsTagsRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(fontsFacesTagsRegex, '')
    textArea.innerHTML = textArea.innerHTML.replace(fontColorTagRegex, '')
    textArea.innerHTML.trim('')
}

function replaceFontTagsToStrongTags() {
    const fontTagRegex = /(?:font)>/g
    // textArea.innerHTML = textArea.innerHTML.replace(fontTagRegex, 'strong>')
}

const guideColors = { 'clube smiles':'#663399', 'cliente smiles': '#FF7020', 'cliente diamante': '#231F20' }

export function formatterTextArea() {
    const codeArea = document.querySelector('[data-js="code"]')

    cleanTextAreaWithRegexQueries()

    const guideColorsKeys = Object.keys(guideColors) 
    const boldTags = textArea.querySelectorAll('b')
    boldTags.forEach(bold => {
        const cleanLowerBold = bold.innerText.toLowerCase().replace(/.|,|\s/g,'')
        const colorKey = guideColorsKeys.find(color => color.indexOf(cleanLowerBold) > -1)
        bold.style.color = guideColors[colorKey]
    })

    codeArea.innerHTML = textArea.innerHTML
}

const inputListener = createInputListener(textArea)
inputListener.subscribe(formatterTextArea)