/* Shared site behaviour: booking, theme toggle, menu, years, USD price. */
// Booking — Zoho Bookings modal if its embed script is loaded, else a new tab
var URL_DISCOVERY="https://iam-rajeevsrivastava.zohobookings.in/portal-embed#/439731000000027058";
var URL_AUDIT="https://iam-rajeevsrivastava.zohobookings.in/portal-embed#/439731000000027077";
function book(u){try{if(window.Bookings&&typeof Bookings.modal==="function"){Bookings.modal(u);return;}}catch(e){}window.open(u,"_blank","noopener");}
function openDiscovery(){book(URL_DISCOVERY)}
function openAudit(){book(URL_AUDIT)}

// Theme toggle (remembered)
document.getElementById("themeBtn").addEventListener("click",function(){
  var d=document.documentElement,t=d.getAttribute("data-theme")==="dark"?"light":"dark";
  d.setAttribute("data-theme",t);try{localStorage.setItem("vc_theme",t)}catch(e){}
});

// Years of experience from June 2014
(function(){var s=new Date(2014,5,1),n=new Date(),y=n.getFullYear()-s.getFullYear();if(n.getMonth()<s.getMonth())y--;document.querySelectorAll(".yrs").forEach(function(e){e.textContent=y});})();
document.getElementById("yr").textContent=new Date().getFullYear();

// Mobile menu
var mb=document.querySelector(".menu-btn"),nl=document.getElementById("navLinks");
mb.addEventListener("click",function(){var o=nl.classList.toggle("open");mb.setAttribute("aria-expanded",o);});

// Health Check price in USD (approximate, refreshed hourly)
(function(){var els=document.querySelectorAll(".usd");if(!els.length)return;
function show(r){var v=(9999*r).toFixed(2);els.forEach(function(e){e.textContent="(≈ USD "+v+")";e.title="Approximate, based on today's market rate"});}
var c=null;try{c=JSON.parse(localStorage.getItem("vc_inrusd2")||"null")}catch(e){}
if(c&&Date.now()-c.t<36e5){show(c.r);return;}
function save(r){show(r);try{localStorage.setItem("vc_inrusd2",JSON.stringify({r:r,t:Date.now()}))}catch(e){}}
function er(){return fetch("https://open.er-api.com/v6/latest/INR").then(function(r){return r.json()}).then(function(d){var r=d&&d.rates&&d.rates.USD;if(r)save(r)})}
fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json").then(function(r){return r.json()}).then(function(d){var r=d&&d.inr&&d.inr.usd;if(r)save(r);else return er()}).catch(function(){er().catch(function(){})});})();
