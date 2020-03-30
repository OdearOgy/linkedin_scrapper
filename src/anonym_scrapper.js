const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');

const { ANONYMOUS_PROFILE_SELECTORS } = require('./constants');
const [filePath, port] = process.argv.slice(2);
const localUrl = `http://127.0.0.1:${port}`;

// hosting the html file on localhost:8000
fs.readFile(filePath, (err, html) => {
	if (err) {
		throw err;
	}
	http.createServer((request, response) => {
		response.writeHeader(200, { 'Content-Type': 'text/html' });
		response.write(html);
		response.end();
	}).listen(port);
});

const scrapper = async url => {
	const { nameSl, titleSl, aboutSl, experienceSl, experienceData } = ANONYMOUS_PROFILE_SELECTORS;

	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 20,
	});

	const page = await browser.newPage();

	await page.setViewport({
		width: 1280,
		height: 720,
	});

	await page.goto(url);

	const content = await page.content();
	const $ = await cheerio.load(content);
	let person = {
		name: $(nameSl)
			.text()
			.trim(),
		title: $(titleSl)
			.text()
			.trim(),
		about: $(aboutSl)
			.text()
			.trim(),
		experience: [],
	};

	$(`${experienceSl} > li`).each((i, elem) => {
		person['experience'][i] = Object.assign({
			title: $(elem)
				.find(experienceData['title'])
				.text()
				.trim(),
			company: $(elem)
				.find(experienceData['company'])
				.text()
				.trim(),
			location: $(elem)
				.find(experienceData['location'])
				.text()
				.trim(),
			about: $(elem)
				.find(experienceData['about'])
				.text()
				.trim(),
		});
	});

	let personData = JSON.stringify(person);
	fs.writeFileSync(`${person['name'].split(' ').join('_')}_person.json`, personData);
	await browser.close();
	process.exit();
};

scrapper(localUrl);
