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

async function startPixi() {
    const app = new Application()
    console.log('App created')

    const canvas = document.getElementById('pixiContainer')

    if (!canvas) {
        console.error('No element found with ID "pixiCanvas"')
        return
    }

    await app.init({
        background: getBGColour(),
        resizeTo: canvas,
        height: canvas.offsetHeight,
        width: canvas.offsetWidth,
    })
    console.log('App initialized')

    canvas.appendChild(app.canvas)

    app.stage.addChild(addBasicText(app))
}

function submitData () {

}

function addBasicText(app) {
    const basicText = new Text({ text: 'Waiting for texture atlas and xml upload' })
    return centerComponent(basicText, app);
}

function centerComponent (component, app) {
    component.pivot.x = component.width / 2
    component.pivot.y = component.height / 2

    component.x = app.screen.width / 2
    component.y = app.screen.height / 2

    return component
}

function getBGColour () {
    return document.getElementById('colorInput').value
}

// Call the function when the page loads
await window.addEventListener('load', startPixi);
