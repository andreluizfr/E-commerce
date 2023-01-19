import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({ 
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false, 
    auth: { 
       user: process.env.EMAIL_USER, 
       pass: process.env.EMAIL_PASSWORD
     } 
});

export async function sendVerificationLinkToEmail(email: string, verificationCode: string) {

    const verificationLink = (process.env.BASE_URL_WEB_APP || 'http://localhost:3000') + '/verificacao/' + verificationCode
    await transport.sendMail({
        from: '<noreplay@loja.com>', // sender address
        to: email, // list of receivers
        subject: "Verificação de e-mail na loja", // Subject line
        text: "Se criou uma nova conta na loja, clique no link abaixo para verificar seu e-mail: "+verificationLink, // plain text body
        html: "<div><h1><b>Confirme seu endereço de e-mail</b></h1></div><div>Se criou uma nova conta na loja, clique no link abaixo para verificar seu e-mail:</div><div><h2>"
                +verificationLink+
               "</h2></div>", // html body
    });

}