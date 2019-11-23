const uuidv1 = require('uuid/v1');

var data = [
    {
        id: '1',
        title: 'Book 1',
        rating: 4.5
    }
];

var appRouter = function(app) {
    app.get('/', function(req, res) {
        res.status(200).send('Welcome to our restful API');
    });
    app.get('/books', function(req, res) {
        res.status(200).send(data);
    });
    app.post('/books', function(req, res) {
        var book_id = uuidv1();
        var book_title = req.body.title;
        var book_rating = req.body.rating;
        var obj = { id: book_id, title: book_title, rating: book_rating };
        data.push(obj);

        res.send(obj);
    });

    app.put('/books/:id', function(req, res) {
        var book_id = req.params.id;
        console.log('req.body', req.body);
        const book = data.find(book => book.id === book_id);
        book.title = req.body.title;
        book.rating = req.body.rating;

        return res.send(data);
    });

    app.delete('/books/:id', function(req, res) {
        var book_id = req.params.id;
        console.log('req.body', req.body);

        data = data.filter(book => {
            return book.id != book_id;
        });

        return res.send(data);
    });

    //  app.get("/books/:id", function (req, res) {
    //    var users = [];
    //    var id = req.params.id;

    //    if (isFinite(id) && id  > 0 ) {
    //      for (i = 0; i <= id-1; i++) {
    //        users.push({
    //            title: '',
    //            rating: ''
    //         });
    //      }

    //      res.status(200).send(users);

    //    } else {
    //      res.status(400).send({ message: 'invalid id supplied' });
    //    }

    //  });
};

module.exports = appRouter;
