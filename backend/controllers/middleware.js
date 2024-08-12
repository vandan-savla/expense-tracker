require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.isLoggedIn = async (req, res, next) => {

    try {
        // console.log(req.headers.authorization)
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                console.log(token)

                const decoded = jwt.verify(token, process.env.SECRET);

                console.log("this is inside islggedin "+JSON.stringify(decoded))
                if (decoded) {
                    
                    req.user = decoded;
                    // console.log("this is inside islggedin "+ JSON.stringify(req.user))
                    next();
                }else{
                    res.status(401).json({ message: 'Token Verification Failed' })
                }

            }else{
                res.status(401).json({ message: 'Malformed AuthHeader' })
            }
        }else{
            res.status(401).json({ message: 'No AuthHeader' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        // res.status(500).json({ message: 'Middleware Internal Server Error' })
    }
}