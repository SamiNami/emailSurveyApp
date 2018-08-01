const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
    emails = removeLastComma(emails);
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        // we want to keep the invalid emails
        .filter(email => !re.test(email));

    if (invalidEmails.length) {
        return `These emails are invalid ${invalidEmails}`;
    }
};

function removeLastComma(str) {
    return str.replace(/,(\s+)?$/, '');
}
