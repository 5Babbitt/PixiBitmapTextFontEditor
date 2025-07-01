/**
 * [ ] Load and display bitmapText
 */

import { Application, Assets, BitmapText } from "pixi.js"

(async () => {
  	const canvas = document.getElementById('pixiContainer')
  	const app = new Application({
		background: '#1099bb',
		resizeTo: canvas,
		height: canvas.offsetHeight,
		width: canvas.offsetWidth,
  	})

  	canvas.appendChild(app.view)

	await Assets.load('/FNTBaseBonus01a.xml').then(() => {
		const bitmapFontText = new BitmapText('0123', {
			fontName: 'FNTBaseBonus01a',
			fontSize: 55,
			align: "center"
		})

  		bitmapFontText.x = 50;
  		bitmapFontText.y = 200;

		app.stage.addChild(bitmapFontText)
	})

}) ()