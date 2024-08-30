const User = require('./models/user.js');
const  UserSchema = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');



module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to create your profile!!');
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/user/${id}`);
    }
    next();
}

module.exports.validateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = new User(req.body.user);
        await user.validate(); 
        next();
    } catch (e) {
        next(new ExpressError(400, e.message));
    }
};


