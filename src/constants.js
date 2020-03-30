require('dotenv').config();

const login_sl = {
	eml_sl: '#username',
	pass_sl: '#password',
	sbmt_sl: '#app__container > main > div > form > div.login__form_action_container > button',
};

const login_dt = {
	email: process.env.IN_EMAIL,
	password: process.env.IN_PASSWORD,
};

const anon_prof_sl = {
	nameSl:
		'body > main > section.core-rail > section > section.top-card-layout > div > div.top-card-layout__entity-info-container > div:nth-child(1) > h1',
	titleSl:
		'body > main > section.core-rail > section > section.top-card-layout > div > div.top-card-layout__entity-info-container > div:nth-child(1) > h2',
	aboutSl: 'body > main > section.core-rail > section > section.summary.pp-section > p',
};

const prof_sl = {
	nameSl:
		'main.core-rail > div > section > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1)',
	titleSl: 'main.core-rail > div > section > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h2',
	aboutSl: 'main.core-rail > div:nth-child(5) > section > p > span:nth-child(1)',
	aboutSeeMoreSl: 'main.core-rail > div:nth-child(5) > section > p a',
	experienceSl: 'section#experience-section > ul > li',
};

const proxy_srs = [
	{
		ip: '36.37.160.124',
		port: '8080',
	},
	{
		ip: '178.156.202.101',
		port: '8080',
	},
	{
		ip: '206.189.36.13',
		port: '47503',
	},
	{
		ip: '159.138.21.170',
		port: '80',
	},
];

module.exports = {
	LOGIN_SELECTORS: login_sl,
	LOGIN_DATA: login_dt,
	ANONYMOUS_PROFILE_SELECTORS: anon_prof_sl,
	PROFILE_SELECTORS: prof_sl,
	PROXY_SERVERS: proxy_srs,
};
