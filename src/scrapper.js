const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const chromePath = '/usr/bin/google-chrome-stable';
const { LOGIN_SELECTORS, PROFILE_SELECTORS, ANONYMOUS_PROFILE_SELECTORS } = require('../shared/selectors');
const { LOGIN_DATA } = require('../shared/constants');

// https://www.linkedin.com/in/tigran-sargsyan-a7455a51/
let [url, type] = process.argv.slice(2);

const login = async page => {
	const { eml_sl, pass_sl, sbmt_sl } = LOGIN_SELECTORS;
	const { email, password } = LOGIN_DATA;

	await page.goto('https://linkedin.com/login', {
		waituntil: 'domcontentloaded',
	});

	await page.click(eml_sl);
	await page.keyboard.type(email);
	await page.click(pass_sl);
	await page.keyboard.type(password);
	await page.click(sbmt_sl);
};

const logged_scrapping = async page => {
	const { nameSl, titleSl, aboutSl, experienceSl } = PROFILE_SELECTORS;
	const content = await page.content();
	const $ = cheerio.load(content);
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

	$(experienceSl).map((i, elem) => {
		person['experience'][i] = $(elem)
			.text()
			.trim();
	});

	let personData = JSON.stringify(person);
	fs.writeFileSync(`${person['name'].split(' ').join('_')}_person.json`, personData);
};

const scrapper = async profileUrl => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 20,
		executablePath: chromePath,
	});

	const browserContext = await browser.createIncognitoBrowserContext();
	const page = await browserContext.newPage();
	await page.setViewport({
		width: 1280,
		height: 720,
	});

	if (type === 'logged') {
		await login(page);
		await page.goto(profileUrl);
		await logged_scrapping(page);
	} else {
		await anonymous_scrapping(page);
	}

	await browser.close();
};

scrapper(url);
