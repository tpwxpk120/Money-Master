import { connectToMongoDB } from "../db/mydb.js";

// login callback
const loginController = async (req, res) => {
  try {
    var db = await connectToMongoDB();
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(req.body);
    if (!newUser.email || !newUser.password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required fields",
      });
    }

    const user = await db.collection("user").findOne(newUser);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    return res.status(201).json({
      success: true,
      body: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    var db = await connectToMongoDB();
    const data = req.body
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(data);
    console.log(newUser)
    await db.collection("user").insertOne(newUser);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


export { registerController, loginController };



