import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';
import cliProgress from 'cli-progress';

export async function extractor(link: string | URL, words: Array<string>) {
	const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	const total = words.length;
	console.log('Progress');
	bar1.start(total, 0);
	const synonyms = await Promise.allSettled(
		words.map(async (word) => {
			try {
				const response = await gotScraping(`${link}/${word}`);
				const html = response.body;
				const $ = cheerio.load(html);
				const synonyms = $('#meanings > div.css-ixatld.e15rdun50 > ul > li')
					.map(function () {
						return $(this).find('a').text().trim();
					})
					.get();
				// console.log(synonyms);
				bar1.increment();
				return { word, synonyms };
			} catch (error) {
				console.log(error);
				return { word };
			}
		})
	);
	bar1.stop();
	return synonyms;
}
