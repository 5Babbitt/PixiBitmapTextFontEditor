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

	await Assets.load('/FNTBaseBonus01a.xml').then(() => {
		const bitmapFontText = new BitmapText('0123456789,.', {
			fontName: 'FNTBaseBonus01a',
			fontSize: 36,
			align: "center"
		})

  		bitmapFontText.x = 50;
  		bitmapFontText.y = 200;

		app.stage.addChild(centerComponent(bitmapFontText, app))
	})
}) ()

function centerComponent(component, app) {
	component.pivot.x = component.width / 2
	component.pivot.y = component.height / 2

	component.x = app.screen.width / 2
	component.y = app.screen.height / 2

	return component
}