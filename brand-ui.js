/* ============================================================
 * AirAdmin8 Robotics / Brand UI Controller
 * ------------------------------------------------------------
 * ロゴ表示とCookie同意UIの見た目を、全ページで統一します。
 * Cookie実装が外部タグから挿入される場合にも対応するため、
 * DOM追加後に対象要素を検出して専用クラスを付与します。
 * ============================================================ */

(() => {
  'use strict';

  const COOKIE_MESSAGE_KEYWORDS = [
    'クッキーを使用しています',
    'Cookieを使用しています',
    '利便性の向上を目的にクッキーを使用'
  ];

  /**
   * 対象要素の文章がCookie同意文言に該当するか判定します。
   *
   * @param {Element} element 判定対象の要素
   * @returns {boolean} Cookie同意文言を含む場合はtrue
   */
  function containsCookieMessage(element) {
    const text = element.textContent?.replace(/\s+/g, ' ').trim() || '';
    return COOKIE_MESSAGE_KEYWORDS.some((keyword) => text.includes(keyword));
  }

  /**
   * Cookie文言を含む要素から、表示パネル本体を探します。
   * ボタンを含む最も近い親要素を優先して返します。
   *
   * @param {Element} element Cookie文言を含む要素
   * @returns {Element} 装飾対象のパネル要素
   */
  function findCookiePanel(element) {
    let current = element;

    for (let depth = 0; depth < 6 && current; depth += 1) {
      if (current.querySelectorAll('button, a').length >= 2) {
        return current;
      }
      current = current.parentElement;
    }

    return element.parentElement || element;
  }

  /**
   * 外部タグ等で追加されたCookie同意パネルへ共通クラスを付与します。
   * 既に処理済みの要素は再処理しません。
   */
  function normalizeCookiePanel() {
    const candidates = document.querySelectorAll('body *');

    for (const element of candidates) {
      if (!containsCookieMessage(element)) continue;

      const panel = findCookiePanel(element);
      if (panel.classList.contains('a8-cookie-panel')) return;

      panel.classList.add('a8-cookie-panel');
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-label', 'Cookie設定');
      return;
    }
  }

  /**
   * 動的に挿入されるUIを監視し、Cookieパネルを検出した時点で補正します。
   */
  function observeDynamicUi() {
    const observer = new MutationObserver(() => {
      normalizeCookiePanel();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * 共通ブランドUIを初期化します。
   */
  function initializeBrandUi() {
    normalizeCookiePanel();
    observeDynamicUi();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBrandUi, { once: true });
  } else {
    initializeBrandUi();
  }
})();
