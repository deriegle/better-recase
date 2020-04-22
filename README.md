# Recase

Recursive object key recasing library built in Typescript based on
[the OG Recase library](https://github.com/solderjs/recase-js).

## Why should I use this library instead?

1. It has an easier API to use.
2. It has been tested more thoroughly.
3. It has better documentation.
4. It supports `CamelCaps`

## Usage

**Add this package using your favorite package manager**:

```bash
npm install better-recase
# or
yarn add better-recase
```

**Import the package**:

```javascript
import Recase from 'better-recase'
```

#### `snakeCopy`

Change `camelCopy` object to `snake_copy`:

```javascript
const result = Recase.snakeCopy({
  camelCopy: {
    camelCopy: true,
    randomCamelCopy: true
  },
  myDate: new Date(),
  myKey: true,
  already_snake_copy: "I won't change"
})

console.log(result)
/*
{
    camel_copy: {
        camel_copy: true,
        random_camel_copy: true,
    },
    my_date: new Date(),
    my_key: true,
    already_snake_copy: 'I won\'t change',
}
*/
```

### `camelCopy`

Change `snake_copy` object to `camelCopy`:

```javascript
const result = Recase.camelCopy({
  snake_copy: {
    snake_copy: true,
    random_snake_copy: false
  },
  my_date: new Date(),
  my_key: true,
  alreadyCamelCase: "I won't change"
})

console.log(result)
/*
{
    snakeCopy: {
        snakeCopy: true,
        randomSnakeCopy: true,
    },
    myDate: new Date(),
    myKey: true,
    alreadyCamelCase: 'I won\'t change',
}
*/
```

### `camelize` or `snakify`

Change string from `snake_copy` to `camelCopy`:

```javascript
const keyToChange = 'date_of_birth';
const changedCamelKey Recase.camelize(keyToChange);

console.log(changedCamelKey);
// dateOfBirth
```

Change string from `camelCopy` to `snake_copy`

```javascript
const keyToChange = 'dateOfBirth';
const changedSnakeKey Recase.snakify(keyToChange);

console.log(changedCamelKey);
// date_of_birth
```
