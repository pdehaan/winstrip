#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

scrape();

async function scrape() {
  const href = "https://duboisag.com/ca_en/winstrip-tray-by-neversink-2.html";
  const res = await axios.get(href);
  const $ = cheerio.load(res.data);
  const inventory = $('script[type="text/x-magento-init"]')
    .map((i, el) => {
      const txt = $(el.children).text();
      const json = JSON.parse(txt);
      if ("#product_addtocart_form" in json) {
        const d = json["#product_addtocart_form"].configurable?.spConfig?.names;
        if (d) {
          return Object.values(d);
        }
      }
    })
    .get();
  console.log(`> ${href}`);
  console.log(inventory);
}
