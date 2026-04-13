/* ============================================================
   A Life of Tender Mercies — nav.js
   ============================================================ */

(function () {
  'use strict';

  /* --- Sticky header shadow on scroll --- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Scroll arrow (cover page) --- */
  var scrollBtn = document.querySelector('.cover__scroll');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector('#begin');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    });
  }

  /* --- Subscribe form (cosmetic — prevent default submit) --- */
  var form = document.querySelector('.subscribe-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button');
      if (input && input.value) {
        if (btn) {
          var original = btn.textContent;
          btn.textContent = 'Thank you';
          btn.style.background = '#4a7a5a';
          setTimeout(function () {
            btn.textContent = original;
            btn.style.background = '';
            input.value = '';
          }, 3000);
        }
      }
    });
  }

})();
