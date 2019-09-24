const _STATE_PARAM_KEY = '__rus';
const _INIT_ACTION_TYPE = 'REACT_URL_STORE_INIT';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wraps a function and forwards results to a callback.
// Drops pending calls when a new call comes in,
// but always eventually returns the latest result.
//
//         \       \   \  \
// wrapped -\-------\---\--\------------
//           \       \   \  ~~~~~   <<< Wait a bit (predict cancel)
//            \       \   \      \
// await f ----???-----??x-?x-----???---
//                \                  \
//      cb -----------------------------
const withEagerLatestRace = (f, cb, limitMs = 300) => {
  let ctr = 0;
  let tLast = 0;
  return async (...args) => {
    const myCtr = ctr += 1;
    const tWait = tLast + limitMs - performance.now();
    if (tWait > 0) {
      await sleep(tWait);
    }

    if (ctr !== myCtr) {
      return;
    }

    tLast = performance.now();
    const result = await f(...args);
    if (ctr === myCtr) {
      cb(result, args);
    }
  };
};

// TODO: Fix for non-ascii.
function encodeState(state) {
  return window.btoa(JSON.stringify(state));
}

function decodeState(encodedState) {
  if (!encodedState) {
    return null;
  }

  try {
    return JSON.parse(window.atob(encodedState));
  } catch (error) {
    console.error(error);
    return null;
  }
}

function putStateInUrl(state) {
  const urlParams = new URLSearchParams(window.location.search);
  const encoded = encodeState(state);
  urlParams.set(_STATE_PARAM_KEY, encoded);
  window.history.replaceState(null, null, `${window.location.pathname}?${urlParams}`);
}

function loadInitialState() {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeState(urlParams.get(_STATE_PARAM_KEY)) || {};
}

function createUrlStoreMiddleware(timeoutMs = 500) {
  return ({ dispatch, getState }) => (next) => {
    const maybeUpdateStore = withEagerLatestRace(
      () => {},
      () => {
        putStateInUrl(getState());
      },
      timeoutMs,
    );

    return (action) => {
      const result = next(action);
      maybeUpdateStore();
      return result;
    };
  };
}

const urlStoreMiddleware = createUrlStoreMiddleware();
export { loadInitialState, urlStoreMiddleware };
