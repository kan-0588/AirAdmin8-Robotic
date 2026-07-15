/* ============================================================
 * AirAdmin8 Robotics V2 / Product Status
 * ------------------------------------------------------------
 * 製品マスタを読み込み、販売終了・一時停止・非公開状態を画面へ反映します。
 * URLは削除せず、代替製品と問い合わせ導線を維持してSEO資産を守ります。
 * ============================================================ */

(() => {
  'use strict';

  const DATA_URL = 'data/products.json';
  const CURRENT_PAGE = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  /**
   * 製品マスタを取得します。
   * 取得失敗時は既存画面を壊さず、警告だけを出して処理を終了します。
   *
   * @returns {Promise<Array<Record<string, unknown>>>}
   */
  async function loadProducts() {
    const response = await fetch(DATA_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`製品マスタを取得できませんでした: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.products) ? data.products : [];
  }

  /**
   * 現在の製品詳細ページに対応する製品を返します。
   *
   * @param {Array<Record<string, unknown>>} products 製品一覧
   * @returns {Record<string, unknown> | undefined}
   */
  function findCurrentProduct(products) {
    return products.find((product) => String(product.page).toLowerCase() === CURRENT_PAGE);
  }

  /**
   * 製品状態に応じた案内パネルを本文先頭へ追加します。
   * active以外の状態だけを対象とし、販売終了時もページを削除しません。
   *
   * @param {Record<string, unknown>} product 対象製品
   * @param {Array<Record<string, unknown>>} products 製品一覧
   */
  function renderStatusNotice(product, products) {
    if (!product || product.status === 'active') return;

    const main = document.querySelector('main');
    if (!main || document.getElementById('product-status-notice')) return;

    const replacement = products.find((item) => item.id === product.replacementId);
    const labels = {
      limited: '取扱条件を確認中',
      temporarily_unavailable: '一時取扱停止',
      discontinued: '販売終了',
      archived: '旧製品情報'
    };

    const section = document.createElement('section');
    section.id = 'product-status-notice';
    section.className = 'section product-status-notice';
    section.innerHTML = `
      <p class="kicker">PRODUCT STATUS</p>
      <h2>${labels[product.status] || '取扱状況を確認中'}</h2>
      <p>
        このページは比較・保守・既存利用者向けの情報として保持しています。
        最新の販売可否、後継機、保守範囲はお問い合わせください。
      </p>
      <div class="center-cta">
        ${replacement ? `<a class="btn primary" href="${replacement.page}">後継製品を見る</a>` : ''}
        <a class="btn ghost" href="contact.html?product=${encodeURIComponent(String(product.id))}">最新状況を確認する</a>
      </div>
    `;

    main.prepend(section);
  }

  /**
   * 製品一覧上で非公開・販売終了製品を安全に扱います。
   * data-product-id属性があるカードだけを対象にします。
   *
   * @param {Array<Record<string, unknown>>} products 製品一覧
   */
  function applyCatalogVisibility(products) {
    document.querySelectorAll('[data-product-id]').forEach((element) => {
      const product = products.find((item) => item.id === element.dataset.productId);
      if (!product) return;

      if (product.visibility !== 'public') {
        element.hidden = true;
        return;
      }

      if (['discontinued', 'archived'].includes(String(product.status))) {
        element.classList.add('is-discontinued');
        element.setAttribute('data-product-status', String(product.status));
      }
    });
  }

  async function initializeProductStatus() {
    try {
      const products = await loadProducts();
      applyCatalogVisibility(products);
      renderStatusNotice(findCurrentProduct(products), products);
    } catch (error) {
      console.warn('[AirAdmin8 Product Status]', error);
    }
  }

  initializeProductStatus();
})();
