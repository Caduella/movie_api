const express = require('express'),
			app = express(),
			morgan = require('morgan'),
			bodyParser = require('body-parser'),
			uuid = require('uuid');
		
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));

let users = [
	{
		id: 1,
		name: 'Kim',
		favoriteMovies: []
	},
	{
		id: 2,
		name: 'Joe',
		favoriteMovies: ['The Fountain']
	}
];

let movies = [
	{
		"Title": "The Fountain",
		"Description":"As a modern-day scientist, Tommy is strugging with mortality, desperately searching for the medical breakthrough that will save the life of his cancer-stricken wife, Izzi.",
		"Genre": {
			"Name":"Drama",
			"Description":"In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
		},
		"Director": {
			"Name":"Darren Aronofsky",
			"Bio":"Darren Aronofsky was born February 12, 1969, in Brooklyn, New York.  Growing up, Darren was always artistic: he loved classic movies and, as a teenage, he even spent time doing graffiti art.  After high school, Darren went to Harvard University to study film (both live-action and animation).  He won several film awards after completing his senior thesis film, Supermarket Sweep, starring Sean Gullette, which went on to becoming a National Student Academy Award finalist.  Aronofsky didn't make a feature film until five years later, in Februray 1996, where he began creating the concept for Pi (1998).  After Darren's script for Pi (1998) received great reaction from friends, he began production.  The film re-teamed Aronofsky with Gullette, who played the lead.  This went on to further successes, such as Requiem for a Dream (2000), The Wrestler (2008) and Black Swan (2010).  Most recently, he completed the films Noah (2014) and Mother! (2017).",
			"Birth":1969.0
		},
		"ImageURL":"https://m.media-amazon.com/images/M/MV5BMTU5OTczMTcxMV5BMl5BanBnXkFtZTcwNDg3MTEzMw@@._V1_FMjpg_UX1000_.jpg",
		"Featured":false
	},
	{
		"Title":"The Princess Bride",
		"Description":"While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
		"Genre":{
			"Name":"Action",
			"Description":"Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.  Action films tend to feature a mostly resourceful hero struggling against incredible odds, which included life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."
		},
		"Director": {
			"Name":"Rob Reiner",
			"Bio":"When Rob graduated high school, his parents advised him to participate in Summer Theatre.  Reiner got a job as an apprentice in the Bucks County Playhouse in Pennsylvania.  He went to be further educated at UCLA Film School.  Reiner felt he still wasn't successful even having a recurring role on one of the biggest shows in the country, All in the Family.  Reiner began his directing career with the Oscar-nominated films This is Spinal Tap, Stand By Me, and the Princess Bride.",
			"Birth":1947.0
		},
		"ImageURL":"https://image.tmdb.org/t/p/original/A09tSLrBBspWHlc2tOBaZNfdlbF.jpg",
		"Featured":false
	},
	{}
];

//Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
	res.status(200).json(movies)
})

//Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
	const { title } = req.params;
	const movie = movies.find( movie => movie.Title === title );

	if (movie) {
		res.status(200).json(movie);
	} else {
		res.status(400).send('no such movie')
	}
})

//Return data about a genre by name
app.get('/movies/genre/:genreName', (req, res) => {
	const { genreName } = req.params;
	const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

	if (genre) {
		res.status(200).json(genre);
	} else {
		res.status(400).send('no such genre')
	}
})

//Return data about a director
app.get('/movies/directors/:directorName', (req, res) => {
	const { directorName } = req.params;
	const director = movies.find( movie => movie.Director.Name === directorName ).Director;

	if (director) {
		res.status(200).json(director);
	} else {
		res.status(400).send('no such director')
	}
})

//Allow new users to register
app.post('/users', (req, res) => {
	const newUser = req.body;

	if (newUser.name) {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).json(newUser)
	} else {
		res.status(400).send('users need names')
	}
})

//Allow users to update their user info (username)
app.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	let user = users.find( user => user.id == id);

	if (user) {
			user.name = updatedUser.name;
			res.status(200).json(user);
	} else {
			res.status(400).send('no such user')
	}
})

//Allow users to add a movie to their list of favorites
app.patch('/users/:id/:movieTitle', (req, res) => {
	const { id, movieTitle } = req.params;
	
	let user = users.find( user => user.id == id);

	if (user) {
			user.favoriteMovies.push(movieTitle);
			res.status(200).send(`${movieTitle} has been successfully added to user ${id}'s list of favorite movies.`);
	} else {
			res.status(400).send('no such user')
	}
})

//Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
	const { id, movieTitle } = req.params;
	
	let user = users.find( user => user.id == id);

	if (user) {
			user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
			res.status(200).send(`${movieTitle} has been successfully removed from user ${id}'s list of favorite movies.`);
	} else {
			res.status(400).send('no such user')
	}
})

//Allow existing users to deregister
app.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	
	let user = users.find( user => user.id == id);

	if (user) {
			users = users.filter( user => user.id != id);
			res.status(200).send(`user ${id} has been successfully deleted.`);
	} else {
			res.status(400).send('no such user')
	}
})


app.listen(8080, () => console.log('Listening on port 8080.'));