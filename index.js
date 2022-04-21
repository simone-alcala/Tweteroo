import express from 'express';
import cors    from 'cors';
import chalk   from 'chalk';

const app = express();
app.use(cors());
app.use(express.json());

const users  = [];
const tweets = [];

function validatePostSignUp(req,res,next){
  if (!req.body.username) return res.status(400).json({error: "Username é obrigatório"});
  if (!req.body.avatar) return res.status(400).json({error: "Avatar é obrigatório"});
  return next();
}

function validatePostTweet(req,res,next){
  if (!req.body.username) return res.status(400).json({error: "Username é obrigatório"});
  if (!req.body.tweet) return res.status(400).json({error: "Tweet é obrigatório"});
  return next();
}

app.get('/',(req,res) => {
  res.send('Foi :D :D');
});

app.get('/tweets',(req,res) => {
  const lastTweets = [];
  let i = 0;

  if (tweets.length > 10) i = tweets.length-10;

  for (i ; i < tweets.length ; i++)  lastTweets.push(tweets[i]);
  
  lastTweets.map(tweet => {
    const user = users.find(u => u.username === tweet.username);
    tweet.avatar = user.avatar;
  });

  res.send(lastTweets);
});

app.post('/sign-up',validatePostSignUp,(req,res) => {
  const {username,avatar} = req.body;
  users.push({username,avatar});
  res.status(201).send('OK');
});

app.post('/tweets',validatePostTweet,(req,res) => {
  const {username,tweet} = req.body;
  tweets.push({username,tweet});
  res.status(201).send('OK');
});

app.listen(5000,()=>console.log(chalk.bold.green('Server on :D')));