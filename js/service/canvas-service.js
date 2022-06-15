'use strict'

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setTextSize(val) {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 10 && val < 0) return
    gMeme.lines[gMeme.selectedLineIdx].size = gMeme.lines[gMeme.selectedLineIdx].size + val
}

function setStrokeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = val
}

function setFillColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = val
}