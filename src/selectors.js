const login_sl = {
	eml_sl: '#username',
	pass_sl: '#password',
	sbmt_sl: '#app__container > main > div > form > div.login__form_action_container > button',
};

const anon_prof_sl = {
	nameSl:
		'body > main > section.core-rail > section > section.top-card-layout > div > div.top-card-layout__entity-info-container > div:nth-child(1) > h1',
	titleSl:
		'body > main > section.core-rail > section > section.top-card-layout > div > div.top-card-layout__entity-info-container > div:nth-child(1) > h2',
	aboutSl: 'body > main > section.core-rail > section > section.summary.pp-section > p',
	experienceData: {
		sl: 'body > main > section.core-rail > section > section.experience.pp-section > ul',
		title: 'div > h3',
		company: 'div > h4 > a',
		location: 'div > div > p.experience-item__location.experience-item__meta-item',
		about: 'div > div > div > div > p',
		date: {
			start:
				'div > div > p.experience-item__duration.experience-item__meta-item > span > time.date-range__start-date',
			end:
				'div > div > p.experience-item__duration.experience-item__meta-item > span > time.date-range__end-date',
			total: 'div > div > p.experience-item__duration.experience-item__meta-item > span > span',
		},
	},
	educationData: {
		sl: 'body > main > section.core-rail > section > section.education.pp-section > ul',
		organization: 'div > h3',
		degree: {
			start: 'div > h4 > span:nth-child(1)',
			end: 'div > h4 > span:nth-child(2)',
		},
	},
	alsoPeopleData: {
		sl: 'body > main > section.right-rail > section.browsemap.right-rail-section > ul',
		name: 'div > h3',
		title: 'div > h4',
	},
};

const prof_sl = {
	nameSl:
		'main.core-rail > div > section > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1)',
	titleSl: 'main.core-rail > div > section > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h2',
	aboutSl: 'main.core-rail > div:nth-child(5) > section > p > span:nth-child(1)',
	aboutSeeMoreSl: 'main.core-rail > div:nth-child(5) > section > p a',
	experienceSl: 'section#experience-section > ul > li',
};

module.exports = {
	LOGIN_SELECTORS: login_sl,
	ANONYMOUS_PROFILE_SELECTORS: anon_prof_sl,
	PROFILE_SELECTORS: prof_sl,
};
