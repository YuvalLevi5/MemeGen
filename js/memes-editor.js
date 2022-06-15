'use strict'
let gElCanvas
let gCtx
let gStartPos

function initMeme(img) {
    setSelectedLine(0)
    createCanvas()
    resizeCanvas()
    initLinePositions()

    renderMeme(img)
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