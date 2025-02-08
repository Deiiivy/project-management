import User from '../models/user.js'

// create user
 
export const createUser = async(req, res) => {
  try {
   const {name, password} = req.body
    const newUser = await User.create({name: name, password: password})
    await newUser.save();
    res.send("user create success")
    console.log("user create")
  }
    catch (error) {
    console.log('error al crear usuario: ' + error)
  }
}


