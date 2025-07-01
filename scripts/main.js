/* eslint-disable no-undef */
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

	await Assets.load('/assets/FNTBaseBonus01a.xml').then(() => {
		const bitmapFontText = new BitmapText('0123456789,.', {
			fontName: 'FNTBaseBonus01a',
			fontSize: 36,
			align: "center"
		})
		
		bitmapFontText.pivot.x = bitmapFontText.width / 2
		bitmapFontText.pivot.y = bitmapFontText.height / 2

  		bitmapFontText.x = app.screen.width / 2
  		bitmapFontText.y = app.screen.height / 2

		app.stage.addChild(bitmapFontText)
	})
}) ()
