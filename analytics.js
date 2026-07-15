/*
 * AirAdmin8 Robotics 計測基盤
 *
 * GA4 と Google Tag Manager を全ページへ共通適用します。
 * ページ側では app.js から本ファイルを読み込みます。
 */
(() => {
  'use strict';

  const GA4_MEASUREMENT_ID = 'G-XJYBMMPWWX';
  const GTM_CONTAINER_ID = 'GT-5NXF29HN';

  /**
   * Google Tag Manager を読み込みます。
   */
  const loadGoogleTagManager = () => {
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
  };

  /**
   * GA4 の gtag.js を読み込みます。
   */
  const loadGoogleAnalytics = () => {
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
  };

  /**
   * GTM と GA4 の両方へ同じイベントを送信します。
   */
  const trackEvent = (eventName, parameters = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  };

  /**
   * 電話・メール・資料・外部開発リソースのクリックを計測します。
   */
  const bindLinkTracking = () => {
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
  };

  loadGoogleTagManager();
  loadGoogleAnalytics();
  bindLinkTracking();

  window.AirAdmin8Analytics = Object.freeze({ trackEvent });
})();
