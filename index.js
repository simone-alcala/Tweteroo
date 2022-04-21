import express from 'express';
import cors    from 'cors';
import chalk   from 'chalk';

const app = express();
app.use(cors());
app.use(express.json());

const users  = [];
//let tweet = {'username': '', 'avatar': '', 'tweet': ''};

const tweets = [];

app.get('/',(req,res) => {
  res.send('Foi :D :D');
});

app.get('/tweets',(req,res) => {
  res.send(tweets);
});

app.post('/sign-up',(req,res) => {
  const {username,avatar} = req.body;
  users.push({username,avatar});
  res.send('OK');
});


app.listen(5000,()=>console.log(chalk.bold.green('Server on :D')));