require('dotenv').config();

const Twitter = require('twitter');
const snoowrap = require('snoowrap');

const twitterConfig = {
  consumer_key: process.env.T_CONSUMER_KEY,
  consumer_secret: process.env.T_CONSUMER_SECRET,
  access_token_key: process.env.T_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.T_ACCESS_TOKEN_SECRET,
};

const T = new Twitter(twitterConfig);

const redditConfig = {
  username: process.env.R_USERNAME,
  password: process.env.R_PASSWORD,
  clientId: process.env.R_APP_ID,
  clientSecret: process.env.R_APP_SECRET,
  userAgent: 'ZoeBot3'
};

const R = new snoowrap(redditConfig);

R.getSubreddit('zoemains').getHot({limit: 2}).map(post => [ post.title, post.selftext]).then(console.log);