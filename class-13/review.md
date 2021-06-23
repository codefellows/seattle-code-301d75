# Code Challenge Review

## Number 5, email

### A

```js
const validateEmail = (email) => {
  return /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)?@[a-z]*(\.com|\.net|\.org)$/.test(email);
};
```

### B

```js
const validateEmail = (email) => {
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@\b((?=[a-z0-9-]{1,63}\.)[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b$/
  // ^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$
  return regex.test(email);
  // Solution code here...
  // /^.*\.*.*(\@.+[.com .net, .org])$/
};
```

## Number 6, phone numbers

### A

```js
const validatePhoneNumber = (phoneNumber) => {
  const regex = /^(\([0-9]{3,3}\)|[0-9]{3,3})[\- ]?[0-9]{3,3}[\- ]?[0-9]{4,4}$/
  return regex.test(phoneNumber)
};
```

### B

```js
const validatePhoneNumber = (phoneNumber) => {
  return /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/.test(phoneNumber);
};
```
