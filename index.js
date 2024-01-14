const express = require('express')
			morgan = require('morgan');

const app = express();
const port = 8080;

// const accessLogStream = 
// fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let topTenMovies = [
	{
			title: 'The Lord of the Rings',
			Director: 'Peter Jackson'
	},
	{
			title: 'Rashomon',
			Director: 'Akira Kurosawa'
	},
	{
			title: 'Parasite',
			Director: 'Bon Joon Ho'
	},
	{
			title: 'Spirited Away',
			Director: 'Hayao Miyazaki'
	},
	{
			title: 'Como Agua Para Chocolate',
			Director: 'Alfonso Arau'
	},
	{
			title: 'Diva',
			Director: 'Jean-Jacques Beineix'
	},
	{
			title: 'The Shawshank Redemption',
			Director: 'Frank Darabont'
	},
	{
			title: 'Inception',
			Director: 'Christopher Nolan'
	},
	{
			title: 'Eyes Wide Shut',
			Director: 'Stanley Kubrick'
	},
	{
			title: 'The Lover',
			Director: 'Jean-Jacques Annaud'
	}
]

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something Broke!');
});

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}.`);
});