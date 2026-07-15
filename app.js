/* ============================================================
 * AirAdmin8 Robotics / Application Bootstrap
 * ------------------------------------------------------------
 * 全ページで利用するJavaScriptを、役割ごとのモジュールへ分けて
 * 順番に読み込みます。このファイルには個別機能を実装しません。
 * ============================================================ */

(() => {
  'use strict';

  const modulePaths = [
    'analytics.js',
    'scripts/navigation.js',
    'scripts/page-enhancements.js',
    'scripts/contact-form.js'
  ];

  /**
   * JavaScriptファイルを1つ読み込みます。
   * 既に同じファイルが存在する場合は重複して追加しません。
   *
   * @param {string} source 読み込むJavaScriptのパス
   * @returns {Promise<void>}
   */
  function loadModule(source) {
    if (document.querySelector(`script[src="${source}"]`)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = source;
      script.defer = true;
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener(
        'error',
        () => reject(new Error(`JavaScriptの読み込みに失敗しました: ${source}`)),
        { once: true }
      );
      document.head.appendChild(script);
    });
  }

  /**
   * 依存関係を保つため、共通モジュールを定義順に読み込みます。
   */
  async function bootstrap() {
    try {
      for (const modulePath of modulePaths) {
        await loadModule(modulePath);
      }
    } catch (error) {
      console.error('[AirAdmin8 Bootstrap]', error);
    }
  }

  bootstrap();
})();