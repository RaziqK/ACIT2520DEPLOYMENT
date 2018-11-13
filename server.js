const express = require('express')
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 8080;

/////

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

app.use((request, response, next) => {
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}` ;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

// app.use((request, response, next) => {
// 	response.render('maintenance.hbs', {
// 		title: 'MAINTENANCE',
// 		year: new Date().getFullYear(),
// 		welcome: 'SITE DOWN FOR MAINTENANCE',
// 	});
// });

// app.get('/', (request, response) => {
// 	//response.send('</h1>Hello Express!</h1>');
// 	response.send({
// 		name: 'Raziq',
// 		school: [
// 			'BCIT',
// 			'SFU',
// 			'UBC'
// 		]
// 	})
// });


app.get('/', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		link: {
			raziq: '/info',
			yves: '/yves',
			menu: '/menu'
		}
	});
});	

// app.get('/404', (request, response) => {
// 	response.send({
// 		error: 'Page not found'
// 	})
// })

// app.get('/yves', (request, response) => {
// 	response.render('yves.hbs', {
// 		title: 'My Good Man Yves',
// 		welcome: 'Hes the best coolest guy',
// 		img: './img/socool.png',
// 		link: {
// 			raziq: '/info',
// 			yves: '/yves',
// 			menu: '/menu'
// 		}
// 	});
// });

// app.get('/menu', (request, response) => {
// 	response.render('menu.hbs', {
// 		welcome: 'My menu',
// 		link: {
// 			Raziq: '/info',
// 			Yves: '/yves',
// 			menu: '/menu'
// 		}
// 	})
// })

app.listen(port, () => {
	console.log(`Server ${port}`);
});