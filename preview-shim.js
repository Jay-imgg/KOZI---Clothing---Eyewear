/* PREVIEW ONLY. Stands in for js/app.js (header, footer, product grid, countdown)
   so the pages can be viewed here. The cart itself lives in js/shop.js. */
(function () {
  var PAGE = document.body.getAttribute('data-page') || 'index.html';
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  var msg = 'DROP 01 ★ PRE-ORDER NOW ★ CODE KOZI26 ★ ';
  document.body.insertBefore(el('<div class="ticker alt"><div>' + new Array(30).join(msg) + '</div></div>'), document.body.firstChild);
  var links = [['index.html','Home'],['products.html','Shop'],['features.html','Features'],['campaign.html','Campaign'],['contact.html','Contact']];
  var nav = links.map(function (l) { return '<a href="' + l[0] + '"' + (l[0] === PAGE ? ' class="on"' : '') + '>' + l[1] + '</a>'; }).join('');
  document.body.insertBefore(el('<header><a class="logo" href="index.html">KOZI</a><nav aria-label="Main">' + nav + '</nav><button id="cartBtn" type="button">Bag (0)</button></header>'), document.body.children[1]);
  document.body.appendChild(el('<footer><div><h3>KOZI</h3><a href="index.html">Clothing + Eyewear</a><a href="contact.html">Clark Freeport Zone, Angeles City</a></div><div><h3>Explore</h3><a href="products.html">Shop</a><a href="features.html">Features</a><a href="campaign.html">Campaign</a><a href="contact.html">Contact</a></div><div><h3>Follow</h3><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div></footer>'));

  function card(p) {
    return el('<div class="card"><div class="art has-img"><img src="assets/products/' + p.id + '.jpg" alt="' + p.name + '" loading="lazy"></div><div class="body"><small>' + p.category + '</small><h3>' + p.name + '</h3><p><span class="price">' + window.KoziShop.money(p.price) + '</span></p><button class="btn alt" type="button">Add to bag</button></div></div>');
  }
  window.KoziShop.ready.then(function () {
    var C = window.KoziShop.catalog;
    var feat = document.getElementById('featured');
    if (feat) C.slice(0, 4).forEach(function (p) { feat.appendChild(card(p)); });
    var list = document.getElementById('plist');
    if (list) {
      var cat = 'All', q = '';
      var render = function () {
        list.innerHTML = '';
        C.filter(function (p) { return (cat === 'All' || p.category === cat) && (p.name + ' ' + p.desc).toLowerCase().indexOf(q) > -1; })
          .forEach(function (p) { list.appendChild(card(p)); });
      };
      document.querySelectorAll('.chip').forEach(function (b) {
        b.addEventListener('click', function () {
          document.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); cat = b.getAttribute('data-cat'); render();
        });
      });
      var qi = document.getElementById('q'); if (qi) qi.addEventListener('input', function () { q = qi.value.toLowerCase(); render(); });
      render();
    }
  });

  var cd = document.getElementById('cd');
  if (cd) {
    var end = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
    var tick = function () {
      var s = Math.max(0, Math.floor((end - new Date()) / 1000));
      var v = [['Days', Math.floor(s / 86400)], ['Hours', Math.floor(s % 86400 / 3600)], ['Mins', Math.floor(s % 3600 / 60)], ['Secs', s % 60]];
      cd.innerHTML = v.map(function (x) { return '<div>' + String(x[1]).padStart(2, '0') + '<small>' + x[0] + '</small></div>'; }).join('');
    };
    tick(); setInterval(tick, 1000);
  }
  document.querySelectorAll('figure[data-photo]').forEach(function (f) {
    f.classList.add('photo');
    var im = new Image(); im.alt = ''; im.src = f.getAttribute('data-photo'); f.appendChild(im);
  });
  document.querySelectorAll('.rv').forEach(function (e) { e.classList.add('in'); });
  document.querySelectorAll('.bar i[data-w]').forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
})();
