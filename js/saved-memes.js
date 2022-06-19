'use strict'
const KEY = 'memsDB'
var gMemes = []

_loadMemesFromStorage()


function renderSaved() {
    const savedMemes = getMemes()
        // console.log('savedMemes: ', savedMemes)
    if (!savedMemes || savedMemes === null) {
        return
    }
    let strHTMLs = savedMemes.map((meme, idx) => {
        // console.log('meme: ', meme)
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
    const savedMemes = getMemes()
    var currMeme = savedMemes[idx]
    gMeme = currMeme
    var currImg = getSelectedImg(currMeme.selectedImgId)
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCurrImg = img
        initMeme(img, currMeme.selectedImgId, false)
    }
    moveToPage('editor')
}

function saveMeme() {
    gMeme.img = gElCanvas.toDataURL('image/jpeg')
    gMemes.push(JSON.parse(JSON.stringify(gMeme)))

    _saveMemesToStorage()
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