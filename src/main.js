/**
 * REF LINKS:
 * PIXI v7:
 * https://pixijs.com/7.x/examples/text/bitmap-text
 * https://pixijs.download/v7.x/docs/PIXI.BitmapText.html
 * https://pixijs.download/v7.x/docs/PIXI.BitmapFont.html
 *
 * Vite:
 * https://vite.dev/guide/static-deploy#github-pages
 *
 * TODO:
 * [X] import pixi
 * [X] pixi viewport
 * [X] image upload and display
 * [X] xml upload, view
 * [X] Load and display bitmapText
 * [X] Load and display on GithubPages
 * [X] xml parsing
 * [X] use uploaded text and img to make bitmap font
 * [X] reset pixi scene
 * [X] get font family name from xml file
 * [X] xml edit
 * [ ] xml save
 * [ ] xml export
 *
 * Nice to haves
 * [ ] Text Counter
 * [ ] XML syntax hightlighting
 * [ ] upload background images
 */

import { Application, BitmapFont, BitmapText, Texture } from 'pixi.js'

let app
let xmlData
let imgURL

const inputs = {
    img: document.getElementById('textureAtlasInput'),
    xml: document.getElementById('xmlInput'),
    colour: document.getElementById('colourInput'),
    text: document.getElementById('textInput'),
    submit: document.getElementById('submit'),
    update: document.getElementById('update'),
}

const outputs = {
    xml: document.getElementById('xmlEditorTextArea'),
    textureAtlas: document.getElementById('textureAtlasOutput'),
}

const canvas = document.getElementById('pixiContainer')

async function startPixi() {
    app = new Application({
        background: inputs.colour.value,
        resizeTo: canvas,
        height: canvas.offsetHeight,
        width: canvas.offsetWidth,
    })

    canvas.appendChild(app.view)
}

async function submitInputValues() {
    // Upload Image
    const imgFile = inputs.img.files[0]
    imgURL = URL.createObjectURL(imgFile)
    outputs.textureAtlas.src = imgURL

    // Upload XML
    const xmlFile = inputs.xml.files[0]
    outputs.xml.value = await getXMLText(xmlFile)

    await updateBitmapText()
}

async function updateBitmapText() {
    updateXMLData()
    clearPixiCanvas()
    setBackgroundColour(inputs.colour.value)

    const bitmapFont = await loadBitmapFont(parseXMLObject(xmlData),  await Texture.fromURL(imgURL))
    await addBitmapText(inputs.text.value, bitmapFont)
}

function updateXMLData() {
    xmlData = outputs.xml.value
}

// Component Helpers
function centerComponent(component) {
    component.pivot.x = component.width / 2
    component.pivot.y = component.height / 2
    component.x = app.screen.width / 2
    component.y = app.screen.height / 2

    return component
}

async function addBitmapText(text, bitmapFont) {
    // Create Bitmap Font
    const bitmapFontText = new BitmapText(text, {
        fontName: bitmapFont,
        align: 'center',
    })

    app.stage.addChild(centerComponent(bitmapFontText))
}

async function loadBitmapFont(xmlDoc, imageTexture) {
    const fontName = xmlDoc.querySelector('info').getAttribute('face')

    BitmapFont.install(xmlDoc, imageTexture, true)
    const availableFonts = BitmapFont.available

    console.log({ fontName, availableFonts })
    return fontName
}

function clearPixiCanvas() {
    app.stage.removeChildren()
}

function setBackgroundColour(colour) {
    app.renderer.background.color = colour
}

function parseXMLObject(xmlContent) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml')

    return xmlDoc
}

async function getXMLText(file) {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => resolve(event.target.result)
            reader.onerror = () => reject(new Error('Failed to read file'))
            reader.readAsText(file)
        })
    } catch (error) {
        return `Error: Unable to load xml file\n${error}`
    }
}

(async () => {
    await startPixi()
}) ()

// Input Events
inputs.submit.addEventListener('click', submitInputValues)
inputs.update.addEventListener('click', updateBitmapText)
