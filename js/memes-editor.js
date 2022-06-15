'use strict'
let gElCanvas
let gCtx
let gStartPos

function initMeme(img) {
    // resetSelectedLine()
    setSelectedLine(0)
    createCanvas()
    resizeCanvas()
    initLinePositions()

    // addListeners()
    renderMeme(img)
        // renderStickers()
}

function renderMeme(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const memeObj = getGMeme()
    const lines = memeObj.lines
    lines.forEach((line) => makeLine(line))
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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
        // Resizes the canvas and renders it as window size changes
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

function onSetText(txt) {
    setLineText(txt)
    renderMeme(gCurrImg)
}

function onSwitchLine() {
    updateSelectedLine()
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