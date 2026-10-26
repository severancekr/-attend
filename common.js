// 출근 관리 시스템 - 공통 기능 (수정하지 않아도 됩니다)
(function () {
  var cfg = window.ATT_CONFIG || {};

  function apiReady() {
    return typeof cfg.API_URL === 'string' && cfg.API_URL.indexOf('https://') === 0;
  }

  // QR에 넣을 직원용 페이지 주소의 기준 (끝에 / 포함)
  // 1) config.js의 WEB_URL  2) 이 페이지가 https로 열렸으면 그 폴더 주소
  function webBase() {
    var w = String(cfg.WEB_URL || '').trim();
    if (w.indexOf('https://') === 0 && w.indexOf('아이디') < 0) return w.charAt(w.length - 1) === '/' ? w : w + '/';
    if (location.protocol === 'https:') return new URL('./', location.href).toString();
    return null;
  }

  async function api(action, data, timeoutMs) {
    if (!apiReady()) throw new Error('config.js에 서버 주소(API_URL)가 설정되지 않았습니다.');
    var body = JSON.stringify(Object.assign({ action: action }, data || {}));
    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, timeoutMs || 15000) : null;
    try {
      var res = await fetch(cfg.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: body,
        redirect: 'follow',
        cache: 'no-store',
        signal: ctrl ? ctrl.signal : undefined
      });
      if (!res.ok) throw new Error('서버 응답 오류 (' + res.status + ')');
      return await res.json();
    } catch (e) {
      if (e && e.name === 'AbortError') throw new Error('서버 응답 시간 초과 (인터넷 연결 확인)');
      throw e;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function enc(s) { return new TextEncoder().encode(s); }

  function toHex(buf) {
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  async function hmacHex(secret, msg) {
    var key = await crypto.subtle.importKey('raw', enc(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    var sig = await crypto.subtle.sign('HMAC', key, enc(msg));
    return toHex(sig);
  }

  // QR 비밀키를 눈으로 대조하기 위한 6자리 확인코드 (관리자 프로그램 [설정] 탭에도 같은 값이 표시됨)
  async function keyCheck(secret) {
    return (await hmacHex(secret, 'keycheck')).substring(0, 6).toUpperCase();
  }

  function randomHex(n) {
    var a = new Uint8Array(n);
    crypto.getRandomValues(a);
    return toHex(a.buffer);
  }

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); return localStorage.getItem(k) === v; } catch (e) { return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { } },
    works: function () {
      try { localStorage.setItem('__att_t', '1'); var ok = localStorage.getItem('__att_t') === '1'; localStorage.removeItem('__att_t'); return ok; }
      catch (e) { return false; }
    }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.ATT = {
    cfg: cfg, api: api, apiReady: apiReady, webBase: webBase, hmacHex: hmacHex, keyCheck: keyCheck,
    randomHex: randomHex, store: store, esc: esc
  };
})();
