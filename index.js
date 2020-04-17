// https://cloudflare-internship.apiazza.workers.dev/

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * @param {Request} request
 */
//returns random integer between 0 and max-1
 function getRandomInt(max){
   //Math.random() gets a decimal between 0 and 1, so multiply by max and get the floor
   return Math.floor(Math.random() * max);
 };

async function handleRequest(request) {

    const resp = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
      .then((response) => {
        return response.json();
      })
      .then((data) => {

          var oneOrTwo = getRandomInt(2);

          if (oneOrTwo == 1) {
            var url = data.variants[1];
          } else {
              var url = data.variants[0];
          };
          return url
      });

      var resp2 = await fetch(resp)
          .then((response) => {
             return response.text();
        });

      return new Response(resp2, {
        headers: { 'content-type': 'text/html' },
      })
}
