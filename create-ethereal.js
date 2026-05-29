import nodemailer from 'nodemailer';
(async () => {
    try {
        const acct = await nodemailer.createTestAccount();
        console.log(JSON.stringify({ user: acct.user, pass: acct.pass }));
    } catch (e) {
        console.error('failed', e);
        process.exit(1);
    }
})();
