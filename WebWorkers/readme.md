**Multithreaded Programs in JavaScript**

# Web Workers (2012)

**By Ido Green**

### Preface

Web Workers allows you to run JavaScript in a separate thread that doesn't interfere with the user interface of your web application.  
Like threads in other technologies, Web Workers are relatively heavyweight. You don’t want to use them in large numbers, as each one consumes significant system resources.

## Chapter 1: Overview

The Web Worker specification defines an API for running computationally intensive code in a thread other than the web application user interface.

If your web application needs to complete a task that takes more than 150 milliseconds, you should consider using a Web Worker.

**What Web Workers Can and Can't Do**  
Workers cannot access the DOM of the parent page, so they can not access the

- _window_ object
- _document_ object
- _parent_ object

As a result they cannot use JavaScript Libraries that depend on these object like _jQuery_.

Web Workers can access

- _navigator_ object
- _location_ object
- _XMLHTTPRequest_ function
- _setTimout_ _clearTimeout_, _setInterval_ and _clearInterval()_ functions
- _importScripts()_ method
- _atob()_ and _btoa()_ functions

_atob()_ and _btoa()_ functions are for conversion between Base 64 ASCII and binary data.

**Types of Web Wokers**  
Web Workers threads run their code synchronously from top to bottom, and then enter an asynchronous phase in which they respond to events and timers.
Based on their execution style, there are two types

1. _Long-running worker_: They register an _onmessage_ event handler and keep listening for new messages. They run in the background continuously and do not exit.  
2. _Single tasked worker_: They never register an _onmessage_ event handler. They run a single task and exit once the operation is done.  

## Chapter 2: How and Where Can We Use Web Workers?

Use web worker to load data from external source and work with it:

```
 importScripts('http://example.com?callBack=handleWorkerResults');
 function handleWorkerResults() {
  postMessage(result);
 }
```

I still need to figure out how to make this work.

## Chapter 3: Dedicated Worker

Dedicated Workers are linked to the script that created them (called the owner or creator).

If you have a large JSON string you wish to parse and it will take ~250 milliseconds (or more), you should use Web Workers.

**Transferable Object**  
There is a new (prefixed) version of postMessage() in Chrome 17+ that supports transferableobjects. It takes two arguments, the ArrayBuffer message and a list of items thatshould be transferred:

```
worker.webkitPostMessage(arrayBuffer, [arrayBuffer]);
```

You can also send messages through the window object. This approach requires adding the targetOrigin because we can post this message to different workers.

```
window.webkitPostMessage(arrayBuffer, targetOrigin, [arrayBuffer]);
```

These approaches allow massive data manipulation, image processing, WebGL textures, etc., to be passed between the Web Worker and the main app with less impacton memory footprint and speed.

## Chpater 4: Inline Worker

The main disadvantage to this technique is that it will be harder to debug your Web Worker JavaScript code. One way to
be more productive would be to test your Web Worker as an external file. Then, only after you are happy with the results, put it back in the page as an inline Web Worker.

## Chapter 5: Shared Worker

**(Todo: Return to the demo scrips)**
Dedicated Workers are linked to the script that created them (called the owner or creator). Shared workers, on the other hand, are named so that any script running in the same origin can communicate with them, either by the URL of the script used to create it, or by name.  
Multiple web application instances can communicate with a single instance of a shared worker. You instatiate then using _new Shared Worker_.  
There are many ways to use a shared worker:

- Use a single shared worker as a entral point of communiation with a server
- Provides a single source of truth fot things line user identifiation, connetion status etc.
- Ensure data consisteny betwen windows of the same web app
- Reduce the memory consumption of multiple web app tabs/windows, by allowinfg sone code (e.g server communications) to be centralized.

The Demos are not working at the moment. I will return back to it later

## Chpater 6: Debug Your Worker

## Chapter 7: Web Workers Beyond the Browser: Node

Web Worker instances are relatively heavyweight and should be long-lived. Launching a Worker and maintaining it's state requires a high per-instance memory cost. Therefore it is more effiient to pass messages to existing Workers to create tasks rather than create a new Web Worker for each work item.

Learn more about Workers for Node JS

- [Blog Post: Going Multithread with Node.js](https://itnext.io/going-multithread-with-node-js-492258ba32cf)
- [Blog Post: Node.js multithreading](https://blog.logrocket.com/node-js-multithreading-what-are-worker-threads-and-why-do-they-matter-48ab102f8b10/)
- [Node.js Doc: Worker Thread](https://nodejs.org/dist/latest-v12.x/docs/api/worker_threads.html)
- [webworker-thread npm module](https://www.npmjs.com/package/webworker-threads)
