import { createSelectListener } from "./createSelectListener.js"


export function FormatTextArea() {
    const textArea = document.querySelector('[data-js="textArea"]')
    const codeArea = document.querySelector('[data-js="code"]')

    const getParagraphTagRegex = /<p\s.+>\n\s+/g
    const getEmptyParagraph = /<\p><\/p>?/g
    const getFaceStyleTagRegex = /\s*?<font\s((?:face)?(?:style)?)="\w+[-\s]\w+[:,]\s\w+">/g
    const getFontColorBlack = /<(\/|f)f?ont[\s\>](?:color="#000000">)/g
    const getBoldTagRegex = /(?:b>)/g

    const guideColors = { 'clube smiles':'#663399', 'cliente smiles': '#FF7020', 'cliente diamante': '#231F20' }

    const paragraphs = textArea.querySelectorAll('p')
    paragraphs.forEach(paragraph => {
        paragraph.innerHTML = paragraph.innerHTML.replace(getFaceStyleTagRegex, '')
        paragraph.innerHTML = paragraph.innerHTML.replace(getFontColorBlack, '')
        paragraph.innerHTML = paragraph.innerHTML.replace(getBoldTagRegex, 'strong>')

        const fonts = paragraph.querySelectorAll('font')

        if(!fonts.length) return;

        fonts.forEach(font => {
            if(!font.innerText) return font.remove()
            
            const strongs = font.querySelectorAll('strong')
            strongs.forEach(strong => {
                const lowerCleanWord = strong.innerText.toLowerCase()

                const guideColorsIndex = Object.keys(guideColors)
                
                const index = guideColorsIndex.findIndex((item) => item === lowerCleanWord)

                const indexObj = guideColorsIndex[index]

                strong.style.color = guideColors[indexObj]
                
                
            })
        })

    })

    textArea.innerHTML = textArea.innerHTML.replace(getParagraphTagRegex, '')
    const lastP = textArea.querySelector('p:last-child')
    lastP.remove()
    textArea.innerHTML = textArea.innerHTML.replace(getEmptyParagraph, '<br /><br />')
    
    textArea.innerHTML = textArea.innerHTML.replace(/<(\/|f)f?ont>?(\s?\w+="#[\w\d]+")?>/g,'')
    textArea.innerHTML = textArea.innerHTML.replace(/\s+/g,' ')
    textArea.innerHTML = textArea.innerHTML.replace(/(?:<br><br>)/g,'\n<br><br>\n\n')
    textArea.innerHTML = textArea.innerHTML.replace(/(^\s)/gm,'\n')

    const uTags = textArea.querySelectorAll('u')
    uTags.forEach(uTag => textArea.innerHTML = textArea.innerHTML.replace(uTag.outerHTML, uTag.innerText))

    codeArea.innerHTML = textArea.innerHTML

    textArea.addEventListener('input', () => {  
        textArea.innerHTML = textArea.innerHTML.replace(getParagraphTagRegex, '')
        textArea.innerHTML = textArea.innerHTML.replace(getEmptyParagraph, '\n<br /><br />')
        codeArea.innerHTML = textArea.innerHTML
    })

    

    
    
}

    function controlPainel(select) {
        console.log(select)
    }

    const selectionListener = createSelectListener('[data-js="textArea"]')
    selectionListener.subscribe(controlPainel)

// FormatTextArea()