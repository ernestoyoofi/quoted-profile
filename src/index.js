const { Router } = require('cloudworker-router');

const router = new Router();

function createSVG(textTemplate, username, { stylesFont, wordLengthWrap = 48, transparant = false, whiteText = false } = {}) {
	console.log('Wordlength:', wordLengthWrap < 24 ? 24 : wordLengthWrap);
	const wrappedText = textTemplate.split(' ').reduce(
		(lines, word) => {
			const currentLine = lines[lines.length - 1];
			if ((currentLine + ' ' + word).length > (wordLengthWrap < 24 ? 24 : wordLengthWrap)) {
				lines.push(word);
			} else {
				lines[lines.length - 1] = currentLine + ' ' + word;
			}
			return lines;
		},
		['']
	);

	return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="${
		wrappedText.length * 24 + 30 + 22
	}" style="border: 1px solid #e4e2e2; border-radius: 4px;">
	<style>
	@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:ital,wght@0,400;0,700;1,400;1,700&amp;family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap');
	@import url('https://fonts.googleapis.com/css2?family=${stylesFont?.replace(
		/ /g,
		'+'
	)}:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap');
	* { font: 600 18px "${stylesFont}", serif; }
	</style>${transparant ? '\n<rect width="420" height="100%" fill="white" />' : ''}
	${wrappedText
		.map(
			(a, i) =>
				`<text x="10" y="${30 + i * 24}" style="font-size: 18px; font-weight: bold; fill: ${
					whiteText ? 'white' : 'black'
				}; line-height: 1.1; text-wrap: wrap;">${a}</text>`
		)
		.join('')}
	<text x="10" y="${wrappedText.length * 24 + 37}" style="font-size: 14px; fill: ${whiteText ? '#c4c4c4' : '#595959'};">${username}</text>
	</svg>`;
}

router.get('/:slug', async (ctx) => {
	const getUsername = ctx.params.slug;
	const urlFetchQuoted = `https://raw.githubusercontent.com/${getUsername}/${getUsername}/refs/heads/main/quoted.txt`;
	const fontStyle = ctx.query.get('font') || 'Balsamiq Sans';

	try {
		const dataFetch = await fetch(urlFetchQuoted);
		const getData = await dataFetch.text();

		if (![200, 301].includes(dataFetch.status)) {
			return new Response(`<svg><text>Quoted file on ${getUsername} is not found!</text></svg>`, {
				headers: {
					'Content-Type': 'image/svg+xml; charset=utf-8',
				},
			});
		}

		const quotedText = getData.split('\n').filter((a) => a.length > 2);
		const selectQuoted = `"${quotedText[Math.floor(Math.random() * quotedText.length)]}"`;
		return new Response(
			createSVG(selectQuoted, `~@${getUsername}`, {
				stylesFont: fontStyle,
				wordLengthWrap: !isNaN(ctx.query.get('wordlength')) ? Number(ctx.query.get('wordlength') || '48') : 48,
				transparant: ctx.query.get('istransparant') == '1' ? true : false,
				whiteText: ctx.query.get('iswhitetext') == '1' ? true : false,
			}),
			{
				headers: {
					'Content-Type': 'image/svg+xml; charset=utf-8',
					'Cache-Control': 'max-age=432000', // Remove This If You Want Random Realtime (Not Recommend)
				},
			}
		);
	} catch (e) {
		return new Response('<svg><text>Oh no, something error!</text></svg>', {
			headers: {
				'Content-Type': 'image/svg+xml; charset=utf-8',
			},
		});
	}
});

export default {
	async fetch(request, env, ctx) {
		return router.handle(request, env, ctx);
	},
};
