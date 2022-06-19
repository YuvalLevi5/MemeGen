'use strict'
let gElCanvas
let gCtx
let gIsClicked = false
let gStartPos

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']




function initMeme(img, id, isFromGallery = true) {
    if (isFromGallery) {
        clean()
        document.querySelector('.text-content-edit').value = ''
        document.querySelector('.text-content-edit').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    }
    setSelectedImg(id)
    setSelectedLine(0)
    createCanvas()
    resizeCanvas()
    initLinePositions()
    renderEmojis()

    addListeners()
    renderMeme(img)
}

function renderMeme(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const memeObj = getGMeme()
    const lines = memeObj.lines
    lines.forEach((line) => makeLine(line))
    markLine(memeObj.lines[memeObj.selectedLineIdx])

}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme(gCurrImg)
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function renderEmojis() {
    const emojis = getEmojis()
    const emojisHTML = emojis.map((emoji) => {
        return `<button class="sticker" onclick="onChooseSticker('${emoji}')">${emoji}</button>`
    })
    document.querySelector('.emojis-container').innerHTML = emojisHTML.join('')
}

function onChooseSticker(emoji) {
    addLine(emoji)
    renderMeme(gCurrImg)
}

function createCanvas() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function initLinePositions() {
    const meme = getGMeme()
    meme.lines[0].pos = {
        x: gElCanvas.width / 2,
        y: 50,
    }
    meme.lines[1].pos = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height - 50,
    }
}

function onChangeLine() {
    updateSelectedLine()
    renderMeme(gCurrImg)
}

function onAddLine() {
    addLine()
    renderMeme(gCurrImg)
}


function onDeleteLine() {
    deleteLine()
    renderMeme(gCurrImg)
}

function onSetText(txt) {
    setLineText(txt)
    renderMeme(gCurrImg)
}

function onChangeTextSize(change) {
    setTextSize(change)
    renderMeme(gCurrImg)
}

function onChangeStrokeColor(val) {
    setStrokeColor(val)
    renderMeme(gCurrImg)
}

function onChangeFillColor(val) {
    setFillColor(val)
    renderMeme(gCurrImg)
}

function onChangeLinePos(val) {
    setPos(val)
    renderMeme(gCurrImg)
}

function onChangeTextAlignment(val) {
    setAlignment(val)
    renderMeme(gCurrImg)
}

function onChangeTextFont(val) {
    setFont(val)
    renderMeme(gCurrImg)
}

function onDownload(ellink) {
    resetSelectedLine()
    renderMeme(gCurrImg)
    downloadMeme(ellink)
    moveToPage('gallery')
}



function onSave() {
    resetSelectedLine()
    renderMeme(gCurrImg)
    saveMeme()
    renderSaved()
    moveToPage('saved')
}

function onShare(ellink) {
    uploadImg(ellink)
}