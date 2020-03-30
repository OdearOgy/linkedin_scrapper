require('dotenv').config();

const login_dt = {
	email: process.env.IN_EMAIL,
	password: process.env.IN_PASSWORD,
};

module.exports = {
	LOGIN_DATA: login_dt,
};
