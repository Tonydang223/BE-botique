const Favourites = require("../models/favouriteModels");

const favouriteCtrl = {
  createNewFavourite: async (req, res) => {
    try {
      const idUser = req.query.idUser;
      const idProduct = req.query.idProduct;
      let favourite;
      const user = await Favourites.findOne(idUser);

      if (user) {
        favourite = await Favourites.findOneAndUpdate(idUser, {
          $push: { products: idProduct },
        });
      } else {
        const newFav = new Favourites({
          idUser,
          products: [].push(idProduct),
        })
        await newFav.save();
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = favouriteCtrl;
