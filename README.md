# jsHook
Hooking Library for JavaScript

# Usage
```js
const jsHook = await import("https://cdn.jsdelivr.net/gh/4675BBD614B6/jsHook/index.min.js"); 
```

# Examples

Split Hook
```js
jsHook.hook(
  window, "alert", 
  (_, args) => console.log(`Alerting ${args[0]}...`), 
  () => console.log("Alerted")
);
```

Full Hook
```js
jsHook.hook(
  window, "alert",
  (orig, args) => {
    console.log(`Alerting ${args[0]}...`);
    orig.apply(this, args);
    console.log("Alerted");
  }
)
```

Property
```js
let obj = { val: 10 };
jsHook.hook(
  obj, "val",
  val => val, // setter
  val => val + 5 // getter
);
```
