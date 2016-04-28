

# Javascript Dictionary

이 문서는 다음의 순서로 전개된다

1. 정의 및 개념이해
2. Dictionary 클래스 기본 구조
3. Dictionary 클래스 예제
4. Dictionary 클래스의 부가 함수
5. Dictionary 클래스의 부가 함수 예제
6. Dictionary 클래스 응용 - 정렬(sort)
7. Dictionary 클래스 응용 - 정렬(sort) 예제

_ _ _
## 1. 정의 및 개념이해

### 1.1 정의
Dictionary는 전화번호부에 이름과 전화번호를 저장하는 것 처럼 데이터를 key, value 쌍으로 저장하는 자료 구조이다.
<div class="tem">
누군가의 전화번호를 검색하려면 그 사람의 이름을 검색한 후 이름 옆의 전화번호를 확인해야한다. 키로 검색을 수행하며, 검색 결과로 값을 반환한다.
</div>


### 1.2 개념이해
Dictionary 클래스는 내부적으로 `Object` 클래스가 아니라 `Array`클래스를 이용한다 자우에 딕셔너리의 키를 정렬하는 내용이 나오는데 자바스크립트는 `Object`클래스의 프로퍼티를 정렬하지 못한다. 하지만 어차피 자바스크립트의 모든 것은 객체(Object)이므로 배열 역시 객체라는 사실을 기억하자.


_ _ _
## 2. Dictionary 클래스 기본 구조
여기서부터는 본격적으로 Dictionary class  코드를 보며 각 기능에 대해서 정리해보려고 한다. 기본 구조는 다음과 같이 나눠 볼 수 있다.

- 2.1 Dictionary class 정의
- 2.2 add function 정의
- 2.3 find function 정의
- 2.4 remove function 정의
- 2.5 showAll function 정의
- 2.6 Dictionary Class 전체코드 한번에보기


#### 2.1 Dictionary class 정의

<pre class="highlight"><code class="js">
function Dictionary(){
    this.datastore = new Array();
}
</code></pre>


#### 2.2 add() function 정의

<pre class="highlight"><code class="js">
function add(key, value){
    this.datastore[key] = value;
}
</code></pre>


#### 2.3 find() function 정의

<pre class="highlight"><code class="js">
function find(key){
    return this.datastore[key];
}
</code></pre>

`find()`함수는 키를 인자로 받아 키와 관련된 값을 반환한다.


#### 2.4 remove() function 정의

<pre class="highlight"><code class="js">
function remove(key){
    delete this.datastore[key];
}
</code></pre>

딕셔너리의 키(key)와 값(value)쌍을 지울 때는 자바스크립트의 내장함수 `delete`를 사용한다. `delete`함수는 `Object`클래스의 일부이며 인자로 키 레퍼런스를 받는다. `remove()`함수는 키와 값 쌍을 동시에 삭제한다.

#### 2.5 showAll() function 정의

<pre class="highlight"><code class="js">
function showAll(){
    for each (var key in Object.keys(this.datastore)) {
        print(key + " -> " + this.datastore[key]);
    }
}
</code></pre>
딕셔너리의 모든 키와 값 쌍을 확인할 수 있는 기능이다. `showAll()`함수는 `Object`에 호출한 `keys()`함수는 객체에 저장된 모든 키를 반환한다.

#### 2.6 Dictionary Class 전체코드 한번에보기

<pre class="highlight"><code class="js">


//Dictionary class 정의
function Dictionary(){
    this.datastore = new Array();
}

//add function
function add(key, value){
    this.datastroe[key] = value;
}

//find function
function find(key){
    return this.datastore[key];
}

//remove function
function remove(key){
    delete this.datastore[key];
}

//showAll function
function showAll(){
    for each (var key in Object.keys(this.datastore)){
        print(key + " -> " + this.datastore[key]);
    }
}
</code></pre>


_ _ _
## 3. Dictionary 클래스 예제

