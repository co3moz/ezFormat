ezFormat
=================

Simple string formatter library for javascript. it can be used in browsers and nodeJS.

installation
-------------

    npm install ezformat


initialization
---------

Just include the ezFormat ones.
```javascript
require("ezformat");
```


examples
----------------

Use `format` prototype function to format string.

```javascript
"Hey {0}, how are you?".format("Angelina"); // "‌Hey Angelina, how are you?"
```

You can give types too.

```javascript
"number {0} in base 16 is {0:base}".format(30); // ‌"number 30 in base 16 is 1e"
```

Also give information about types. Like down.


```javascript
"number {0} in base 2 is {0:base:2}".format(15); // ‌"number 15 in base 2 is 1111"
```

parsing
---------------
Put opener bracket then you can give id of argument, after you can put type or just put closer bracket.
```
{  ARG_ID  }
{  ARG_ID   :  TYPE }
{  ARG_ID   :  TYPE   : MODIFIER }
```

types
-------------
|                  | Type                         | Has modifier?    | Also known as    |
 ----------------- | ---------------------------- | ---------------- | ------------------
| 1                | char                         | no               | c               |
| 2                | bool                         | no               | b               |
| 3                | base                         | yes              | a              |
| 4                | fixed                        | yes              | f              |
| 5                | scientific                   | yes              | s              |
| 6                | json                         | yes              | j              |

### char

Simply makes integer to char

```javascript
"{0:char}{1:char}{2:char}{2:char}{3:char} w{3:char}r{2:char}d".format(104, 101, 108, 111); // "hello world"

// a.k.a.
"{0:c}{1:c}{2:c}{2:c}{3:c} w{3:c}r{2:c}d".format(104, 101, 108, 111); // "hello world"
```

### bool

If integer == 0 then returns false, else returns 1. Also checks null => false.

```javascript
"is connected: {0:bool}".format(15); // "is connected: true"
"is connected: {0:bool}".format(0); // "is connected: false"
"is connected: {0:bool}".format(null); // "is connected: false"

// a.k.a
"is connected: {0:b}".format(null); // "is connected: false"
```

### base

Base transmission type. It has modifier to set base. Default base is 16.

> **Note:**
> Maximum base is 36.

```javascript
"Base 10: {0}, Base 2: {0:base:2}, Base 7: {0:base:7}, Base 16: {0:base}".format(15); // "Base 10: 100, Base 2: 1100100, Base 7: 202, Base 16: 64"
```

### fixed

Determines digits after dot. It has modifier to set digits. Default digit is 0.

> **Note:**
> Maximum digit is 20.

```javascript
"Integer: {0:fixed}, Double: {0}".format(123.4567); // "Integer: 123, Double: 123.4567"
"Cost: {0}{1:fixed:2}".format("$", 23.9); // "Cost: $23.90"
```

### scientific

Changes number to scientific representation. It has modifier to set length of representation.

> **Note:**
> Maximum length is 20.

```javascript
"Mass: {0:scientific}".format(123.4567); // "Mass: 1.234567e+2"
"Mass: {0:scientific:3}".format(123.4567); // "Mass: 1.235e+2"
```

### json

Changes object to json formatted text. It has modifier to determine formatting. If you don't set any modifier then, ezFormat won't give you pretty output, if you give some length then, it gives pretty output.

```javascript
"{0:json}".format([1, 2, {array: [1,2]}]); // "[1,2,{"array":[1,2]}]"
```

for pretty output

```javascript
"{0:json:4}".format([1, 2, {array: [1,2]}]);

// "[
//     1,
//     2,
//     {
//         "array": [
//             1,
//             2
//         ]
//     }
// ]"

```

