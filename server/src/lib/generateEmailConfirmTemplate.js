const { sign } = require('jsonwebtoken');

module.exports = function generateEmailConfirmTemplate(id, email) {
    /*
        note:
        refactor this code to generate template for email change verification too
        take a third parameter as the use case
    */
    const payload = {
        id,
        email
    }

    const secret = `${process.env.EMAIL_CONFIRM_SECRET}`;
    const token = sign(payload, secret, { expiresIn: 3600*24 });
    const url = `http://localhost:5500/api/user/confirmEmail/${token}`;

    return {
        from: "freebie <freebiesell@zohomail.com>",
        to: email,
        subject: "Email Confirm",
        html: `<h1>this is html text</h1><p>click this link to confirm signup - ${url}</p>`
    };
}