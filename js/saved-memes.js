'use strict'
const KEY = 'memsDB'
var gMemes = []

_loadMemesFromStorage()


function renderSaved() {
    const savedMemes = getMemes()
    if (!savedMemes || savedMemes === null) {
        return
    }
    let strHTMLs = savedMemes.map((meme, idx) => {
        let img = new Image()
        img.src = meme.img
        return `
            <div class="saved-img-container" onclick="onSelectSaveMeme(${idx})">
            <img class="gallery-image" src="${img.src}" alt="" />
            </div>
            `
    })
    document.querySelector('.saved .imgs-container').innerHTML = strHTMLs.join('')
}

function onSelectSaveMeme(idx) {
    const currMeme = gMemes[idx]
    const img = new Image()
    img.src = currMeme.img
    img.onload = () => {
        gCurrImg = img
        initMeme(img)
    }
    moveToPage('editor')

}

function getMemes() {
    return gMemes
}


function _loadMemesFromStorage() {
    gMemes = loadFromStorage(KEY)

    if (!gMemes) gMemes = []

}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemes)

}