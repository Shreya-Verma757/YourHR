if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const User = require('./models/user.js');
const candidate = require('./models/candidate.js');
const ExpressError = require('./utils/ExpressError.js');
const wrapAsync = require('./utils/wrapAsync.js');
const {isLoggedIn, validateUser, isOwner} = require('./middleware.js');
const { storage } = require('./cloudConfig.js');
const multer = require('multer');
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      console.log('Received file:', file.fieldname);
      cb(null, true);
    }
  }).fields([
    { name: 'user[image]', maxCount: 1 },
    { name: 'user[resumePath]', maxCount: 1 }
  ]);

const path = require('path');
const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/YourHR";

main().then(() =>{
    console.log('Connected to the Database..');
}).catch((err) =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const sessionOption = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

app.use(flash());
app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},candidate.authenticate()));

passport.serializeUser(candidate.serializeUser());
passport.deserializeUser(candidate.deserializeUser());


app.use((req, res, next) =>{
    res.locals.currUser = req.user;
    res.locals.message = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.get('/', (req,res) =>{
    res.send('Working!!');
});



// INDEX ROUTE
app.get('/user',wrapAsync(async(req,res) =>{
    const allUser = await User.find({});
    res.render('user/index.ejs', {allUser});
}));

// NEW ROUTE
app.get('/user/new',isLoggedIn,(req,res) =>{
    res.render('user/new.ejs')
});

// SHOW ROUTE
app.get('/user/:id',wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const user = await User.findById(id);
    res.render('user/show.ejs', {user});
}));

// CREATE ROUTE
app.post('/user', isLoggedIn, upload, wrapAsync(async(req, res) => {
    try {
      const { name, email, password, location, country } = req.body.user;
  
      const newUser = new User({
        name,
        email,
        password, 
        location,
        country,
        owner: req.user._id
      });
  
      if (req.files['user[image]']) {
        const file = req.files['user[image]'][0];
        if (!file.mimetype.startsWith('image/')) {
          throw new Error('Please upload an image file for the profile picture');
        }
        newUser.image = { url: file.path, filename: file.filename };
      }
  
      if (req.files['user[resumePath]']) {
        const file = req.files['user[resumePath]'][0];
        if (file.mimetype !== 'application/pdf') {
          throw new Error('Please upload a PDF file for the resume');
        }
        newUser.resumePath = { url: file.path, filename: file.filename };
      }
  
      const savedUser = await newUser.save();
      console.log('Saved user:', savedUser);
      req.flash('success', 'New Profile Created!');
      res.redirect(`/user/${savedUser._id}`);
    } catch (error) {
      console.error('Error in user creation:', error);
      req.flash('error', error.message);
      res.redirect('/user/new');
    }
  }));


// EDIT ROUTE
app.get('/user/:id/edit',isLoggedIn,isOwner,wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        req.flash('error', 'Profile you requested for does not exist!!');
        res.redirect('/user');
    }
    const originalImageUrl = user.image ? user.image.url : ''; 
    res.render('user/edit.ejs', { user, originalImageUrl });
}));

// UPDATE ROUTE
app.put('/user/:id', isLoggedIn, isOwner, upload, wrapAsync(async(req, res) => {
    let { id } = req.params;
    const { name, email, password, location, country } = req.body.user;

    let user = await User.findById(id);
    if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/user');
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.location = location;
    user.country = country;

    // Only update password if a new one is provided
    if (password) {
        user.password = password;
    }

    // Handle image upload
    if (req.files && req.files['user[image]']) {
        const file = req.files['user[image]'][0];
        user.image = { url: file.path, filename: file.filename };
    }

    // Handle resume upload
    if (req.files && req.files['user[resumePath]']) {
        const file = req.files['user[resumePath]'][0];
        user.resumePath = { url: file.path, filename: file.filename };
    }

    try {
        await user.save();
        req.flash('success', 'Profile Updated!');
        res.redirect(`/user/${id}`);
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/user/${id}/edit`);
    }
}));

// DELETE ROUTE
app.delete('/user/:id',isLoggedIn,wrapAsync(async(req,res) =>{
    let {id} = req.params;
    let deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser);
    req.flash('success', 'Profile Deleted!');
    res.redirect('/user');
}));



// SIGNUP ROUTE
app.get('/signup',(req,res) =>{
    res.render('registor/signup.ejs');
});

app.post('/signup',wrapAsync(async(req,res,next) =>{
    try{
        let { name, email, password } = req.body;
        const newCandidate = new candidate({email, name});
        const registeredUser = await candidate.register(newCandidate, password);
        console.log(registeredUser);
        req.login(registeredUser, (error) =>{
            if(error){
                return next(error);
            }
            req.flash('success', 'Welcome to YourHR!!');
            res.redirect('/user');
        })
    } catch(error){
        req.flash('error', error.message);
        res.redirect('/signup');
    }
}));

// LOGIN ROUTE
app.get('/login', (req,res) =>{
    res.render('registor/login.ejs');
});

app.post('/login',passport.authenticate('local', { usernameField: 'email',failureRedirect: '/login', failureFlash: true }),wrapAsync(async(req,res,next) => {
    req.flash('success' ,'Welcome to YourHR!! You are Logged in!');
    let redirectUrl = res.locals.redirectUrl || '/user';
    res.redirect(redirectUrl);
}));



// LOGOUT ROUTE
app.get('/logout', (req, res,next)=>{
    req.logout((error) =>{
        if(error) {
            return next(error);
        }
        req.flash('success', 'Logged Out!!');
        res.redirect('/user');
    });
});



app.all('*', (req, res, next) =>{
    next(new ExpressError(404, 'Page Not Found!!'));
});

app.use((err, req, res, next) =>{
    let { statusCode=500, message='Something went wrong' } = err;
    res.status(statusCode).render('error.ejs', { message });
    // res.status(statusCode).send(message);
});


app.listen(3000,() =>{
    console.log('Server is listening to port 3000');
});