const welcomeController = {
  welcome: async (req, res) => {
    return res.status(200).json({ message: "sucessfully", status: 1 });
  },
};
module.exports = welcomeController;
