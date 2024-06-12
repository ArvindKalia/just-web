const tokenService = require("../services/token.service")
const dbService = require("../services/database.service")

const createUser = async (request, response) => {
    // console.log(request.body)
    const token = await tokenService.verifyToken(request)
    // console.log(token)
    const data = token.data
    if (token.isVerify) {

        try {
            const userRes = await dbService.createRecord(data, "userSchema")
            // console.log(userRes)
            response.status(200)
            response.json({
                isUserCreated:true,
                message:"User Created"
            })
        }
        catch (error) {
            response.json({
                isUserCreated:false,
                message:"Internal Server Error"
            })
        }
    }
    else {
        response.status(401)
        response.json("Permission denied")
    }
}

module.exports = {
    createUser: createUser
}