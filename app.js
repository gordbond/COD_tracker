const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/wz/gordo', (req, res) => {
  request(
    // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Glorbis%232937684?type=wz' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log("FAILED")
        return res.status(500).json({ type: 'error', message: err.message });
      }
      console.log(JSON.parse(body))
      res.json(JSON.parse(body));
    }
  )
});
app.get('/wz/gdaddy', (req, res) => {
    request(
      // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
      { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Flawless%233400635?type=wz' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log("FAILED")
          return res.status(500).json({ type: 'error', message: err.message });
        }
        console.log(JSON.parse(body))
        res.json(JSON.parse(body));
      }
    )
  });
// app.get('/wz/cokeybaby', (req, res) => {
// request(
//     // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//     { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Glorbis%232937684?type=wz' },
//     (error, response, body) => {
//     if (error || response.statusCode !== 200) {
//         console.log("FAILED")
//         return res.status(500).json({ type: 'error', message: err.message });
//     }
//     console.log(JSON.parse(body))
//     res.json(JSON.parse(body));
//     }
// )
// });
// app.get('/wz/camalamadingdong', (req, res) => {
//     request(
//       // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//       { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Glorbis%232937684?type=wz' },
//       (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//           console.log("FAILED")
//           return res.status(500).json({ type: 'error', message: err.message });
//         }
//         console.log(JSON.parse(body))
//         res.json(JSON.parse(body));
//       }
//     )
//   });
// app.get('/wz/beavsy', (req, res) => {
// request(
//     // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//     { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Glorbis%232937684?type=wz' },
//     (error, response, body) => {
//     if (error || response.statusCode !== 200) {
//         console.log("FAILED")
//         return res.status(500).json({ type: 'error', message: err.message });
//     }
//     console.log(JSON.parse(body))
//     res.json(JSON.parse(body));
//     }
// )
// });
// app.get('/wz/boot', (req, res) => {
//     request(
//       // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//       { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Glorbis%232937684?type=wz' },
//       (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//           console.log("FAILED")
//           return res.status(500).json({ type: 'error', message: err.message });
//         }
//         console.log(JSON.parse(body))
//         res.json(JSON.parse(body));
//       }
//     )
//   });
// app.get('/wz/hulzy', (req, res) => {
//     request(
//       // { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//       { url: 'https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/Glorbis%232937684?type=wz' },
//       (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//           console.log("FAILED")
//           return res.status(500).json({ type: 'error', message: err.message });
//         }
//         console.log(JSON.parse(body))
//         res.json(JSON.parse(body));
//       }
//     )
//   });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));