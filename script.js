/* ===========================================================
   PIKTOKALA — interactions
   =========================================================== */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Shutter intro ---------- */
  var intro = document.getElementById('shutterIntro');
  function runIntro(){
    if(!intro) return;
    if(reduceMotion){
      intro.style.display = 'none';
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    window.setTimeout(function(){
      intro.classList.add('animate-out');
      window.setTimeout(function(){
        intro.classList.add('done');
        intro.style.display = 'none';
        document.body.style.overflow = '';
        flash();
      }, 1050);
    }, 420);
  }
  window.addEventListener('load', runIntro);
  // Safety net in case load event is delayed by slow images
  window.setTimeout(function(){
    if(intro && !intro.classList.contains('done')) runIntro();
  }, 2200);

  /* ---------- Aperture blades (SVG) ---------- */
  (function drawAperture(){
    var g = document.getElementById('apertureBlades');
    if(!g) return;
    var ns = 'http://www.w3.org/2000/svg';
    var cx = 200, cy = 200, n = 8, rOuter = 235, rInner = 60;
    for(var i=0;i<n;i++){
      var a0 = (i / n) * Math.PI * 2;
      var a1 = ((i+1) / n) * Math.PI * 2;
      var x1 = cx + rInner * Math.cos(a0), y1 = cy + rInner * Math.sin(a0);
      var x2 = cx + rOuter * Math.cos(a0 - 0.5), y2 = cy + rOuter * Math.sin(a0 - 0.5);
      var x3 = cx + rOuter * Math.cos(a1 - 0.5), y3 = cy + rOuter * Math.sin(a1 - 0.5);
      var x4 = cx + rInner * Math.cos(a1), y4 = cy + rInner * Math.sin(a1);
      var path = document.createElementNS(ns,'path');
      path.setAttribute('d', 'M'+x1+','+y1+' L'+x2+','+y2+' L'+x3+','+y3+' L'+x4+','+y4+' Z');
      path.setAttribute('fill', 'rgba(242,183,5,0.05)');
      path.setAttribute('stroke', 'rgba(242,183,5,0.18)');
      path.setAttribute('stroke-width', '1');
      g.appendChild(path);
    }
  })();

  /* ---------- Flash pulse ---------- */
  var flashEl = document.getElementById('flashOverlay');
  function flash(){
    if(reduceMotion || !flashEl) return;
    flashEl.classList.remove('flash');
    // force reflow to restart animation
    void flashEl.offsetWidth;
    flashEl.classList.add('flash');
  }

  document.querySelectorAll('.a-item, .join-qr, .nav-brand').forEach(function(el){
    el.addEventListener('click', function(){ flash(); });
  });

  /* ---------- Custom lens cursor (fine pointers only) ---------- */
  if(window.matchMedia('(pointer: fine)').matches && !reduceMotion){
    document.body.classList.add('cursor-on');
    var cursor = document.getElementById('lensCursor');
    var cx = window.innerWidth/2, cy = window.innerHeight/2, tx = cx, ty = cy;
    window.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
    function loop(){
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if(cursor){ cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)'; }
      requestAnimationFrame(loop);
    }
    loop();
    var hoverTargets = 'a, button, .a-item, .frame, .t-card, .chip, .polaroid, .join-card';
    document.querySelectorAll(hoverTargets).forEach(function(el){
      el.addEventListener('mouseenter', function(){ cursor && cursor.classList.add('hover'); });
      el.addEventListener('mouseleave', function(){ cursor && cursor.classList.remove('hover'); });
    });
  }

  /* ---------- Nav: scrolled state, hide-on-scroll-down, active link ---------- */
  var nav = document.getElementById('siteNav');
  var lastY = window.scrollY;
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navLinkEls = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  function onScroll(){
    var y = window.scrollY;
    if(nav){
      nav.classList.toggle('scrolled', y > 40);
      if(y > lastY && y > 200){ nav.classList.add('hide-nav'); }
      else { nav.classList.remove('hide-nav'); }
    }
    lastY = y;

    var probe = y + window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function(sec){
      if(sec.offsetTop <= probe) current = sec.id;
    });
    navLinkEls.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- Smooth-scroll with nav offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id.length < 2) return;
      var target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      var offset = 76;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in-view'); });
  }

  // Add stagger class to grids for nicer group reveals
  ['.activities-grid', '.team-grid', '.join-grid'].forEach(function(sel){
    var el = document.querySelector(sel);
    if(el) el.classList.add('stagger');
  });

})();
