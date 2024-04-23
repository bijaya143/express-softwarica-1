const user = require('../models/userModels')
const bcrypt = require('bcrypt');

// Make a func
    const createUser = async (req, res) => {
        // res.send('Create User API.');
        const {firstName, lastName, email, password} = req.body //Destructuring

        if(!firstName || !lastName || !email || !password) {
            return res.json({success: false,
                message: 'Please enter required fields'
                });
            }
        try {
            const duplicateUser = await getUser(email);
            if(duplicateUser) {
                return res.json({
                success: false,
                message: `User with email: ${email} already exists.`
            });
            }
            delete password;
            req.body.password = await hasPassword(password, 10);
            await user.create(req.body);
            return res.json({
                success: true,
                message: 'User has been created.'
            })
        } catch (error) {
          return res.json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
// create

    const getUser = async (userEmail) => {
        return await user.findOne({email: userEmail});
    }

    /**
     * 
     * @param {*} password 
     * @param {*} salt 
     * @returns hash
     */
    const hasPassword = async(password, salt) => {
        const generatedSalt = bcrypt.genSaltSync(salt);
        const hash = bcrypt.hashSync(password, generatedSalt);
        return hash;
    }

module.exports = {createUser};