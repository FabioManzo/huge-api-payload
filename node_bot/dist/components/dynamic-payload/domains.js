"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDomain = getRandomDomain;
const domains = ["webmagnat.ro", "nickelfreesolutions.com", "scheepvaarttelefoongids.nl", "tursan.net", "plannersanonymous.com", "doing.fr", "saltstack.com", "deconsquad.com", "migom.com", "tjprc.org", "worklife.dk", "inno-make.com", "food-hub.org", "bikemastertool.com", "betenbewegen.de", "vk.me", "twotigersports.com", "517mrt.com", "siel.nl", "e-hps.com", "infowheel.com", "synirc.net", "abuliyan.com", "easy-ways.com", "stark.dk", "funwirks.com", "eurocqs.net", "202yx.com", "nikko-sake.com", "xnet.lv", "visionpharma.com", "trade-india.com", "t-bird.edu", "siebel-crm.net", "adriaticapress.it", "41789.com", "autofirenze.biz", "minniowa.com", "sweetteaproper.com", "recruit-dc.co.jp", "competitivecameras.com", "zoncinta.com", "vadim-prostakov.ru", "vk.me", "securitasweb.it", "mandarinclass.my", "pbxi.net", "zyznowski.pl", "meodia.com", "niceinternetmoney.ru", "guardiancaps.com", "bbccable.net", "ams-luenen.de", "ihalehaberbulteni.com", "salvia-community.net", "superpowerfruits.com", "bereyellingergl.com", "downloadfreetvseries.com", "iqshop.ro", "urbancliq.com", "rocket-media.net", "uskudarhaliyikama.org", "ftbp.ro", "savedeo.com", "nanabit.net", "memewood.com", "divorcereform.us", "solarincomefund.com", "novofri.com", "8852088.com", "admil.ru", "rafonline.org", "bois-francs.com", "pieceinch.com", "tel.com", "teenpregnancysc.org", "wisdomforhealth.net", "powgnar.com", "screenmediamag.com", "pricerabbit.com"];
function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
function getRandomDomain() {
    return getRandomItem(domains);
}
