/**
 * initCount Document
 *
 * Get or create the inital state
 *
 * @param db
 * @returns {*}
 */
function initCount(db) {
  return db.get('count').catch(e => {
    if (e.name === 'not_found') {
      const doc = {_id: 'count', value: 0};
      return db.put(doc).then(res => {
        return {...doc, _rev: res.rev};
      });
    } else {
      throw e;
    }
  });
}

/**
 * setupCounter
 *
 * Handle button element clicks
 *
 * @param db
 * @param element
 */
export function setupCounter(db, element) {
  initCount(db).then(count => {
    const setCounter = () => {
      element.innerHTML = `count is ${count.value}`;
    };
    element.addEventListener('click', () => {
      const doc = {...count, value: count.value + 1};
      db.put(doc).then((res) => {
        count = {...doc, _rev: res.rev};
        setCounter();
      });

    });
    setCounter();
  });
}
