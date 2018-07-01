
// import axios from 'axios'
// import VueAxios from 'vue-axios'

var express = require('express');
var router = express.Router();
var axios = require('axios')
const { Observable } = require('rxjs');
const rxjs = require('rxjs');
const { from: rxjsFrom } = rxjs;
const { map: rxjsMap } = require('rxjs/operators');
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function (req, res, next) {





  // axios.get('http://jsonplaceholder.typicode.com/users/')
  //   .then(function (response) {
  //     console.log(response);
  //     res.send(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


  /* Observer Solution 1 */

  let observable$ = Observable.create((observer) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
  let subscription = observable$.subscribe({
    next: data => res.send(data),
    complete: data => console.log('[complete]'),
  });


  // /* Async - Await Solution */
  // (async function () {
  //   try {
  //     console.log('Async - Await Solution');
  //     const response = await fetch('http://jsonplaceholder.typicode.com/users/');
  //     const json = await response.json();
  //     res.json(json);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })();
});

module.exports = router;
