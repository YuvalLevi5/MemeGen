'use strict'


function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    markLine(gMeme.lines[gMeme.selectedLineIdx])
}

function updateSelectedLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.lines[gMeme.selectedLineIdx].isSelected = false
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.lines[gMeme.selectedLineIdx].isSelected = false
        gMeme.selectedLineIdx++
    }
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
}

function createAndPushLine() {
    var newLine = {
        pos: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2,
        },
        txt: 'New Line',
        size: 40,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        isSelected: true,
        fontfamily: 'impact',
    }
    gMeme.lines.push(newLine)
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
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

function setPos(val) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.lines[gMeme.selectedLineIdx].pos.y + val
}

function setAlignment(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val
}

function setFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].fontfamily = val
}