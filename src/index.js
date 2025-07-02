/**
 * REFERENCE LINKS
 * claude generated guidelines here: https://claude.ai/chat/68d14a27-3968-4b86-be9c-43a2a3e17ea7
 * pixi example here: https://pixijs.com/8.x/examples/text/bitmap-text
 * Syntax highlight text area: https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
 * BitmapFont docs: https://pixijs.download/release/docs/text.BitmapFont.html
 */

/**
 * TODO:
 * [X] import pixi
 * [X] pixi viewport
 * [X] image upload and display
 * [X] xml upload, view
 * [ ] xml parsing
 * [ ] xml edit, save, download
 * [ ] reset pixi scene
 * [ ] get font family name from xml file
 */

/**
 * Nice to haves
 * [ ] XML syntax hightlighting
 * [ ] upload background images
  */

import { Application, Assets, Text, BitmapText, BitmapFont, Texture } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/dist/pixi.mjs'

let xmlData = undefined
let textureAtlas = undefined
let exampleText = ''

// PIXI variables
let pixiTexture

const inputs = {
    img: document.getElementById('textureAtlasInput'),
    xml: document.getElementById('xmlInput'),
    colour: document.getElementById('colourInput'),
    text: document.getElementById('textInput'),
    submit: document.getElementById('submit'),
}

const outputs = {
    xml: document.getElementById('xmlEditorTextArea'),
    textureAtlas: document.getElementById('textureAtlasOutput'),
}

const fileTypes = {
    IMG: 'image',
    XML: 'xml',
}

let app = undefined

async function startPixi() {
    app = new Application()
    console.log('App created')

    const canvas = document.getElementById('pixiContainer')

    if (!canvas) {
        console.error('No element found with ID "pixiContainer"')
        return
    }

    await app.init({
        background: inputs.colour.value,
        resizeTo: canvas,
        height: canvas.offsetHeight,
        width: canvas.offsetWidth,
    })
    console.log('App initialized')

    canvas.appendChild(app.canvas)

    app.stage.addChild(addPlaceholderText(app))
}

async function submitInputValues() {
    const imgFile = inputs.img.files[0]
    const xmlFile = inputs.xml.files[0]
    const colour = inputs.colour.value
    const previewText = inputs.text.value

    // Preview text
    exampleText = previewText

    // Clear Pixi Canvas & set background
    clearPixiCanvas(app)
    setAppBackground(colour)

    // XML text & texture atlas display
    const xmlString = await getFileData(xmlFile, fileTypes.XML)
    const img = URL.createObjectURL(imgFile)

    outputs.xml.value = xmlString
    outputs.textureAtlas.src = img

    // Load example BitmapText
    await Assets.load('src/FNTBaseBonus01a.xml')

    const bitmapFontText = new BitmapText({
        text: previewText,
        style: {
            fontFamily: 'FNTBaseBonus01a',
            fontSize: 55,
            align: 'center',
        },
    })

    app.stage.addChild(centerComponent(bitmapFontText, app))
}

function setAppBackground(colour) {
    app.renderer.background.color = colour
}

function clearPixiCanvas(app) {
    app.stage.removeChildren()
}

function addPlaceholderText(app) {
    const basicText = new Text({ text: 'Waiting for texture atlas and xml upload' })
    return centerComponent(basicText, app)
}

function centerComponent(component, app) {
    component.pivot.x = component.width / 2
    component.pivot.y = component.height / 2

    component.x = app.screen.width / 2
    component.y = app.screen.height / 2

    return component
}

async function getFileData(file, type) {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                switch (type) {
                case fileTypes.IMG:
                    textureAtlas = event.target.result
                    resolve(textureAtlas)
                    break
                case fileTypes.XML:
                    xmlData = event.target.result
                    resolve(xmlData)
                    break
                }
            }

            reader.onerror = () => reject(new Error('Failed to read file'))

            switch (type) {
            case fileTypes.IMG:
                reader.readAsDataURL(file)
                break
            case fileTypes.XML:
                reader.readAsText(file)
                break
            default:
                reject(new Error('Failed to read file'))
                break
            }
        })
    } catch (error) {
        return `Error: Unable to load ${type} file\n${error}`
    }
}

// Call the function when the page loads
window.addEventListener('load', startPixi)

// Input Events
inputs.submit.addEventListener('click', submitInputValues)
