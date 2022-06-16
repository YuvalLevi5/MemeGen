'use strict'
let gElCanvas
let gCtx

function initMeme(img) {
    setSelectedLine(0)
    createCanvas()
    resizeCanvas()
    initLinePositions()

    addListeners()
    renderMeme(img)
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme(gCurrImg)
    })
}

function createCanvas() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const memeObj = getGMeme()
    const lines = memeObj.lines
    lines.forEach((line) => makeLine(line))
    markLine(memeObj.lines[memeObj.selectedLineIdx])
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