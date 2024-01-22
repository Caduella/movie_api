const express = require('express'),
			app = express(),
			morgan = require('morgan'),			
			uuid = require('uuid');
			
const mongoose = require('mongoose');
const Models = require ('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
		
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//Log requests to server
app.use(morgan('common'));

mongoose.connect('mongodb://localhost:27017/cfDB');

//Default text response when at /
app.get('/', (req, res) =>{
	res.send('Welcome to MyQuickMovie API');
});

//Return a list of ALL movies to the user
app.get('/movies', async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return a list of all users
app.get('/users', async (req, res) => {
	await Users.find()
	.then((users) => {
		res.status(201).json(users);
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	});
})


//Return data about a single movie by title
app.get('/movies/:Title', async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return data about a genre by name
app.get('/movies/genres/:genreName', async (req, res) => {
  await Movies.findOne({ 'Genre.Name': req.params.genreName })
    .then((movies) => {
      res.json(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//Return data about a director
app.get('/movies/directors/:directorName', async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Add a new user
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
				})
          .then((user) =>{res.status(201).json(user) })  
					.catch((error) => {
						console.error(error);
						res.status(500).send('Error: ' + error);
					})      	
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Allow users to update their user info (username)
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

//Allow users to add a movie to their list of favorites
app.post('/users/:Username/Movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/Movies/:MovieID', async (req, res) => {
	await Users.findOneAndUpdate({ Username: req.params.Username },	{ 
		$pull: { FavoriteMovies: req.params.MovieID } 
	},
	{ new: true }) // This line makes sure that the updated document is returned
	.then ((updatedUser) => {
    res.json(updatedUser);
  })
	.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});


//Allow existing users to deregister
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.listen(8080, () => console.log('Listening on port 8080.'));