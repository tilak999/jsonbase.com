## jsonbase.com - Node Library

A node wrapper library for <a href='https://www.jsonbase.com'>www.jsonbase.com</a>

## Install
``` shell
npm install --save jsonbase.com
```

### Write Data
```js
const jsonbase = require('jsonbase.com')

// Replace this token with your token (any random string).
const TOKEN = '3c9622697a53d8b2f3cf825dc4160f7e1aad46c1a759475edeb76bce5cd33a64'
// Or use generateBucket() to get unique bucket token
const TOKEN_2 = jsonbase().generateBucket()

const store = jsonbase(TOKEN)

// Any valid JSON object can be written to given end-point
store.write('person',{ Name: 'John Doe', Age: 56 })

// Since jsonbase only allow key-value pairs
// Inner JSON object/Value can't be created or modified directly.
// instead create your own methodology for creating nested childs
store.write('person-email',{ email: 'john@demo.com' })
    .then(console.log)
```

### Read Data
```js
const jsonbase = require('jsonbase.com')

// Replace this token with your token (any random string).
const TOKEN = '3c9622697a53d8b2f3cf825dc4160f7e1aad46c1a759475edeb76bce5cd33a64'

const store = jsonbase(TOKEN)

// Reading data from any JSON object returns promise.
store.read('person').then( (resp) => {
  console.log(resp.data) // { "Name":"John Doe", "Age":56 }
})

store.read('person-email').then( (resp) => {
  console.log(resp.data) // { email: 'john@demo.com' }
})
```

### Delete Data
```js
const jsonbase = require('jsonbase.com')

// Replace this token with your token (any random string).
const TOKEN = '3c9622697a53d8b2f3cf825dc4160f7e1aad46c1a759475edeb76bce5cd33a64'

const store = jsonbase(TOKEN)

// Pass JSON key to delete.
store.delete('person')
```
If you don't pass any key or provide non-existing key to <b>delete</b> method then it will throw error, so check before using delete on a key.

### Limits
<https://jsonbase.com> has some generous free limit, make sure to check the request-limits before using it in real world applications. 

### License
[MIT](LICENSE)
