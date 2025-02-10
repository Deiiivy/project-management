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
 // login user
export const loginUser = async(req, res) => {
  try {

    const {name, password} = req.body;
    const user = await User.findOne({
      where: {name, password}
    })

    if(!user) {
      res.status(500).send("User no found")
      console.log("user no found")
    }
    const idUser = user.id;
    res.send(`Welcome User: ${user.name}`)
    console.log(`id usuario: ${idUser}`)
  } catch (error){
      console.log(`error al obtener usuario: ` + error)
    }
}
