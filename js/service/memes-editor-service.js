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
        },
        {
            pos: {
                x: 0,
                y: 0,
            },
            txt: 'Down line',
            size: 40,
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            isSelected: false,
            fontfamily: 'impact',
        },
    ],
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
    resetSelectedLine()
    gMeme.lines[idx].isSelected = true
    gMeme.selectedLineIdx = idx
}

function resetSelectedLine() {
    gMeme.lines.forEach((_, idx) => {
        gMeme.lines[idx].isSelected = false
    })
    gMeme.selectedLineIdx = -1
}

function makeLine(line) {
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = line.align
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = `${line.size}px ${line.fontfamily}`

    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}