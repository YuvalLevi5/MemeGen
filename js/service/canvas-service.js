'use strict'

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function updateSelectedLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.lines[gMeme.selectedLineIdx].isSelected = false
        gMeme.selectedLineIdx = 0
        gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    } else {
        gMeme.lines[gMeme.selectedLineIdx].isSelected = false
        gMeme.selectedLineIdx++
            gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    }
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