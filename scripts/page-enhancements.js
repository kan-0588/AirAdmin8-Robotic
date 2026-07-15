/* ============================================================
 * AirAdmin8 Robotics / Page Enhancements
 * ------------------------------------------------------------
 * 既存ページに必要な補助導線と表示内容を追加します。
 * SEO上重要な本文は今後HTMLへ静的移行し、この処理を縮小します。
 * ============================================================ */

(() => {
  'use strict';

  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  /**
   * 旧ページ内リンクを現行ページへ統一します。
   */
  function normalizeLegacyLinks() {
    document
      .querySelectorAll('a[href="index.html#solutions"], a[href="index.html#issues"]')
      .forEach((link) => link.setAttribute('href', 'solutions.html'));
  }

  /**
   * ホームにAirAdmin8の役割を示す3つのカードを追加します。
   */
  function addRoleSectionToHome() {
    if (currentPage !== 'index.html' || document.getElementById('what-we-do')) return;

    const hero = document.querySelector('main > section');
    if (!hero) return;

    const section = document.createElement('section');
    section.id = 'what-we-do';
    section.className = 'section';
    section.innerHTML = `
      <div class="section-head">
        <p class="kicker">WHAT WE DO</p>
        <h2>AIロボットを、選ぶ・つなぐ・実装する。</h2>
        <p class="lead">
          メーカーや製品ありきではなく、課題・環境・予算から複数案を比較します。
          本体、SDK、ROS、センサー、データ、VLAをつなぎ、PoCから調達・運用まで支援します。
        </p>
      </div>
      <div class="a8-role-grid">
        <article class="card">
          <b>01 選ぶ</b>
          <h3>最適な候補を比較する</h3>
          <p>同じタスクに複数の形態・メーカーを並べ、強み、弱み、未確認事項を整理します。</p>
        </article>
        <article class="card">
          <b>02 つなぐ</b>
          <h3>技術とシステムを接続する</h3>
          <p>本体、ハンド、センサー、SDK、ROS、API、データ収集、VLAを一つの構成にします。</p>
        </article>
        <article class="card">
          <b>03 実装する</b>
          <h3>現場で使える状態まで進める</h3>
          <p>PoC、評価、調達、安全、初期設定、教育、保守・運用まで一貫して支援します。</p>
        </article>
      </div>
      <div class="center-cta">
        <a class="btn primary" href="solutions.html">課題から探す</a>
        <a class="btn ghost" href="manufacturers.html">メーカーから探す</a>
      </div>
    `;

    hero.insertAdjacentElement('afterend', section);
  }

  /**
   * ホームへ、購入できる支援内容と安全・保守の入口を追加します。
   * 技術情報だけでなく、具体的な成果物と責任範囲を早い段階で示します。
   */
  function addBusinessReadySectionToHome() {
    if (currentPage !== 'index.html' || document.getElementById('business-ready')) return;

    const quickEntry = document.getElementById('quick-entry');
    const main = document.querySelector('main');
    if (!main) return;

    const section = document.createElement('section');
    section.id = 'business-ready';
    section.className = 'section soft';
    section.innerHTML = `
      <div class="section-head">
        <p class="kicker">BUSINESS READY</p>
        <h2>製品だけでなく、導入の進め方まで選べます。</h2>
        <p class="lead">
          大学研究、巡回・点検PoC、VLAデータ収集を標準パッケージ化。
          保証、修理、安全、支援範囲も事前に整理します。
        </p>
      </div>
      <div class="cards">
        <article>
          <h3>大学研究導入</h3>
          <p>製品比較、SDK、正式見積、二社見積、大学購買、検収まで。</p>
          <a href="package-university-research.html">支援内容を見る →</a>
        </article>
        <article>
          <h3>巡回・点検PoC</h3>
          <p>現場条件、候補比較、KPI、経路、センサー、評価方法まで。</p>
          <a href="package-inspection-poc.html">PoC構成を見る →</a>
        </article>
        <article>
          <h3>VLAデータ収集</h3>
          <p>遠隔操作、機器、データ形式、品質評価、学習環境への接続まで。</p>
          <a href="package-vla-data.html">収集構成を見る →</a>
        </article>
        <article>
          <h3>安全・保守</h3>
          <p>保証、初期不良、修理、部品、SDK支援、責任範囲を明確化。</p>
          <a href="safety-support.html">支援範囲を見る →</a>
        </article>
      </div>
      <div class="center-cta">
        <a class="btn primary" href="service-packages.html">支援パッケージを比較する</a>
        <a class="btn ghost" href="contact.html?intent=package">自社に合う進め方を確認する</a>
      </div>
    `;

    if (quickEntry) {
      quickEntry.insertAdjacentElement('afterend', section);
    } else {
      main.appendChild(section);
    }
  }

  /**
   * AGIBOT G2ページへ比較、メーカー、開発資料の導線を追加します。
   */
  function addRelatedNavigationToG2() {
    if (currentPage !== 'product-agibot-g2.html') return;

    const main = document.querySelector('main');
    if (!main || document.getElementById('related-navigation')) return;

    const section = document.createElement('section');
    section.id = 'related-navigation';
    section.className = 'section soft';
    section.innerHTML = `
      <div class="section-head">
        <p class="kicker">RELATED NAVIGATION</p>
        <h2>比較・メーカー・開発資料を行き来する。</h2>
      </div>
      <div class="center-cta">
        <a class="btn primary" href="series-mobile-humanoid.html">同カテゴリと比較する</a>
        <a class="btn ghost" href="manufacturer-agibot.html">AGIBOT全体を見る</a>
        <a class="btn ghost" href="resources.html?manufacturer=agibot&product=g2">G2の開発資料を見る</a>
      </div>
    `;

    main.appendChild(section);
  }

  /**
   * 導入プロセスの表示内容を全ページで統一します。
   */
  function normalizeProcessSection() {
    const processSection = document.getElementById('process');
    if (!processSection) return;

    const steps = [
      ['01', '課題整理', '目的・現場・成功条件を確認'],
      ['02', '候補比較', '形態・メーカー・構成を比較'],
      ['03', 'PoC設計', 'KPI・期間・役割分担を定義'],
      ['04', '調達・導入', '見積・安全・初期設定を実施'],
      ['05', '運用・改善', '教育・保守・データで継続改善']
    ];

    const cards = processSection.querySelectorAll('.choice-flow > div');
    cards.forEach((card, index) => {
      const step = steps[index];
      if (!step) return;

      const [number, title, description] = step;
      card.innerHTML = `
        <b>${number}</b>
        <span>${title}</span>
        <small>${description}</small>
      `;
    });
  }

  normalizeLegacyLinks();
  addRoleSectionToHome();
  addBusinessReadySectionToHome();
  addRelatedNavigationToG2();
  normalizeProcessSection();
})();
