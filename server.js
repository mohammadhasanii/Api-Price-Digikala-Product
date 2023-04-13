import express from "express";
import axios from "axios";

const app = express();
async function getPriceProduct(productId) {
  const data = await axios
    .get(`https://api.digikala.com/v1/product/${productId}/`)
    .then((res) => {
      return res.data;
    }).catch(err=>{return err})

  return data;
}
async function data(productId) {
  const price = await getPriceProduct(productId);
  const nowData = await price.data.product.variants;
  let finalData = [];
  await nowData.forEach(async (element, index) => {
    const data = {
      id: element.id,
      rank: element.rank,
      warranty: element.warranty,
      color: element.color,
      seller: element.seller,
      price: element.price,
    };
    finalData.push(await data);
  });

  console.log(finalData);
  return finalData;
}

app.get("/:id", async function (req, res) {
  const productId = await req.params.id;
  const getProduct = await data(productId);
  return res.json(getProduct);
});

app.listen(5000);
