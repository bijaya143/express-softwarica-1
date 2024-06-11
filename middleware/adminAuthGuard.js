const jwt = require('jsonwebtoken')

const adminAuthGuard = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
    return res.status(401).json({
        success: false,
        message: 'User is not authorized.'
        })
    }
    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Token is not passed.'
        })
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(!user.isAdmin) {
            return res.status(401).json({
                success: false,
                message: 'Only Administrator is allowed'
            })
        }
        req.headers.userId = user?.id
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }
}

module.exports = adminAuthGuard