var app=function(){"use strict";function e(){}function t(e){return e()}function s(){return Object.create(null)}function i(e){e.forEach(t)}function l(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function c(e,t){e.appendChild(t)}function n(e,t,s){e.insertBefore(t,s||null)}function o(e){e.parentNode.removeChild(e)}function r(e){return document.createElement(e)}function v(){return e=" ",document.createTextNode(e);var e}function j(e,t,s,i){return e.addEventListener(t,s,i),()=>e.removeEventListener(t,s,i)}function g(e,t,s){null==s?e.removeAttribute(t):e.getAttribute(t)!==s&&e.setAttribute(t,s)}function d(e,t,s){e.classList[s?"add":"remove"](t)}let u;function m(e){u=e}const p=[],w=[],h=[],f=[],x=Promise.resolve();let b=!1;function $(e){h.push(e)}let k=!1;const B=new Set;function y(){if(!k){k=!0;do{for(let e=0;e<p.length;e+=1){const t=p[e];m(t),L(t.$$)}for(m(null),p.length=0;w.length;)w.pop()();for(let e=0;e<h.length;e+=1){const t=h[e];B.has(t)||(B.add(t),t())}h.length=0}while(p.length);for(;f.length;)f.pop()();b=!1,k=!1,B.clear()}}function L(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach($)}}const q=new Set;function _(e,t){e&&e.i&&(q.delete(e),e.i(t))}function N(e,s,a,c){const{fragment:n,on_mount:o,on_destroy:r,after_update:v}=e.$$;n&&n.m(s,a),c||$((()=>{const s=o.map(t).filter(l);r?r.push(...s):i(s),e.$$.on_mount=[]})),v.forEach($)}function C(e,t){const s=e.$$;null!==s.fragment&&(i(s.on_destroy),s.fragment&&s.fragment.d(t),s.on_destroy=s.fragment=null,s.ctx=[])}function W(e,t){-1===e.$$.dirty[0]&&(p.push(e),b||(b=!0,x.then(y)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function A(t,l,a,c,n,r,v=[-1]){const j=u;m(t);const g=t.$$={fragment:null,ctx:null,props:r,update:e,not_equal:n,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(j?j.$$.context:l.context||[]),callbacks:s(),dirty:v,skip_bound:!1};let d=!1;if(g.ctx=a?a(t,l.props||{},((e,s,...i)=>{const l=i.length?i[0]:s;return g.ctx&&n(g.ctx[e],g.ctx[e]=l)&&(!g.skip_bound&&g.bound[e]&&g.bound[e](l),d&&W(t,e)),s})):[],g.update(),d=!0,i(g.before_update),g.fragment=!!c&&c(g.ctx),l.target){if(l.hydrate){const e=function(e){return Array.from(e.childNodes)}(l.target);g.fragment&&g.fragment.l(e),e.forEach(o)}else g.fragment&&g.fragment.c();l.intro&&_(t.$$.fragment),N(t,l.target,l.anchor,l.customElement),y()}m(j)}class D{$destroy(){C(this,1),this.$destroy=e}$on(e,t){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(t),()=>{const e=s.indexOf(t);-1!==e&&s.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function M(t){let s,l,a,u,m,p,w,h,f,x,b,$,k,B,y,L,q,_,N,C,W,A,D,M,P,E,O,F,H,S,T,R,U;return{c(){s=v(),l=r("div"),a=v(),u=r("section"),u.innerHTML='<div class="imgSidebar svelte-1gjjtew"><img src="images/bg.jpg" alt="" class="svelte-1gjjtew"/></div> \n    <div class="contentBx svelte-1gjjtew"><h5 class="logoText svelte-1gjjtew">Fl4_Dev</h5> \n        <div class="svelte-1gjjtew"><h4 class="svelte-1gjjtew"><span class="svelte-1gjjtew">Hello</span>, I&#39;m</h4> \n            <h2 class="svelte-1gjjtew">Flavio Oliveira</h2> \n            <h4 class="svelte-1gjjtew">I&#39;m a FullStack Web Developer.</h4> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nemo amet, reiciendis rem ipsum at accusantium aperiam minima iusto ipsam, quasi ab reprehenderit inventore dolorem. Facere voluptatum iure provident cumque!\n            Autem natus sit repudiandae, hic sint ullam molestias ratione vel consectetur!</p> \n            <a href="#0" class="btn svelte-1gjjtew">About Me</a></div> \n        <ul class="sci svelte-1gjjtew"><li class="svelte-1gjjtew"><a href="#0" class="svelte-1gjjtew"><img src="images/facebook.png" alt="facebook" class="svelte-1gjjtew"/></a></li> \n            <li class="svelte-1gjjtew"><a href="#0" class="svelte-1gjjtew"><img src="images/twitter.png" alt="twitter" class="svelte-1gjjtew"/></a></li> \n            <li class="svelte-1gjjtew"><a href="#0" class="svelte-1gjjtew"><img src="images/instagram.png" alt="instagram" class="svelte-1gjjtew"/></a></li></ul></div>',m=v(),p=r("section"),p.innerHTML='<div class="title white svelte-1gjjtew"><h2 class="svelte-1gjjtew">About Us</h2> \n        <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div> \n    <div class="content svelte-1gjjtew"><div class="textBx svelte-1gjjtew"><p class="svelte-1gjjtew">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente laborum voluptate aut error aliquam veritatis deleniti suscipit expedita velit tempora! Ut molestiae commodi quia adipisci consequuntur et a rem ipsum.\n                Distinctio excepturi, veritatis magni eum qui adipisci esse explicabo nam hic possimus ipsam enim nesciunt quisquam ut odit fuga praesentium ipsa sunt doloribus aperiam accusantium voluptatum error amet culpa? Labore?<br class="svelte-1gjjtew"/><br class="svelte-1gjjtew"/>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa repellendus corrupti reiciendis hic facilis adipisci, atque quae, quaerat doloribus unde molestias repudiandae. Minima iusto reprehenderit, fugit expedita labore harum saepe?</p></div> \n        <div class="imgBx svelte-1gjjtew"><img src="images/flavio_pc.PNG" alt="Flavio" class="svelte-1gjjtew"/></div></div>',w=v(),h=r("section"),h.innerHTML='<div class="title svelte-1gjjtew"><h2 class="svelte-1gjjtew">Our Services</h2> \n        <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sapiente repellendus numquam iste impedit dolorum earum minima. Nisi ex eligendi ad illo officia!</p></div> \n    <div class="content svelte-1gjjtew"><div class="servicesBx svelte-1gjjtew"><img src="images/icon1.png" alt="Web Design icon" class="svelte-1gjjtew"/> \n            <h2 class="svelte-1gjjtew">Web Design</h2> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum, dolores soluta aperiam odit nostrum, quae unde voluptatem asperiores delectus dolorum.</p></div> \n        <div class="servicesBx svelte-1gjjtew"><img src="images/icon2.png" alt="Web Design icon" class="svelte-1gjjtew"/> \n            <h2 class="svelte-1gjjtew">Web Development</h2> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum, dolores soluta aperiam odit nostrum, quae unde voluptatem asperiores delectus dolorum.</p></div> \n        <div class="servicesBx svelte-1gjjtew"><img src="images/icon3.png" alt="Web Design icon" class="svelte-1gjjtew"/> \n            <h2 class="svelte-1gjjtew">Android Apps</h2> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum, dolores soluta aperiam odit nostrum, quae unde voluptatem asperiores delectus dolorum.</p></div> \n        <div class="servicesBx svelte-1gjjtew"><img src="images/icon4.png" alt="Web Design icon" class="svelte-1gjjtew"/> \n            <h2 class="svelte-1gjjtew">Photography</h2> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum, dolores soluta aperiam odit nostrum, quae unde voluptatem asperiores delectus dolorum.</p></div> \n        <div class="servicesBx svelte-1gjjtew"><img src="images/icon5.png" alt="Web Design icon" class="svelte-1gjjtew"/> \n            <h2 class="svelte-1gjjtew">Content Writing</h2> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum, dolores soluta aperiam odit nostrum, quae unde voluptatem asperiores delectus dolorum.</p></div> \n        <div class="servicesBx svelte-1gjjtew"><img src="images/icon6.png" alt="Web Design icon" class="svelte-1gjjtew"/> \n            <h2 class="svelte-1gjjtew">Video Editing</h2> \n            <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum, dolores soluta aperiam odit nostrum, quae unde voluptatem asperiores delectus dolorum.</p></div></div>',f=v(),x=r("section"),x.innerHTML='<div class="title svelte-1gjjtew"><h2 class="svelte-1gjjtew">Recent Work</h2> \n        <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sapiente repellendus numquam iste impedit dolorum earum minima. Nisi ex eligendi ad illo officia!</p></div> \n    <div class="content svelte-1gjjtew"><div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img1.jpg" alt="work-1" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 01</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img2.jpg" alt="work-2" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 02</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img3.jpg" alt="work-3" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 03</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img4.jpg" alt="work-4" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 04</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img5.jpg" alt="work-5" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 05</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img6.jpg" alt="work-6" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 06</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img7.jpg" alt="work-7" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 07</h3></div></div> \n        <div class="workBx svelte-1gjjtew"><div class="imgBx svelte-1gjjtew"><img src="images/img8.jpg" alt="work-8" class="svelte-1gjjtew"/></div> \n            <div class="textBx svelte-1gjjtew"><h3 class="svelte-1gjjtew">Project 08</h3></div></div></div>',b=v(),$=r("section"),$.innerHTML='<div class="title white svelte-1gjjtew"><h2 class="svelte-1gjjtew">Contact Us</h2> \n        <p class="svelte-1gjjtew">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sapiente repellendus numquam iste impedit dolorum earum minima. Nisi ex eligendi ad illo officia!</p></div> \n    <div class="contactForm svelte-1gjjtew"><div class="row svelte-1gjjtew"><div class="col50 svelte-1gjjtew"><input type="text" name="" placeholder="First Name" class="svelte-1gjjtew"/></div> \n            <div class="col50 svelte-1gjjtew"><input type="text" name="" placeholder="Last Name" class="svelte-1gjjtew"/></div></div> \n        <div class="row svelte-1gjjtew"><div class="col50 svelte-1gjjtew"><input type="text" name="" placeholder="Email" class="svelte-1gjjtew"/></div> \n            <div class="col50 svelte-1gjjtew"><input type="text" name="" placeholder="Mobile No." class="svelte-1gjjtew"/></div></div> \n        <div class="row svelte-1gjjtew"><div class="col100 svelte-1gjjtew"><textarea placeholder="Message" class="svelte-1gjjtew"></textarea></div></div> \n        <div class="row svelte-1gjjtew"><div class="col100 svelte-1gjjtew"><input type="submit" value="Send" class="svelte-1gjjtew"/></div></div></div>',k=v(),B=r("div"),B.innerHTML='<p class="svelte-1gjjtew">Copyright © 2021 Flavio Oliveira. All Right Reserved.</p>',y=v(),L=r("div"),q=r("ul"),_=r("li"),N=r("a"),N.textContent="Home",C=v(),W=r("li"),A=r("a"),A.textContent="About",D=v(),M=r("li"),P=r("a"),P.textContent="Services",E=v(),O=r("li"),F=r("a"),F.textContent="Work",H=v(),S=r("li"),T=r("a"),T.textContent="Contact",document.title="Flavio Oliveira",g(l,"class","toggle svelte-1gjjtew"),d(l,"active",t[0]),g(u,"class","banner svelte-1gjjtew"),g(u,"id","home"),g(p,"class","about svelte-1gjjtew"),g(p,"id","about"),g(h,"class","services svelte-1gjjtew"),g(h,"id","services"),g(x,"class","work svelte-1gjjtew"),g(x,"id","work"),g($,"class","contact svelte-1gjjtew"),g($,"id","contact"),g(B,"class","copyright svelte-1gjjtew"),g(N,"href","#home"),g(N,"class","svelte-1gjjtew"),d(N,"active",t[0]),g(_,"class","svelte-1gjjtew"),g(A,"href","#about"),g(A,"class","svelte-1gjjtew"),d(A,"active",t[0]),g(W,"class","svelte-1gjjtew"),g(P,"href","#services"),g(P,"class","svelte-1gjjtew"),d(P,"active",t[0]),g(M,"class","svelte-1gjjtew"),g(F,"href","#work"),g(F,"class","svelte-1gjjtew"),d(F,"active",t[0]),g(O,"class","svelte-1gjjtew"),g(T,"href","#contact"),g(T,"class","svelte-1gjjtew"),d(T,"active",t[0]),g(S,"class","svelte-1gjjtew"),g(q,"class","menu svelte-1gjjtew"),g(L,"class","sidebar svelte-1gjjtew"),d(L,"active",t[0])},m(e,i){n(e,s,i),n(e,l,i),n(e,a,i),n(e,u,i),n(e,m,i),n(e,p,i),n(e,w,i),n(e,h,i),n(e,f,i),n(e,x,i),n(e,b,i),n(e,$,i),n(e,k,i),n(e,B,i),n(e,y,i),n(e,L,i),c(L,q),c(q,_),c(_,N),c(q,C),c(q,W),c(W,A),c(q,D),c(q,M),c(M,P),c(q,E),c(q,O),c(O,F),c(q,H),c(q,S),c(S,T),R||(U=[j(l,"click",t[1]),j(N,"click",t[2]),j(A,"click",t[3]),j(P,"click",t[4]),j(F,"click",t[5]),j(T,"click",t[6]),j(L,"click",t[7])],R=!0)},p(e,[t]){1&t&&d(l,"active",e[0]),1&t&&d(N,"active",e[0]),1&t&&d(A,"active",e[0]),1&t&&d(P,"active",e[0]),1&t&&d(F,"active",e[0]),1&t&&d(T,"active",e[0]),1&t&&d(L,"active",e[0])},i:e,o:e,d(e){e&&o(s),e&&o(l),e&&o(a),e&&o(u),e&&o(m),e&&o(p),e&&o(w),e&&o(h),e&&o(f),e&&o(x),e&&o(b),e&&o($),e&&o(k),e&&o(B),e&&o(y),e&&o(L),R=!1,i(U)}}}function P(e,t,s){let i=!1;return[i,()=>s(0,i=!i),()=>i,()=>i,()=>i,()=>i,()=>i,()=>s(0,i=!i)]}class E extends D{constructor(e){super(),A(this,e,P,M,a,{})}}function O(t){let s,i;return s=new E({}),{c(){var e;(e=s.$$.fragment)&&e.c()},m(e,t){N(s,e,t),i=!0},p:e,i(e){i||(_(s.$$.fragment,e),i=!0)},o(e){!function(e,t,s,i){if(e&&e.o){if(q.has(e))return;q.add(e),(void 0).c.push((()=>{q.delete(e),i&&(s&&e.d(1),i())})),e.o(t)}}(s.$$.fragment,e),i=!1},d(e){C(s,e)}}}return new class extends D{constructor(e){super(),A(this,e,null,O,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
