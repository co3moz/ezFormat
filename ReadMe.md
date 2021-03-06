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

for browser
```html
<script src="node_modules/ezformat/ezFormat.js"></script>
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
| 7                | padding                      | yes              | p              |

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

## 1.2 update

### object

Now you can use object callings

> **syntax**
> ```javascript
> {<property>}
> {.<property>}
> {<index>.<property>}
> ```

```javascript
"Person: {name}, age: {age}".format({name: "Albert Einstein", age: 18}); // "Person: Albert Einstein, age: 18"
```

supports nested object access too.

```javascript
var item = {
    name: "Cosmos",
    author: {
        name: "Carl Sagan",
        birth: "Nov 9 1934"
    },
    publishDate: "1980",
    pages: 365,
    isbn: [
        "0-394-50294-9 (first edition)",
        "978-0-375-50832-5(2002 edition)",
        "978-0-345-53943-4 (2013 edition)"
    ]
};

"Book of {name}({publishDate}), author {author.name} ({author.birth}) isbn: {isbn.0}".format(item);
```

mark argument
```javascript
var first = {a: 1};
var second = {a: 2};

"{0.a}{1.a}".format(first, second); // "12"
// or
"{a}{1.a}".format(first, second); // "12"
// 0 is default arg
```

> **Note:** Can be cause mistakes when use array in first arg without marking.
> ```javascript
> var array = [1, 1, 2, 3, 5, 8, 13, 21, 34];
> "{0}".format(array); // 1,1,2,3,5,8,13,21,34
> "{.0}".format(array); // 1
> "{0.0}".format(array); // 1
> ```

### toString

You can use toString for printing text.

```javascript
var obj = {
    who: {
        name: "Albert",
        surname: "Einstein",
        toString: function() {
            return this.name + " " + this.surname;
        }
    },
    
    count: 5
};

"Writer: {who}, total: {count}".format(obj); // Writer: Albert Einstein, total: 5
```

### def
If you call undefined object with accessor you probably get null, but if you need to say something can be nullable too then use def

> **syntax**
> ```javascript
> {<body> def<ault?>(<id?>)}
> ```

```javascript
"{0}".format(null); // "null"
"{0 def(1)}".format(null, "default"); // "default"
"{0 def(2)}".format(null, "default"); // ""
"{0 def()}".format(null, "default"); // "" prints nothing if null
"{0 def(0)}".format(null, "default"); // "" checks 0 still null so prints nothing
"{0 json 4 def(1)}".format(null, {error: "notExists"}); // "{\n\t\"error\": \"notExists\"\n}"
```

### space

Now you don't need to use `:` simply use space

```javascript
// compressed
"{0:json:4def(1)}".format(null, {error: "notExists"}); // "{\n\t\"error\": \"notExists\"\n}"

// normal
"{0 json 4 default(1)}".format(null, {error: "notExists"}); // "{\n\t\"error\": \"notExists\"\n}"
```



## 1.3 updates
### ignore
If you set something ignored (`~ignore`) then, ezFormat won't format just jumps.

```javascript
"this will be formatted: {0}, this won't ~ignore{0}".format("me!"); // "this will be formatted: me!, this won't {0}"
```

## 1.4 update

### padding

makes left padding

```javascript
"Padding: {0:padding:5}".format(13); // "Padding: 00013"
```
