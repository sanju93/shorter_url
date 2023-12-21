import User from "../models/users.models.js";

//Users controller which will handle all the functionality for indentification of  users
class UsersController {

  //for creating the account of user
  async SignUp(req, res) {
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(404).send("User Already There");
      } else {
        user = await User.create({
          email,
          password,
        });
        res.setHeader("Content-Type", "application/json");
        return res
          .status(200)
          .json({
            user,
            original_url: req.newUrl.original_url,
            shorter_url: req.newUrl.shorter_url,
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server Error");
    }
  }
// for login 
  SignIn(req, res) {
    res.setHeader("Content-Type", "application/json");
    return res
      .status(200)
      .json({
        user: req.user,
        original_url: req.newUrl.original_url,
        shorter_url: req.newUrl.shorter_url,
      });
  }
// for logout 
  Logout(req, res) {
    req.logout((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    res.setHeader("Content-Type", "application/json");

    return res
      .status(200)
      .json({
        message: "user logout successfully}",
        original_url: req.newUrl.original_url,
        shorter_url: req.newUrl.shorter_url,
      });
  }
}

export default UsersController;
