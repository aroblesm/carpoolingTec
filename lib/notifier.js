var nodemailer = require('nodemailer');
const User = require('../app_server/model/user');

// Twilio Credentials
const accountSid = 'ACaa53eda78df24a7d5049d418006f4472';
const authToken = '29fb33e2b2b76d8ec98c11a4614856a4';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


function sendRiderSMS(rideReq, rider, driver, meetingPoint) {
    var notificationMessage = 'Hola ' + rider.firstName + ', te encontrarás con ' + driver.firstName + ' en ' + meetingPoint + ', ' + rideReq.area + ' el día ' + rideReq.date + ', ' + rideReq.time + '. Por favor, sea puntual! - carpooling';
    client.messages
        .create({
            to: '+2' + rider.mobileNum,
            from: '+16024564295',
            body: notificationMessage,
        })
        .then((message) => console.log(message.sid));
}

function sendDriverSMS(rideReq, driver, rider, meetingPoint) {
    var notificationMessage = 'Hola ' + driver.firstName + ', te encontrarás con ' + rider.firstName + ' en ' + meetingPoint + ', ' + rideReq.area + ' el día ' + rideReq.date + ', ' + rideReq.time + '. Por favor, sea puntual! - carpooling';
    client.messages
        .create({
            to: '+2' + driver.mobileNum,
            from: '+16024564295',
            body: notificationMessage,
        })
        .then((message) => console.log(message.sid));
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'carpooling.aast.org@gmail.com',
        pass: 'carpooling_org'
    }
});

function sendRiderEmail(rideReq, rider, driver, meetingPoint) {
    var content = 'Hola ' + rider.firstName + ', te encontrarás con ' + driver.firstName + ' ' + driver.lastName + ' en ' + meetingPoint + ', '
        + rideReq.area + ' el día ' +
        rideReq.date + ', ' + rideReq.time + (driver.gender === 'Masculino' ? '. El' : '. Ella') + ' tiene el número de celular: ' +
        driver.mobileNum + '. Por favor, sea puntual! - carpooling';
    var mailOptions = {
        from: 'carpooling.aast.org@gmail.com',
        to: rider.email,
        subject: 'Felicidades, hay coincidencias!',
        text: content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
}

function  sendDriverEmail(rideReq, driver, rider, meetingPoint) {
    var content = 'Hola ' + driver.firstName + ', te encontrarás con ' + rider.firstName + ' ' + rider.lastName + ' en ' + meetingPoint + ', '
        + rideReq.area + ' el día ' +
        rideReq.date + ', ' + rideReq.time + (rider.gender === 'Masculino' ? '. El' : '. Ella') + ' tiene el número de celular: ' +
        rider.mobileNum + '. Por favor, sea puntual! - carpooling';

    var mailOptions = {
        from: 'carpooling.aast.org@gmail.com',
        to: driver.email,
        subject: 'Felicidades, hay coincidencias!',
        text: content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
}

function notifyMatchByEmail(riderReq, driverReq, meetingPoint) {

    User.findOne({_id: riderReq.userId}, function (err, rider) {
        if(err) {
            return;
        }
        User.findOne({_id: driverReq.userId}, function (err, driver) {
            if(err) {
                return;
            }
            sendRiderEmail(riderReq, rider, driver, meetingPoint);
            sendDriverEmail(riderReq, driver, rider, meetingPoint);

            sendRiderSMS(riderReq, rider, driver, meetingPoint);
            sendDriverSMS(riderReq, driver, rider, meetingPoint);
        });
    });
}

module.exports = {
    notifyMatchByEmail: notifyMatchByEmail
};