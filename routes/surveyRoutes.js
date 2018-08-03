const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (get, req) => {});

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        const events = req.body.map(event => {
            console.log('-----', event);
            const pathname = new URL(event.url).pathname;
            console.log('PATHNAME:', pathname);
            const p = new Path('/api/surveys/:surveyId/:choice');
            console.log(p.test(pathname));
        });
        // res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(',')
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        // Send out email!
        // first argument is a model with the subject and the recipients,
        // second argument is for the body, a html template.
        try {
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
