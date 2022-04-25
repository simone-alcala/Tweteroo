import express from 'express';
import cors    from 'cors';
import chalk   from 'chalk';

const app = express();
app.use(cors());
app.use(express.json());

const users  = [];
const tweets = [];

function validatePostSignUp(req,res,next){
  if (!req.body.username) return res.status(400).json({error: 'Username é obrigatório'});
  if (!req.body.avatar) return res.status(400).json({error: 'Avatar é obrigatório'});
  if (!validateURL(req.body.avatar)) return res.status(400).json({error: 'Avatar inválido'});
  return next();
}

function validatePostTweet(req,res,next){
  if (!req.headers.user) return res.status(400).json({error: 'Username é obrigatório'});
  if (!req.body.tweet) return res.status(400).json({error: 'Tweet é obrigatório'});
  if (!users.find(user => user.username === req.headers.user)) return res.status(400).json({error: 'Username inválido'});
  return next();
}

function validateGetTweet(req,res,next){
  if (!req.query.page > 1) return res.status(400).json({error: 'Informe uma página válida!'});
  return next();
}

function validateURL(url){
  if (typeof url !== 'string') return false;
  return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
}

app.get('/',(req,res) => {
  res.send('Curioso(a) :D :D');
}); 


app.get('/tweets',validateGetTweet,(req,res) => {
  const page = req.query.page;
  const limit = 10;//req.query.limit;

  console.log(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const tweetsToReturn = tweets.slice(startIndex,endIndex);
  res.json(tweetsToReturn);

});
/*
app.get('/tweets',(req,res) => {
  const lastTweets = (tweets.slice()).splice(-10);
  lastTweets.map(tweet => {
    const user = users.find(u => u.username === tweet.username);
    tweet.avatar = user.avatar;
  });
  res.send(lastTweets);
});
*/

app.get('/tweets/:username',(req,res) => {
  const username = req.params.username;
  const tweetsToReturn = tweets.filter(tweet => tweet.username === username);
  res.send(tweetsToReturn);
});

app.post('/sign-up',validatePostSignUp,(req,res) => {
  const {username,avatar} = req.body;
  users.push({username,avatar});
  res.status(201).send('OK');
});

app.post('/tweets',validatePostTweet,(req,res) => {
  const tweet = req.body.tweet ;
  const username = req.headers.user;

  const user = users.find(u => u.username === username);
  
  tweets.push({
    username: username,
    avatar: typeof(user)==='undefined'?null:user.avatar,
    tweet: tweet });

  res.status(201).send('OK');
  
});

app.listen(5000,()=>console.log(chalk.bold.green('Server on :D')));