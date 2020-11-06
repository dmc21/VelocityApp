
const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'ELMEJORTOKENDELAVIDADEVERDADCHORIZACOGORDOLOCO';

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    }

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Email already exists');
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        const dataUser = {
            name: user.name,
            username: user.username,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        // response
        res.send({ dataUser });
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({ username: userData.username }, (err, user) => {
        if (err) return res.status(500).send('Server error!');

        if (!user) {
            // username does not exist
            res.status(409).send({ message: 'USER NOT EXISTS Something is wrong' });
        } else {
            const resultPassword = userData.password == user.password;
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

                const dataUser = {
                    name: user.name,
                    username: user.username,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                };
                user.password = "";
                res.send({ dataUser: dataUser, infoUser: user });
            } else {
                // password wrong
                res.status(409).send({ message: 'PASSWORD Something is wrong' });
            }
        }
    });
}

exports.checkoutLogin = (req, res, next) => {

    const userToken = req.body.token;

    jwt.verify(userToken, SECRET_KEY, (err, verifiedJwt) => {
        if(err){
            res.send(false)
        }else{
            res.send(true)
        }
    })

}
