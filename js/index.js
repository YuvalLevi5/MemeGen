'use strict'

let gCurrImg
const pages = ['gallery', 'editor', 'saved', 'about']

function init() {
    renderGallery()
}


function renderGallery() {
    const images = getImages()
    let imgHTML = images.map((img) => {
        return `<img onclick="onSelectImage(${img.id})" class="gallery-image" src="./images/${img.id}.jpg">`
    })
    const elContainer = document.querySelector('.imgs-container')
    elContainer.innerHTML = imgHTML.join('')
}

function onSelectImage(id) {
    setSelectedImg(id)
    const currImg = getSelectedImg()
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCurrImg = img
        initMeme(img)
    }
    moveToPage('editor')
}

function moveToPage(targetPage) {
    pages.forEach((page) => {
        document.querySelector(`.${page}`).classList.add('hidden')
    })
    document.querySelector(`.${targetPage}`).classList.remove('hidden')
}

function onToggleMenu() {
    document.querySelector('.screen').classList.toggle('open-menu')
    document.querySelector('.navbar').classList.toggle('open-menu')
}

function onFilterImgs(val) {
    setFilterImgs(val)
    renderGallery()
}

function onFlexible() {
    var num = rand(1, 19)
    onSelectImage(num)
}