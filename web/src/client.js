import * as sapper from "@sapper/app";

sapper.start({
  target: document.querySelector("#sapper")
});

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-8588525-1");
