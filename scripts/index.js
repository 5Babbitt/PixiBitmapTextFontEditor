// claude generated guidelines here: https://claude.ai/chat/68d14a27-3968-4b86-be9c-43a2a3e17ea7
// pixi example here: https://pixijs.com/8.x/examples/text/bitmap-text

/**
 * TODO:
 * [X] import pixi
 * [X] pixi viewport
 * [ ] image upload and display
 * [ ] xml upload, parse, view
 * [ ] xml edit, save, download
 */

/**
 * Nice to haves
 * [ ] upload background images
  */

import {Application, Text} from 'https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/dist/pixi.mjs'

let xmlData = undefined
let textureAtlas = undefined
let exampleText = ''

const inputs = {
    img: document.getElementById('textureAtlasInput'),
    xml: document.getElementById('xmlInput'),
    colour: document.getElementById('colourInput'),
    text: document.getElementById('textInput'),
    submit: document.getElementById('submit')
}

const outputs = {
    xml: document.getElementById('xmlTextArea'),
    textureAtlas: document.getElementById('textureAtlasOutput')
}

let app = undefined

async function startPixi() {
    app = new Application()
    console.log('App created')

    const canvas = document.getElementById('pixiContainer')

    if (!canvas) {
        console.error('No element found with ID "pixiCanvas"')
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

    console.log(inputs.img.file)
    app.stage.addChild(addPlaceholderText(app))
}

// TODO: parse XML
function submitInputValues() {
    const imgFile = inputs.img.files[0]
    const xmlFile = inputs.xml.files[0]
    const colour = inputs.colour.value

    exampleText = inputs.text.value

    app.renderer.background.color = colour
}

function addPlaceholderText(app) {
    const basicText = new Text({ text: 'Waiting for texture atlas and xml upload' })
    return centerComponent(basicText, app)
}

function centerComponent (component, app) {
    component.pivot.x = component.width / 2
    component.pivot.y = component.height / 2

    component.x = app.screen.width / 2
    component.y = app.screen.height / 2

    return component
}

// Call the function when the page loads
await window.addEventListener('load', startPixi)

// Input Events
inputs.submit.addEventListener('click', submitInputValues)
