const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');

const { ANONYMOUS_PROFILE_SELECTORS } = require('./constants');

// hosting the html file on localhost:8000
fs.readFile('./index.html', (err, html) => {
	if (err) {
		throw err;
	}
	http.createServer((request, response) => {
		response.writeHeader(200, { 'Content-Type': 'text/html' });
		response.write(html);
		response.end();
	}).listen(8000);
});

const scrapper = async url => {
	const { nameSl, titleSl, aboutSl } = ANONYMOUS_PROFILE_SELECTORS;

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

	let personData = JSON.stringify(person);
	fs.writeFileSync(`${person['name'].split(' ').join('_')}_person.json`, personData);
	await browser.close();
};

scrapper('http://127.0.0.1:8000');
