const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.singleCharge = async (req, res) => {
  console.log(req.body);
  const { token, total, description } = req.body;
  const amount = Math.round(total * 100);
  try {
    const status = await stripe.charges.create({
      amount,
      currency: "usd",
      description,
      source: token.id,
    });
    res.status(200).json({
      status,
    });
  } catch (error) {
    console.log("ERROR is :" + error);
    res.status(error.statusCode).json(error.message);
  }
};

exports.saveCardAndCharge = async (req, res) => {
  const { token, total, description, cart } = req.body;
  const amount = Math.round(total * 100);
  let { stripeId } = req.body;
  try {
    if (!stripeId) {
      let customer = await stripe.customer.create();
      stripeId = customer.id;
    }
    const source = await stripe.customer.createSource(stripeId, {
      source: token.id,
    });
    const status = await stripe.charges.create({
      amount,
      currency: "usd",
      customer: stripeId,
      description,
      source: source.id,
    });
    serverWork(req, res, customer, cart);
    res.status(200).json({ status });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};
