const express = require('express');
const app = express(); //Godlike

app
	.get("/", (r, res, next) =>{
		next();
	}).listen(3333);