var mongoose = require('mongoose');

var Score = mongoose.model('Score', {
    text : Number
});

module.exports = function(app) {
	app.get('/api/Scores', function(req, res) {

        // use mongoose to get all Scores in the database
        Score.find(function(err, Scores) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(Scores); // return all Scores in JSON format
        });
    });

    // create Score and send back all Scores after creation
    app.post('/api/Scores', function(req, res) {

        // create a Score, information comes from AJAX request from Angular
        Score.create({
            text : req.body.text,
            done : false
        }, function(err, Score) {
            if (err)
                res.send(err);

            // get and return all the Scores after you create another
            Score.find(function(err, Scores) {
                if (err)
                    res.send(err)
                res.json(Scores);
            });
        });

    });

    // delete a Score
    app.delete('/api/Scores/:Score_id', function(req, res) {
        Score.remove({
            _id : req.params.Score_id
        }, function(err, Score) {
            if (err)
                res.send(err);

            // get and return all the Scores after you create another
            Score.find(function(err, Scores) {
                if (err)
                    res.send(err)
                res.json(Scores);
            });
        });
    });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};

