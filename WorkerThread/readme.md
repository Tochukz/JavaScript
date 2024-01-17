# Worker Thread

This project experiments on the Worker thread to implement paralell programming in Node.js .

### How to run

**Generate the workload**  
First you generate a set of JSON files to be processed by the code.

```
$ npm run generate:workload
```

Make sure you have created a _json_ and _xml_ folder in the _workload_ folder before executing the _enerate:workload_ script.

**Process the workload**  
To process the workload using regular method

```
$ npm run parse:regular
```

To Process the workload using parallel programming

```
$ npm run parse:parallel
```
