__Multithreaded Programs in JavaScript__  
# Web Workers (2012) 
__By Ido Green__  

### Preface 
Web Workers allows you to run JavaScript in a separate thread that doesn't interfere with the user interface of your web application.   
Like threads in other technologies, Web Workers are relatively heavyweight. You don’t want to use them in large numbers, as each one consumes significant system resources.

## Chapter 1: Overview
The Web Worker specification defined an API for running computationally intensive code in a thread other than the web application user interface.  

If you web application needs to complete a task that takes more than 150 milliseconds, you should consider using a Web Worker. 

__What Web Workers Can and Can't Do__   
Workers cannot access the DOM of the parent page, so they can not access the   
* _window_ object
* _document_ object
* _parent_ object

As a result they cannot use JavaScript Libraries that depend on these object like _jQuery_.  

Web Workers can access 
* _navigator_ object
* _location_ object 
* _XMLHTTPRequest_ function 
* _setTimout_ _clearTimeout_, _setINterval_ and _clearInterval()_ functions
*  _importScripts()_ method
* _atob()_  and _btoa()_ functions  

_atob()_  and _btoa()_ functions are for conversion between Base 64 ASCII and binary data. 

__Types of Web Wokers__   
Based on their execution style,ther are two types  
1. _Long-running workrer_: The register an _nmessage_ event handler and keep listening for new messages. They run in the baxckground continuously and do not exit.  
2. _Single tasked worker_: The never register an _onmessage_ event handler. The run a single task and exit once the operation is done.  

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
If you have a large JSON string you wish to parse and it will take ~250 milliseconds (or more), you should use Web Workers. 

__Transferable Object__  
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