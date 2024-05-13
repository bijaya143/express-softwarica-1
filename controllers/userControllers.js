const user = require('../models/userModels')
const bcrypt = require('bcrypt');

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns string
     */
    const createUser = async (req, res) => {
        const {firstName, lastName, email, password} = req.body // Destructuring

        if(!firstName || !lastName || !email || !password) { // Validation
            return res.json({success: false,
                message: 'Please enter required fields'
                });
            }
        try {
            // Existing user
            const duplicateUser = await getUser(email);
            if(duplicateUser) {
                return res.json({
                success: false,
                message: `User with email: ${email} already exists.`
            });
            }
            // Password hashing
            req.body.password = await hasPassword(password, 10);

            // User store
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

    /**
     * 
     * @param {*} userEmail 
     * @returns user
     */
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


    const login = async (req, res) => {
        const {email, password} = req.body // Destructuring

        if(!email || !password) { // Validation
            return res.json({
                success: false,
                message: 'Please enter required fields'
                });
            }
        const user = await getUser(email);
        if(!user) {
            res.json({
                success: false,
                message: 'User does not exist.'
            })
        } else {
            res.json({
                success: true,
                message: 'user has been logged in.'
            })
        }
    }

module.exports = {createUser, login};