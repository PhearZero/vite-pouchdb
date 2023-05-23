export function setupStatus(db, remote, element, onPaused = () => {
}, onError = () => {
}) {
  let _sync;
  let _status;
  const setStatus = (status) => {
    _status = status;
    element.innerHTML = status;
  };

  setStatus('loading');

  if (typeof _sync !== 'undefined') {
    _sync.cancel();
  }

  _sync = db.sync(remote, {live: true, retry: true})
    .on('complete', (s) => setStatus('complete'))
    .on('change', (s) => setStatus('change', s))
    .on('paused', (s) => {

      setStatus('paused', s);
      onPaused();
    })
    .on('active', (s) => setStatus('active', s))
    .on('error', onError);


  return setStatus;
}
