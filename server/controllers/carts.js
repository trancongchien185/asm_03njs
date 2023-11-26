import Product from "../models/products.models.js";

export const getCart = (req, res, next) => {
  const cart = req.user.cart.items;
  res.status(200).json(cart);
};

export const postCart = (req, res, next) => {
  console.log("post cart controler");
  console.log(req.body);
  const { productId, quantity } = req.body;

  Product.findById(productId)

    .then((product) => {
      return req.user.addToCart(product, quantity);
    })
    .then((result) => {
      res.status(200).send(result.cart);
    })
    .catch((err) => {
      return next(err);
    });
};

export const deleteCart = (req, res, next) => {
  req.user
    .removeFromCart(req.params.productId)
    .then((result) => {
      res.status(200).send(result.cart);
    })
    .catch((err) => next(err));
};

export const updateCart = (req, res, next) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  req.user
    .updateFromCart(productId, quantity)
    .then((result) => {
      res.status(200).send(result.cart);
    })
    .catch((err) => next(err));
};
