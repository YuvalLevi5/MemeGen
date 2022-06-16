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
            txt: 'Down Line',
            size: 40,
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            isSelected: false,
            fontfamily: 'impact',
        }
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

function markLine(line) {
    if (!line) return
    const lineWidth = gCtx.measureText(line.txt).width + line.size
    const lineHeight = line.size + 40
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(
        line.pos.x - lineWidth / 2 - line.size / 2,
        line.pos.y - lineHeight / 2 - line.size / 2,
        lineWidth + line.size,
        lineHeight + line.size / 2
    )
}

function resetSelectedLine() {
    gMeme.lines.forEach((_, idx) => {
        gMeme.lines[idx].isSelected = false
    })
    gMeme.selectedLineIdx = -1
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}