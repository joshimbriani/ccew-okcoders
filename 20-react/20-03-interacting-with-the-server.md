Interacting with the server
===========================

In React we generally interact with the server via the [https://caniuse.com/#feat=fetch](fetch API).

What does a request with the fetch API look like? 
```
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```

This is a simple GET request with this API. We give it a URL and then it returns a Promise. Promises are better than callbacks since using them you can make JS behave more syncronously if you want. The .then are basically just saying 'once you get a response, then convert it to a JSON object, then once that's done, log the string'.

Now what if we want to make a POST/PUT/DELETE request? We just pass it in an optional options dictionary to the API. Let's take a look at what a more complex reuqest looks like!

```
fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}
```

In this example we can see that we're passing a bunch of parameters in order to show you what can be done! 

And this API can be used anywhere in your React applications! 