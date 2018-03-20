const express = require('express');
const { get } = require('axios');

const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();

app
	.get("/", r => r.res.send('Guten bluten Taaaaag!') )
	.get('/hello', r => r.res.end('Hello world'))
	.get('/hello/:name', r => r.res.end(`Hello, ${r.params.name}`))
	.get('/users/', async r => {
		const { data: { users: items} } = await get(URL);
		r.res.render('list', {title: 'Login list', items});
	})
	
    .use(r => r.res.status(404).end('Still not here, sorry!'))
    .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
	.set('view engine', 'pug')
	.listen(process.env.PORT || PORT, () => console.log('we wooooork'));
	//для обработки внутренних ошибок сервера
	
	
	