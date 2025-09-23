(function () {
  var GA_ID = 'G-23G45F9RSG'; // GA4 Measurement ID for Chez Valenti

  function loadGA() {
    if (!GA_ID || GA_ID.indexOf('G-') !== 0) return; // safety
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    // gtag loader
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function hasConsent() {
    try {
      return localStorage.getItem('ga_consent') === 'granted';
    } catch (e) { return false; }
  }

  function setConsent(value) {
    try {
      localStorage.setItem('ga_consent', value);
    } catch (e) {}
  }

  function injectBanner() {
    if (document.getElementById('ga-consent-banner')) return;

    var css = '#ga-consent-banner{position:fixed;left:0;right:0;bottom:0;background:#111;color:#fff;padding:14px;z-index:99999;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Arial}'+
              '#ga-consent-banner .wrap{max-width:1100px;margin:0 auto;display:flex;gap:12px;align-items:center;flex-wrap:wrap}'+
              '#ga-consent-banner button{border:0;padding:10px 14px;border-radius:6px;cursor:pointer}'+
              '#ga-accept{background:#22c55e;color:#08110a} #ga-decline{background:#374151;color:#fff}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'ga-consent-banner';
    bar.innerHTML = '<div class="wrap">\
      <div>We use Google Analytics 4 to understand site usage. Accept to help us improve. You can change this later.</div>\
      <div style="margin-left:auto;display:flex;gap:8px">\
        <button id="ga-accept">Accept</button>\
        <button id="ga-decline">Decline</button>\
      </div>\
    </div>';
    document.body.appendChild(bar);

    document.getElementById('ga-accept').onclick = function () {
      setConsent('granted');
      document.body.removeChild(bar);
      loadGA();
    };
    document.getElementById('ga-decline').onclick = function () {
      setConsent('denied');
      document.body.removeChild(bar);
    };
  }

  function addManageLink() {
    // Optional: expose a function owners can call to reset consent
    window.resetAnalyticsConsent = function(){
      setConsent('');
      alert('Analytics consent reset. Reload the page to see the banner again.');
    };
  }

  // Init
  document.addEventListener('DOMContentLoaded', function(){
    addManageLink();
    if (hasConsent()) {
      loadGA();
    } else {
      injectBanner();
    }
  });
})();