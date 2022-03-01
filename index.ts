import { extractor } from './extractor';
import words from './wordlist.json';

// import words from './magoosh_1000.json';
// const wordJson = words.pages.flatMap((page) => {
// 	return page.txtRns.filter((txt) => txt.fontId === 4).map((txt) => txt.text);
// });

import fs from 'fs';
extractor('https://www.thesaurus.com/browse', words)
	.then((synonyms) => {
		fs.writeFileSync('./synonyms.json', JSON.stringify(synonyms?.filter((d) => d.status != 'rejected')));
		const rejected = synonyms?.filter((d) => d.status == 'rejected');
		fs.writeFileSync('./rejected_words.json', JSON.stringify(rejected));
		console.log('done');
	})
	.catch((e) => console.log(e));
