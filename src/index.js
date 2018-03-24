const express = require('express');
//const { get } = require('axios');
const moment = require('moment');
const fs = require('fs');
const exphbs  = require('express-handlebars');
	

const PORT = 4322;
const URL = 'https://kodaktor.ru/j/users';
const app = express(); //Godlike
const Olologger =  (req, res, next) => {
  fs.appendFile('log.txt', moment().format('DD.MM.YYYY HH:mm:ss') + ': ' + req.url + '\n', (err) => {
    if (err) throw err;
    console.log('update log!');
  });
  next();
};

app.engine('handlebars', exphbs({layoutsDir: 'listhb'}));
app.set('view engine', 'handlebars');


app
	.use(Olologger)
	.get('/',  (req, res) => {
  		res.send('Hello World!');
	})
	.get('/log/', r => r.res.end(fs.readFileSync('log.txt')))
	.get('/hello', r => r.res.end('Hello world'))
	.get('/hello/:name', r => r.res.end(`Hello, ${r.params.name}`))
	/*.get('/users/', async r => {
		const { data: { users: items} } = await get(URL);
		r.res.render('list', {title: 'Login list', items});
	})*/
	.get('/listhb', r =>
  		r.res.render('listhb',{
  								users:[
  										{
  											login:'student',
  											password:'tneduts'
  										},
  										{
  											login:'myuser',
  											password:'mypas'
  										},
  										{
  											login:'teacher',
  											password:'qq'
  										},
  										{
  											login:'myking',
  											password:'myqueen'
  										}
  									   ]
  								}
  					)
	)
	
	/*.get('/usershb' async r => {
  		let template = Handlebars.compile(document.querySelector('#t').textContent),
            { users } = await fetch(URL).then(x => x.json());
   		document.querySelector('#r').innerHTML = template(users);
	})*/
    .use(r => r.res.status(404).end('Still not here, sorry!'))
    .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
	//.set('view engine', 'pug')
	
	.listen(process.env.PORT || PORT, () => console.log('we wooooork'));
	//для обработки внутренних ошибок сервера
	