'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        pos: {
            x: 0,
            y: 0,
        },
        txt: 'Up Line',
        size: 40,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        isSelected: true,
        fontfamily: 'impact',
    }],
}

function getGMeme() {
    return gMeme
}

function setSelectedImg(id) {
    gMeme.selectedImgId = id
}

function getSelectedImg() {
    const imgs = getImages()
    return imgs.find((img) => img.id === gMeme.selectedImgId)
}

function setSelectedLine(idx) {
    gMeme.lines[idx].isSelected = true
    gMeme.selectedLineIdx = idx
}

function makeLine(line) {
    gCtx.textAlign = line.align
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = `${line.size}px ${line.fontfamily}`

    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}