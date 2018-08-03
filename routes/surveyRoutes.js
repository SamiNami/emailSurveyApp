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
        console.log('boom');
        const events = req.body.map((email, url) => {
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            // will either be a {} or null
            const match = p.test(pathname);
            if (match) {
                return {
                    email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        });
        // compact removes all undefined records
        const compacEvent = _.compact(event);
        const uniqueEvent = _.uniqBy(compacEvent, 'email', 'surveyId');
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
