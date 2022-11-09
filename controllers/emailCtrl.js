const Carts = require("../models/cartModels");
const History = require("../models/historyModels");
const mailer = require("../mailer");

const emailCtrl = {
  sendEmail: async (req, res) => {
    try {
      const { email, fullname, phone, address, idUser } = req.body;
      const subject = "Hóa Đơn Đặt Hàng";

      //Tìm những sản phẩm User đã thêm hàng
      const cartsUser = await Carts.find({ idUser: idUser });

      const total = totalCaculating(cartsUser);

      const htmlHead =
        '<table style="width:50%">' +
        '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>';

      let htmlContent = "";

      for (let i = 0; i < cartsUser.length; i++) {
        htmlContent +=
          "<tr>" +
          '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
          cartsUser[i].nameProduct +
          "</td>" +
          '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' +
          cartsUser[i].img.url +
          '" width="80" height="80"></td>' +
          '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
          cartsUser[i].priceProduct +
          "$</td>" +
          '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
          cartsUser[i].count +
          "</td>" +
          '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
          parseInt(cartsUser[i].priceProduct) * parseInt(cartsUser[i].count) +
          "$</td><tr>";
      }

      const htmlResult =
        "<h1>Xin Chào " +
        fullname +
        "</h1>" +
        "<h3>Phone: " +
        phone +
        "</h3>" +
        "<h3>Address:" +
        address +
        "</h3>" +
        htmlHead +
        htmlContent +
        "<h1>Tổng Thanh Toán: " +
        total +
        "$</br>" +
        "<p>Cảm ơn bạn!</p>";

      // Thực hiện gửi email (to, subject, htmlContent)
      await mailer.sendMail(email, subject, htmlResult);

      let carts = [];

      cartsUser.map((value) => {
        return carts.push(value);
      });

      const data = {
        userId: idUser,
        cart: carts,
        amount: total,
        address: { fullname, phone, address },
      };

      History.insertMany(data);

      Carts.deleteMany({ idUser: idUser })
        .then(function () {
          res.send("Thanh Cong");
        })
        .catch(function (error) {
          res.send(error);
        });
    } catch (err) {
      console.log("🚀 ~ file: emailCtrl.js ~ line 85 ~ sendEmail: ~ err", err.message)
      return res.status(500).json({ msg: err.message });
    }
  },
};

const totalCaculating = (item) => {
  const itemPrice = item.reduce(
    (a, c) => a + parseInt(c.priceProduct) * parseInt(c.count),
    0
  );
  const taxPrice = itemPrice * 0.1;
  const taxPrices = taxPrice;
  const shippingPrice = itemPrice > 2000 ? 0 : 50;
  const totalPrice = itemPrice + shippingPrice;
  return totalPrice;
};

module.exports = emailCtrl;
