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
 * [X] import pixi
 * [X] pixi viewport
 * [X] image upload and display
 * [X] xml upload, view
 * [X] Load and display bitmapText
 * [X] Load and display on GithubPages
 * [ ] xml parsing
 * [ ] use uploaded text and img to make bitmap font
 * [ ] xml edit, save, download
 * [ ] reset pixi scene
 * [ ] get font family name from xml file
 *
 */

import {Application, Assets, BitmapFont, BitmapText, Texture} from 'pixi.js'

let app
let xmlData
let textureAtlas

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

const canvas = document.getElementById('pixiContainer')

async function startPixi () {
	app = new Application({
		background: inputs.colour.value,
		resizeTo: canvas,
		height: canvas.offsetHeight,
		width: canvas.offsetWidth,
	})

	canvas.appendChild(app.view)
}

async function submitInputValues() {
    const imgFile = inputs.img.files[0]
    const xmlFile = inputs.xml.files[0]
    const colour = inputs.colour.value
    const previewText = inputs.text.value

	const imgURL = URL.createObjectURL(imgFile)
	xmlData = await getXMLText(xmlFile)

	const imgTexture = Texture.from(imgURL)

    outputs.textureAtlas.src = imgURL
	outputs.xml.value = xmlData

	clearPixiCanvas()

	setBackgroundColour(colour)
	await addBitmapText(previewText, xmlData, imgTexture)

	URL.revokeObjectURL(imgURL)
}

function updateBitmapText () {

}

function updateXMLData () {
	xmlData = outputs.xml.value
}

// Component Helpers
function centerComponent (component) {
	component.pivot.x = component.width / 2
	component.pivot.y = component.height / 2

	component.x = app.screen.width / 2
	component.y = app.screen.height / 2

	return component
}

async function addBitmapText (text, xml, img) {
	// Create Bitmap Font
	// await createPlaceholderBitmapText(text)
	const bitmapFont = BitmapFont.from('Uploaded Font', xml, img)

	const bitmapFontText = new BitmapText(text, {
		fontName: 'Uploaded Font',
		fontStyle: 36
	})

	app.stage.addChild(centerComponent(bitmapFontText))
}

async function createPlaceholderBitmapText (text){
	await Assets.load('./assets/FNTBaseBonus01a.xml').then(() => {
		const bitmapFontText = new BitmapText(text, {
			fontName: 'FNTBaseBonus01a',
			fontSize: 36,
			align: 'center',
		})

		app.stage.addChild(centerComponent(bitmapFontText))
	})
}

function createBitmapFont (xml, img) {

}

function clearPixiCanvas () {
    app.stage.removeChildren()
}

function setBackgroundColour (colour) {
    app.renderer.background.color = colour
}

async function getXMLText(file) {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                resolve(event.target.result)
            }

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