<pre class="highlight"><code class="js">
load("Dictionary.js");
var pbook = new Dictionary();
pbook.add("Mike", "123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
print("David's extension : " + pbook.find("David");
// David's extension : 345
</code></pre>


<pre class="highlight"><code class="js">
pbook.remove("David");
pbook.showAll();
// Mike -> 123
// Cynthia -> 456
</code></pre>


_ _ _
## 4. Dictionary 클래스의 부가 함수
지금까지 살펴본 함수 외에 특별한 기능을 수행하는 몇 가지 함수를 더 정의할 수 있다.
>예를 들어 딕셔너리에 몇 개의 항목이 저장되어 있는지 알 수 있으면 편리할 것이다.

Dictionary 클래스의 부가함수에 대해서는 다음과 같은 내용이 포함되어 있다.
- 4.1 count function 정의
- 4.2 claer function 정의
- 4.3 부가함수 포함 전체 Dictionary Class Code



 다음은 `count()`함수의 정의다.

#### 4.1 count function 정의

<pre class="highlight"><code class="js">
function count(){
    var n = 0;
    for each (var key in keys(this.datastore)) {
        ++n;
    }
    return n;
}
</code></pre>
`count()`함수에서 왜 `length`프로퍼티를 사용하지 않는지 의아해할 수 있다 `length`프로퍼티는 문자열 키에서는 제대로 동작하지 않기 때문이다. 다음 예제를 확인해 보자.

<pre class="highlight"><code class="js">
var nums() = new Array();
nums[0] = 1;
nums[1] = 2;
print(nums.length); //2 출력.

var pbook = new Array();
pbook["David"] = 1;
pbook["Jennifer"] = 2;
print(pbook.length); //0 출력
</code></pre>


#### 4.2 clearfunction 정의

<pre class="highlight"><code class="js">
function clear(){
    for each(var key in keys(this.datastore)){
        delete this.datastore[key];
    }
}
</code></pre>
이 `clear()`함수는 모든 항목을 삭제한다.

#### 4.3 추가기능 포함 전체 Dictionary Class Code
여기까지의 전체코드를 다시한번 살펴보자

<div class="tem">
복습은 언제나 좋은 것이다. 제대로 하자. - 탬
</div>

<pre class="highlight"><code class="js">
//Dictionary function 정의
function Dictionary(){
    this.datastore = new Array;

    this.add = add;
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;

}

//add function
function add(key, value){
    this.datastore[key] = value;
}
//find function
function find(key){
    return this.datastore[key];
}
//remove function
function remove(key){
    delete this.datastore[key];
}
//showAll function
function showAll(){
    for each (var key in Object.keys(this.datastore)){
        print (key + "->" + this.datastore[key]);
    }
}
//count function
function count(){
    var n;
    for each(var key in Object.keys(this.datastore)){
        ++n;
    }
    return n;
}
//claer function
function clear(){
    for each (var key in Object.keys(this.datastore)){
        delete this.datastore[key];
    }
}

</code></pre>

_ _ _
## 5. Dictionary 클래스의 부가 함수 예제
지금까지 살펴본 함수를 바탕으로 간단한 예제코드를 작성하고, 기능을 확인해보자.

<pre class="highlight"><code class="js">
load("Dictionary.js");
var pbook = new Dictionary();
pbook.add("Raymond", "123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
</code></pre>
먼저 앞에서 했던 예제와 동일하게 코드를 로드한뒤, 딕셔너리를 생성한다. 그다음도 마찬가지로 3개의 key와 value를 딕셔너리에 추가한다.

<pre class="highlight"><code class="js">
print ("Number of entries: " + pbook.count());
//Number of entries : 3
</code></pre>
그다음 방금 부가기능으로 추가했던 `count()` 함수를 실행해본다. 실행결과로 `pbook` 딕셔너리에 우리가 추가한 요소(element)의 수인 "3"이 출력된다.

<pre class="highlight"><code class="js">
pbook.showAll();
pbook.clear();
print("Number of entries : " + pbook.count());

//showAll()의 결과
//Raymond -> 123
//David -> 345
//Cynthia -> 456

//clear()의 결과
//Number of entries : 0
</code></pre>
위 코드에서는 마찬가지로 부가기능으로 추가해준 `clear()`기능을 확인할 수 있다. `clear()`기능을 확인하기 위해, 앞서 추가했던 `showAll()`함수로 딕셔너리안에 어떤 요소들이 있는지 확인하고, 그다음 `clear()`를 실행한 후, `count()` 함수를 실행해 남아있는 요소가 몇개인지를 확인한다.

> clear() 후 showAll()함수를 실행도 무방하다.





_ _ _
## 6. Dictionary 클래스 응용 - 정렬(sort)
키를 이용해 값을 얻는 것이 딕셔너리의 핵심 기능이다 딕셔너리에 저장된 항목의 순서는 중요하지 않다 하지만 딕셔너리의 항목을 정렬된 순서로 확인해야 할 때가 있다 어떠헥 하면 딕셔너리 항목을 정렬할 수 있는지 살펴보자.

### 6.1 Dicrtionary Sorting - Array
<pre class="highlight"><code class="js">
var a = new Array();
a[0] = "Mike";
a[1] = "David";
print(a); // Mike, David 출력

a.sort();
print(a); //David, Mike 출력
</code></pre>
하지만 문자열 키에는 앞과 같은 방식을 이용할 수 없다 문자열 키에서는 아무 결과도 출력되지 않는다. 앞서 `count()`함수를 정의하면서 이미 같은 문제를 설명했다.

이 문제는 쉽게 해결할 수 있다. 사용자가 어떤 데이터를 저장하든 출력 결과를 정렬할 수 있다 우리는 Object.keys()함수를 이용해 이 문제를 해결한다. 다음은 showAll() 함수 정의를 고친 결과다.


<pre class="highlight"><code class="js">
function showAll(){
    for each (var key in Object.keys(this.datastore).sort()){ //sort()가 추가되었다.
        print key + " -> " + this.datastore[key];
    }
}
</code></pre>
위 코드에서 기존 `showAll()`코드 내부의 `Object.keys()`함수 뒤에 `sort()`함수가 추가되었다는 것을 확인할 수 있다.

### 6.1 Dicrtionary Sorting - 정렬(Sort)예제
위에서 간단히 살펴본 `sort()`의 기능을 테스트해보자.

<pre class="highlight"><code class="js">
load("Dictionary.js");
var pbook = new Dictionary();
pbook.add("Raymond", "123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
pbook.add("Danny", "012");
pbook.add("Jonathan", "666");
pbook.showAll();
//출력 결과
//Cynthia -> 456
//Danny -> 012
//David -> 345
//Jennifer -> 987
//Jonathan -> 666
//Mike -> 723
//Raymond -> 123
</code></pre>


## 7. Dictionary 클래스 응용 - 정렬(sort) 예제