/* Theme: visitor's choice wins; otherwise follow the visitor's local time (light 6am–6pm, dark otherwise). */
(function(){
  var KEY="vc_theme",d=document.documentElement,saved=null;
  try{saved=localStorage.getItem(KEY)}catch(e){}
  function auto(){var h=new Date().getHours();return (h>=6&&h<18)?"light":"dark"}
  function apply(t){d.setAttribute("data-theme",t);var b=document.querySelector(".theme-btn");if(b){b.textContent=t==="dark"?"☀":"☾";b.setAttribute("aria-label",t==="dark"?"Switch to light theme":"Switch to dark theme");b.title=b.getAttribute("aria-label")}}
  apply(saved==="light"||saved==="dark"?saved:auto());
  document.addEventListener("DOMContentLoaded",function(){
    var nav=document.querySelector(".nav"),menu=document.querySelector(".menu-btn");if(!nav)return;
    var b=document.createElement("button");b.className="theme-btn";b.type="button";
    nav.insertBefore(b,menu);apply(d.getAttribute("data-theme"));
    b.addEventListener("click",function(){var t=d.getAttribute("data-theme")==="dark"?"light":"dark";apply(t);try{localStorage.setItem(KEY,t)}catch(e){}});
  });
})();
