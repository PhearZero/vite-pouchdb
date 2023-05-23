import javascriptLogo from '/javascript.svg'
import viteLogo from '/vite.svg'
import pouchLogo from '/pouchdb.svg'
import { setupCounter } from './counter.js'
import {setupInfoRow} from "./row.js";
import {setupStatus} from "./status.js";
import PouchDB from 'pouchdb'

console.log(import.meta.env.MODE)

const db = new PouchDB('test')
const remote = new PouchDB(window.location.origin + '/db/test')

document.querySelector('#app').innerHTML = `
<div class="flex-row">
<a class="unstyled" href="https://vitejs.dev" target="_blank">
    <img src="${viteLogo}" class="logo vite" alt="Vite logo"/>
</a>
<a class="unstyled" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
</a>
<a class="unstyled" href="https://pouchdb.com" target="_blank">
    <img src="${pouchLogo}" class="logo pouch" alt="JavaScript logo"/>
</a>
</div>
<hgroup>
    <h2>Hello Vite PouchDB!</h2>
    <h3>Administration URL: <a href="/db/_utils/" target="_blank">@Fauxton</a></h3>
</hgroup>
<div class="button-row">
    <button id="counter"  class="no-margin" type="button">Loading</button>
</div>
<article class="no-padding">
    <header class="no-margin">
        <hgroup class="left compact">
            <h4>Database</h4>
            <h5>Replication: <span id="status"></span></h5>
        </hgroup>
    </header>
    <div class="spaced">
    <figure class="compact">
        <table>
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Documents</th>
                <th scope="col">Sequence</th>
                <th scope="col">Adapter</th>
                <th scope="col">Compact</th>
                <th scope="col">Host</th>
            </tr>
            </thead>
            <tbody>
            <tr id="idb"></tr>
            <tr id="http"></tr>
            </tbody>
        </table>
    </figure>
    </div>
</article>
<p id="error" class="compact"></p>
<p class="read-the-docs compact">
    Click on the Vite logo to learn more
</p>
`
setupCounter(db, document.querySelector('#counter'))
setupInfoRow(db, document.querySelector('#idb'))
setupInfoRow(remote, document.querySelector('#http'))
setupStatus(db, remote, document.querySelector('#status'))
