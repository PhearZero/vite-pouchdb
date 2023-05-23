export function setupInfoRow(db, element) {
  let changes;
  const setRow = (info = {}) => {
    element.innerHTML = `
          <th aria-busy="${typeof info.db_name === 'undefined'}" scope="row">${info?.db_name || ''}</th>
          <td aria-busy="${typeof info.doc_count === 'undefined'}">${info?.doc_count || ''}</td>
          <td aria-busy="${typeof info.update_seq === 'undefined'}">${info?.update_seq || ''}</td>
          <td aria-busy="${typeof info.adapter === 'undefined'}">${info?.adapter || ''}</td>
          <td aria-busy="${typeof info.auto_compaction === 'undefined'}">${info.auto_compaction}</td>
          <td aria-busy="${typeof info.host === 'undefined'}">${info.host || ''}</td>`;
  };
  const update = () => {
    if (typeof changes !== 'undefined') {
      changes.cancel();
    }

    function dbInfo() {
      db.info().then(info => {
        if (typeof info.host === 'undefined') {
          info.host = 'Browser';
        }
        setRow(info);
      });
    }

    changes = db.changes({
      live: true,
      retry: true,
    }).on('change', dbInfo).on('error', (e) => {
      changes.cancel();
    });

    dbInfo();

  };

  update();
  return {update, setRow};
}
