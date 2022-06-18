'use strict'
let gEmojis = ['😂', '😍', '🙄', '😌']


function getMemes() {
    return gSavedMemes
}

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

function cleanGMeme() {

    return gMeme = {
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
    gMeme.lines.forEach((line, idx) => {
        gMeme.lines[idx].isSelected = false
    })
    gMeme.selectedLineIdx = -1
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}



function saveMeme() {
    gMeme.img = gElCanvas.toDataURL('image/jpeg')
    gMeme.selectedLineIdx = gMeme.selectedLineIdx
    gMemes.push(JSON.parse(JSON.stringify(gMeme)))

    _saveMemesToStorage()
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const isClicked = isLineClicked(pos)
    const lines = getGMeme().lines
    if (isClicked) {
        setSelectedLine(lines.indexOf(isClicked))
        gStartPos = pos
        gIsClicked = true
        renderMeme(gCurrImg)
        markLine(gMeme.lines[gMeme.selectedLineIdx])
        document.querySelector('.canvas-container').style.cursor = 'grabbing'
    } else {
        renderMeme(gCurrImg)
    }
}

function onMove(ev) {
    if (!gIsClicked) return
    const pos = getEvPos(ev)
    const diffX = pos.x - gStartPos.x
    const diffY = pos.y - gStartPos.y
    moveLine(diffX, diffY)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    renderMeme(gCurrImg)
    gStartPos = pos
}



function onUp() {
    gIsClicked = false
    document.querySelector('.canvas-container').style.cursor = 'grab'
}

function isLineClicked(clickedPos) {
    const clickedLine = gMeme.lines.find((line) => {
        if (
            Math.sqrt((clickedPos.x - line.pos.x) ** 2 + (clickedPos.y - line.pos.y) ** 2) <= gCtx.measureText(line.txt).width / 2
        ) {
            return line
        }
    })


    return clickedLine
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop,
        }
        console.log('ev: ', ev)
    }
    return pos
}

function moveLine(diffX, diffY) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += diffX
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diffY
}

function getEmojis() {
    return gEmojis
}

function onChooseSticker(emoji) {
    createAndPushLine(emoji)
    renderMeme(gCurrImg)
}