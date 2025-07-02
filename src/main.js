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
 * [X] Load and display bitmapText
 * [X] Load and display on GithubPages
 *
 *
 */

import { Application, Assets, BitmapText } from 'pixi.js';

(async () => {
    const canvas = document.getElementById('pixiContainer');
    const app = new Application({
        background: '#1099bb',
        resizeTo: canvas,
        height: canvas.offsetHeight,
        width: canvas.offsetWidth,
    });

    canvas.appendChild(app.view);

    await Assets.load('./assets/FNTBaseBonus01a.xml').then(() => {
        const bitmapFontText = new BitmapText('0123 456789.,', {
            fontName: 'FNTBaseBonus01a',
            fontSize: 36,
            align: 'center',
        });

        bitmapFontText.pivot.x = bitmapFontText.width / 2;
        bitmapFontText.pivot.y = bitmapFontText.height / 2;
        bitmapFontText.x = app.screen.width / 2;
        bitmapFontText.y = app.screen.height / 2;

        app.stage.addChild(bitmapFontText);
    });
}) ();