class profileController {
  getProfile = async (req, res, next) => {
    try {
      res.render("profile");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new profileController();
