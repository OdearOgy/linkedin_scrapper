const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');

const { ANONYMOUS_PROFILE_SELECTORS } = require('../shared/selectors');
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

String.prototype.trimNewLines = function() {
	return this.replace(/(\r\n\t|\n|\r|\t)/gm, '');
};

const scrapper = async url => {
	const { nameSl, titleSl, aboutSl, experienceData, educationData, alsoPeopleData } = ANONYMOUS_PROFILE_SELECTORS;
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
			.trim()
			.trimNewLines(),
		title: $(titleSl)
			.text()
			.trim()
			.trimNewLines(),
		about: $(aboutSl)
			.text()
			.trim()
			.trimNewLines(),
		experience: [],
		education: [],
		alsoPeople: [],
	};

	$(`${experienceData['sl']} > li`).each((i, elem) => {
		person['experience'][i] = Object.assign({
			title: $(elem)
				.find(experienceData['title'])
				.text()
				.trim()
				.trimNewLines(),
			company: $(elem)
				.find(experienceData['company'])
				.text()
				.trim()
				.trimNewLines(),
			date: {
				start: $(elem)
					.find(experienceData['date']['start'])
					.text()
					.trim()
					.trimNewLines(),
				end:
					$(elem)
						.find(experienceData['date']['end'])
						.text()
						.trim()
						.trimNewLines() || 'present',
				total: $(elem)
					.find(experienceData['date']['total'])
					.text()
					.trim()
					.trimNewLines(),
			},
			location: $(elem)
				.find(experienceData['location'])
				.text()
				.trim()
				.trimNewLines(),
			about: $(elem)
				.find(experienceData['about'])
				.text()
				.trim()
				.trimNewLines(),
		});
	});

	$(`${educationData['sl']} > li`).each((i, elem) => {
		person['education'][i] = Object.assign({
			organization: $(elem)
				.find(educationData['organization'])
				.text()
				.trim()
				.trimNewLines(),
			degree: `
					${$(elem)
						.find(educationData['degree']['start'])
						.text()} 
					${$(elem)
						.find(educationData['degree']['end'])
						.text()}
						`
				.trim()
				.trimNewLines(),
		});
	});

	$(`${alsoPeopleData['sl']} > li`).each((i, elem) => {
		person['alsoPeople'][i] = Object.assign({
			name: $(elem)
				.find(alsoPeopleData['name'])
				.text()
				.trim()
				.trimNewLines(),
			title: $(elem)
				.find(alsoPeopleData['title'])
				.text()
				.trim()
				.trimNewLines(),
		});
	});

	let personData = JSON.stringify(person);
	fs.writeFileSync(`${person['name'].split(' ').join('_')}_person.json`, personData);
	await browser.close();
	process.exit();
};

scrapper(localUrl);
