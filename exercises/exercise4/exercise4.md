## Exercise 4
Consider the following javascript code:  

```javascript
setTimeout(() => console.log('This may or may not be last'), 4005)
console.log('this will run first')
new Promise(res =>{
  console.log('inside first promise')
  setTimeout(res,4000, 'Nikola')
  console.log('at the end of first promise')
}).then(name => console.log(name))
let promise = new Promise((res) => {
  console.log('inside second promise')
  res(8)
})
promise.then(val => {
  console.log('thennnnnnnning')
  console.log(val)
})
console.log('this will not be last')
```

In the answer field below type the output from the following code (try and reason it out first and not run it) and then explain why the output is what it is using what we have covered in lecture about how javascript handles asynchronous code even though it has a single thread.  


### Answer: 
(put your answer here)  
output:
this will run first
inside first promise
at the end of first promise
inside second promise
this will not be last
thennnnnnnning
8
Nikola
This may or may not be last

1. `setTimeout(() => console.log('This may or may not be last'), 4005)`: gets push to callback queue, waiting for execution
2. `console.log('this will run first')`
3. new promise: `console.log('inside first promise')`
4. `setTimeout(res,4000, 'Nikola')`: gets push to callback queue, waiting for execution
5. `console.log('at the end of first promise')`
6. let promise = new Promise...: `console.log('inside second promise')`
7. `promise.then(val => {console.log('thennnnnnnning') console.log(val)})` gets push to callback queue
8. `console.log('this will not be last')`
9. main stack is empty
10. job queue has higher priority, so `console.log('thennnnnnnning')`
  `console.log(val)` prior to `setTimeout(res,4000, 'Nikola')`
11. `setTimeout(res,4000, 'Nikola')`
12. `console.log('This may or may not be last')`