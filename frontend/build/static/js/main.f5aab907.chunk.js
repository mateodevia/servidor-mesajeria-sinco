(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{41:function(e,t,n){e.exports=n.p+"static/media/LogoSinco.62291b0f.svg"},46:function(e,t,n){e.exports=n(93)},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},89:function(e,t){},92:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(40),c=n.n(o),s=n(94),l=n(3),i=(n(51),n(52),n(53),n(41)),u=n.n(i);var d=Object(s.d)((function(e){return Object(a.useEffect)((function(){window.sessionStorage.username||e.history.push("/")}),[]),r.a.createElement("div",{className:"headerContainer"},r.a.createElement("img",{className:"logo",src:u.a,onClick:function(){return e.history.push("/")}}),r.a.createElement("div",{className:"misProcesos"===e.selected?"selected title":"title",onClick:function(){return e.history.push("/misprocesos")}},"Mis Procesos"),r.a.createElement("div",{className:"crearProceso"===e.selected?"selected title":"title",onClick:function(){return e.history.push("/crearproceso")}},"Crear Proceso"))}));n(58);var m=Object(s.d)((function(e){var t=Object(a.useRef)();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"loginContainer"},r.a.createElement("h1",null,"Bienvenido"),r.a.createElement("h2",null,"Para ingresar al manejador de procesos de Sincosoft ingrese su identificador de usuario"),r.a.createElement("input",{ref:t,type:"text",placeholder:"Identificador del usuario"}),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){""===t.current.value?alert("El usuario no es valido"):(window.sessionStorage.username=t.current.value,e.history.push("/misprocesos"))}},"Entrar")))})),f=n(45),p=n(8),E=(n(59),n(44)),h=n.n(E);var v=Object(s.d)((function(e){var t=Object(a.useState)(void 0),n=Object(p.a)(t,2),o=n[0],c=n[1],s=Object(a.useState)(void 0),l=Object(p.a)(s,2),i=l[0],u=l[1],d=function(e){return 100*(e.exitosos+e.fallidos)/e.cantidad+"%"},m=h()("/");return Object(a.useEffect)((function(){return fetch("/clients/".concat(window.sessionStorage.username,"/processes")).then((function(e){e.json().then((function(e){c(e)}))})),m.on("connect",(function(){console.log("Main socket opnened"),m.emit("suscribeTo",window.sessionStorage.username)})),m.on("update",(function(e){u(e)})),function(){return m.close()}}),[]),Object(a.useEffect)((function(){if(o){var e=Object(f.a)(o);for(var t in e)e[t].tipo===i.tipo&&(e[t]=i);console.log(i),console.log(e),c(e)}}),[i]),r.a.createElement("div",{className:"processesContainer"},r.a.createElement("h1",null,"Mis Procesos"),!o&&r.a.createElement("h4",null,"Cargando..."),0===(null===o||void 0===o?void 0:o.length)&&r.a.createElement("h4",null,"No hay procesos activos"),null===o||void 0===o?void 0:o.map((function(e,t){return r.a.createElement("div",{key:t,className:"processContainer"},r.a.createElement("h3",null,e.tipo),r.a.createElement("div",{className:"processFlex"},r.a.createElement("div",{className:"statisticContainer"},r.a.createElement("div",{className:"greenCircle"}),r.a.createElement("h5",null,"Exitosos: ",e.exitosos)),r.a.createElement("div",{className:"statisticContainer"},r.a.createElement("div",{className:"redCircle"}),r.a.createElement("h5",null,"Fallidos: ",e.fallidos))),r.a.createElement("div",{className:"progressBar"},r.a.createElement("div",{style:{width:d(e)}})))})))}));n(92);var b=Object(s.d)((function(e){var t=Object(a.useState)(!1),n=Object(p.a)(t,2),o=n[0],c=n[1],s=Object(a.useRef)(),l=Object(a.useRef)();return r.a.createElement("div",{className:"createProcessContainer"},r.a.createElement("h1",null,"Crear Proceso"),r.a.createElement("h3",null,"Por favor ingrese el tipo de proceso, y la cantidad de procesos que quiere mandar a ejecutar"),r.a.createElement("input",{ref:s,type:"text",placeholder:"Tipo de proceso",disabled:o}),r.a.createElement("input",{ref:l,type:"number",placeholder:"Cantidad",disabled:o}),r.a.createElement("button",{disabled:o,onClick:function(){""!=s.current.value&&""!=l.current.value?(c(!0),fetch("/clients/".concat(window.sessionStorage.username,"/processes"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:s.current.value,quantity:parseInt(l.current.value)})}).then((function(e){e.json().then((function(e){e.error?alert(e.error):(alert(e.msg),c(!1))}))}))):alert("Porfavor llene todosl los campos")}},"Crear"))}));var g=Object(s.d)((function(e){return r.a.createElement("div",null,r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",render:function(){return r.a.createElement(m,null)}}),r.a.createElement(s.a,{path:"/misprocesos",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{selected:"misProcesos"}),r.a.createElement(v,null))}}),r.a.createElement(s.a,{path:"/crearproceso",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{selected:"crearProceso"}),r.a.createElement(b,null))}})))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var j=Object(l.a)();c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s.b,{history:j},r.a.createElement(g,{history:j}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[46,1,2]]]);
//# sourceMappingURL=main.f5aab907.chunk.js.map