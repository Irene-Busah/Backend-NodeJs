const express = require('express')
const mongoose = require('mongoose');
const ejsLocals = require('ejs-locals');
const path = require('path')
const bodyParser = require('body-parser');
const User = require('./models/userModel');
const Request = require('./models/requestModel');
const bcrypt = require('bcrypt');
const session = require('express-session');


const app = express()
app.use(express.json())
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set the view engine and extension to 'html'
app.engine('html', ejsLocals);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

// Set up the session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set 'secure' to true for HTTPS environments
}));




// ================= Routes =====================
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/student-home', async (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    try {
        const studentId = req.session.user._id;

        const requests = await Request.find({ student: studentId });

        res.render('student-dashboard', { user, requests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.get('/facilitator-home', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    res.render('facilitator-dashboard', { user })
})

app.get('/team-lead-home', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    res.render('admin-dashboard', { user })
})


app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login', { error: null }); // Render the login form
});

app.post('/signup', async (req, res) => {
    const { name, email, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, role, password: hashedPassword });

    newUser.save()
        .then(user => {
            let redirectUrl;
            if (user.role === 'Student') {
                redirectUrl = '/student-home';
            } else if (user.role === 'Facilitator') {
                redirectUrl = '/facilitator-home';
            } else {
                redirectUrl = '/team-lead-home';
            }

            res.redirect(redirectUrl);
        })
        .catch(err => {
            res.status(400).json({ message: 'Error registering user', error: err });
        });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.render('login', { error: 'User not found' });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Server error' });
                }
                if (!result) {
                    return res.render('login', { error: 'Incorrect password' });
                }
                const role = user.role;
                const username = user.name;

                // Set the user object in the session
                req.session.user = user;

                if (role === 'Student') {
                    res.redirect('/student-home');
                } else if (role === 'Facilitator') {
                    res.redirect('/facilitator-home');
                } else if (role === 'Team Lead') {
                    res.redirect('/team-lead-home');
                } else {
                    res.status(401).json({ message: 'Invalid role' });
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});


app.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.redirect('/login');
    });
});

// Export the router
app.post('/submit-request', (req, res) => {
    const { title, requestType, description } = req.body;
    // const user = req.session.user;
    const studentId = req.session.user._id;
    console.log(studentId)

    // Create a new Request object
    const newRequest = new Request({
        title,
        requestType,
        description,
        student: studentId,
    });

    // Save the request to the database
    newRequest.save()
        .then(request => {
            // Redirect to the student dashboard or display a success message
            res.redirect('/student-home');
        })
        .catch(error => {
            // Handle errors, e.g., show an error message to the user
            console.error(error);
            res.status(500).send('Error submitting the request.');
        });
});


mongoose.connect('MONGODB_LINK').then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log('listening on port ' + PORT);
    })
}).catch((error) => {
    console.log(error)
})
