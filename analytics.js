/* ============================================================
 * AirAdmin8 Robotics / Analytics & Shared Extensions
 * ------------------------------------------------------------
 * GA4、Google Tag Manager、SEO基盤、ブランドUI、リンク計測、
 * モバイル品質補正を全ページへ共通適用します。
 * ============================================================ */

(() => {
  'use strict';

  const GA4_MEASUREMENT_ID = 'G-XJYBMMPWWX';
  const GTM_CONTAINER_ID = 'GT-5NXF29HN';

  /**
   * 共通CSSを重複なく読み込みます。
   *
   * @param {string} href CSSファイルのパス
   */
  function loadStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  }

  /**
   * 共通JavaScriptを重複なく読み込みます。
   *
   * @param {string} src JavaScriptファイルのパス
   */
  function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.head.appendChild(script);
  }

  /** Google Tag Managerを読み込みます。 */
  function loadGoogleTagManager() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js'
    });

    const firstScript = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  /** GA4のgtag.jsを読み込みます。 */
  function loadGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: true,
      transport_type: 'beacon'
    });
  }

  /**
   * GTMとGA4へ同じイベントを送信します。
   *
   * @param {string} eventName イベント名
   * @param {Record<string, unknown>} parameters 追加パラメータ
   */
  function trackEvent(eventName, parameters = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  }

  /** 電話、メール、資料、外部開発リソースのクリックを計測します。 */
  function bindLinkTracking() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const label = (link.textContent || '').trim().slice(0, 120);

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { link_url: href, link_text: label });
        return;
      }

      if (href.startsWith('mailto:')) {
        trackEvent('email_click', { link_url: href, link_text: label });
        return;
      }

      if (/\.(pdf|zip|xlsx?|docx?|pptx?)(\?|#|$)/i.test(href)) {
        trackEvent('file_download', { link_url: href, link_text: label });
        return;
      }

      if (/github\.com/i.test(href)) {
        trackEvent('github_click', { link_url: href, link_text: label });
        return;
      }

      if (/huggingface\.co/i.test(href)) {
        trackEvent('huggingface_click', { link_url: href, link_text: label });
        return;
      }

      if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
        trackEvent('outbound_click', { link_url: href, link_text: label });
      }
    });
  }

  /** ブランド、モバイル補正、faviconを読み込みます。 */
  function applySharedAssets() {
    loadStylesheet('site-enhancements.css');
    loadStylesheet('brand-ui.css');
    loadStylesheet('mobile-quality.css');
    loadScript('brand-ui.js');

    document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.remove());

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'assets/favicon.svg';
    document.head.appendChild(favicon);
  }

  /** Canonical、OGP、構造化データを適用します。 */
  function loadSeoFoundation() {
    loadScript('seo-foundation.js');
  }

  loadGoogleTagManager();
  loadGoogleAnalytics();
  bindLinkTracking();
  applySharedAssets();
  loadSeoFoundation();

  window.AirAdmin8Analytics = Object.freeze({ trackEvent });
})();
