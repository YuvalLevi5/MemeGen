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
    if (gMeme.lines[gMeme.selectedLineIdx].txt === 'Up Line' || gMeme.lines[gMeme.selectedLineIdx].txt === 'Down Line') {
        document.querySelector('.text-content-edit').value = ''
    } else {
        document.querySelector('.text-content-edit').value = gMeme.lines[gMeme.selectedLineIdx].txt
    }
    document.querySelector('.text-content-edit').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
}

function addLine(txt = 'New Line') {
    var newLine = {
        pos: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2,
        },
        txt,
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
    if (gMeme.lines[gMeme.selectedLineIdx].size === 20 && val < 0 || gMeme.lines[gMeme.selectedLineIdx].size === 60 && val > 0) return
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
    markLine(gMeme.lines[gMeme.selectedLineIdx])
}

function setFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].fontfamily = val
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
        )
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.text())
        .then((url) => {
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}