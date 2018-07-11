const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();


// client id : 197004613402-8rromdh470li1bu9frvfp7h0pae85cnv.apps.googleusercontent.com
// cleint secret: 5uAJ71YuPHqYJ8aJ31dX_nOP
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
