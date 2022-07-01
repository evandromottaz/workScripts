export function FormatTextArea() {
    const textArea = document.querySelector('[data-js="textarea"]')
    const codeArea = document.querySelector('[data-js="code"]')

    const getParagraphTagRegex = /<p\s.+>\n\s+/g
    const getEmptyParagraph = /<\p><\/p>?/g
    const getFaceStyleTagRegex = /\s*?<font\s((?:face)?(?:style)?)="\w+[-\s]\w+[:,]\s\w+">/g
    const getFontColorBlack = /<(\/|f)f?ont[\s\>](?:color="#000000">)/g
    const getBoldTagRegex = /(?:b>)/g
    const getBreakLinesAndSpacesRegex = /\n\s+/g

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
    

    function RAMPAGE(paragraph) {
        const strongs = paragraph.querySelectorAll('strong')

        strongs.forEach(strong => {
            function isGuideColor(color) {
                return strong.innerText.indexOf(color) > -1
            }

            if(isGuideColor('Clube')) {
                strong.style.color = guideColors.clube
            } else if (isGuideColor('Smiles')) {
                strong.style.color = guideColors.geral
            } else if(isGuideColor('Smiles')) {
                strong.style.color = guideColors.diamante
            }
        })
    }

    textArea.addEventListener('input', () => {  
        log('digitando')  
        

        textArea.innerHTML = textArea.innerHTML.replace(getParagraphTagRegex, '')
        textArea.innerHTML = textArea.innerHTML.replace(getEmptyParagraph, '\n<br /><br />')
        codeArea.innerHTML = textArea.innerHTML
    })

    function handleEvents(arrayTextValue) {
        textArea.addEventListener('select', ({target}) => {
            const indexStart = target?.selectionStart
            const indexEnd = target?.selectionEnd - 1

            textArea.innerHTML = textArea.innerHTML.split('').reduce((acc, letter, index)=> {
                if(index === indexStart) {
                    letter = `<strong>${letter}`
                } else if(index === indexEnd) {
                    letter = `${letter}</strong>`
                }
                return acc + letter
            },'')
        })
    }
}

FormatTextArea()