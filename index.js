import express from 'express';
import cors    from 'cors';
import chalk   from 'chalk';

const app = express();
app.use(cors());

app.get('/',(req,res) => {
  res.send('Foi :D :D');
})

app.listen(5000,()=>console.log(chalk.bold.green('Server on :D')));