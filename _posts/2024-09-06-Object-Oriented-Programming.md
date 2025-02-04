---
layout: post
title: Object Oriented Programming
date: 2024-09-06 12:27:00
description: 객체 지향 프로그래밍
tags: Object_Oriented_Programming OOP
categories: CS
toc:
  beginning: true
---

# 객체 지향 프로그래밍Object-Oriented
절차 지향과 달리 객체 지향은 ‘현실 세계에 존재하는 **객체(object)**를 어떻게 모델링 할 것인가?’에 대한 물음에서 출발한다.
## 캡슐화Encapsulation
우리는 저마다의 특성을 기준으로 객체를 분류하거나 계층을 만들 수 있다. 승민, 지현, 현수는 모두 다른 사람이지만 ‘사람’이라는 계층(클래스)에 속하고 각각은 객체로서 남들과는 다른 특성을 가지고 있다.  
 또한 사람은 잠을 자거나 숨을 쉬기와 같은 행동을 할 수 있다. 이처럼 객체는 고유의 특성 값과 행동 혹은 기능으로 표현할 수 있다.  
 현실 세계의 객체를 나타내려면 변수와 함수만 있으면 된다. 현실 세계를 모델링하거나 프로그램을 구현하는데 이처럼 **변수와 함수를 가진 객체를 이용하는 프로그래밍 패러다임을 ‘객체 지향 프로그래밍’**이라고 하며, **변수와 함수를 하나의 단위로 묶는 것을 ‘캡슐화’**라고 한다.  
 위의 내용을 응용해서 사람과 사람 간에 돈을 주고받는 행위를 코드로 나타내보자.
```python
def person_init(name, money):
	obj = {'name' : name, 'money' : money } 
	obj['give_money'] = person[1] 
	obj['get_money'] = person[2]
	obj['show'] = perseon[3]
	return[obj]

def give_money(self, other, money): #1
    self['money'] -= money
    other['get_money'](other, money) #2

def get_money(self, money):
    self['money'] += money

def show(self):
    print('{} : {}'.format(self['name'], self['money']))

Person = person_init, give_money, get_money, show #3

if __name__ == "__main__":
    # 객체 생성
    g = Person[0]('greg', 5000)
    j = Person[0]('john', 2000)

    g['show'](g)
    j['show'](j)
    print('')
    
    # 메시지 패싱 
    g['give_money'](g, j, 2000)  #4
    
    g['show'](g)
    j['show'](j)

(base) greg : 5000
	   john : 2000

	   greg : 3000
	   john : 4000
```
 #1 아래의 세 함수 중 give\_money() 함수는 두 객체 간에 상호작용이 일어나 각자가 가지고 있는 데이터를 변경하고,  #2의 other 객체를 통해 돈을 받는 객체가 가진 특정 함수를 호출하여 변경한다. 이처럼 **서로 다른 객체가 함수 호출을 통해 상호작용하여 객체의 상태가 변하는 것**을 **메시지 패싱(message passing)**이라고 한다. 기억해야 할 부분은 서로 다른 객체가 상호작용할 때 함수를 호출했다는 것과 함수 안에서 상대의 변수를 바꾸려면 상대가 가진 특정 함수를 호출해야 한다는 점이다.  
 #3는 단지 함수들을 튜플로 묶고있지만 클래스처럼 동작한다. 또한 #4에서 함수를 호출할 때 함수에 전달된 첫 인자가 호출한 객체 자신임을 인지하고 클래스를 사용해 객체를 만들어보자.
## 클래스Class
클래스를 정의하면 다음과 같다.
1. 객체라는 메모리 공간을 할당 한 다음
2. 객체 안에 묶인 변수를 초기화하고
3. 함수를 호출하는 데 필요한 것
클래스는 객체를 생성해 내는 템플릿이고, 객체는 클래스를 이용해 만들어진 변수와 함수를 가진 메모리 공간이다.  
 객체와 유사한 개념으로는 **인스턴스(instance)**가 있다. 인스턴스는 이 객체가 어떤 클래서에서 만들어졌는지에 초점을 맞춘 용어이다.  
 이제 위에서 작성한 Person을 클래스를 이용해 만들어보자.
```python
class Person:                           #1
    def __init__(self, name, money):    #2
        self.name = name                #3
        self.money = money
    def give_money(self, other, money): #4
        self.money -= money
        other.get_money(money)
    def get_money(self, money):
        self.money += money
    def show(self):
        print('{} : {}'.format(self.name, self.money))
```
0. 클래스로 묶이는 변수를 **프로퍼티, 멤버 변수, 멤버**라고 부르며 객체가 가지는 멤버를 **인스턴스 멤버**라고 부른다. 클래스에 묶이는 함수는 **멤버 함수, 메서드**라고 부르며 멤버와 메서드를 합쳐 **‘속성(attribute)’**이라고 부른다.
1. 클래스를 선언한다.
	클래스 이름은 관용적으로 대문자로 작성한다. 
2. \_\_init \_\_() 함수는 생성자(constructor)이다. 언더바 두개는 **’메직 메서드’**라고 불리며, 클래스의 인스턴스 멤버가 생성될 때 실행하여 초기화하는 역할을 한다.
3. self는 객체 자신을 의미하며, 생성 중인 객체에 name과 money라는 멤버를 만들고 전달받은 인자들로 할당한다.
해당 클래스를 이용해 돈을 전달하는 코드를 작성하면 다음과 같다.
```python
if __name__=="__main__":
    g = Person('greg', 5000)          
    j = Person('john', 2000)
    
    g.show()
    j.show()

    g.give_money(j, 2000)             
    print('')
    
    g.show()
    j.show()

    print(g.give_money.__self__)
```


코드의 실행결과는 이전의 코드와 같다.  다만, 이전에는 함수를 호출할 때 첫 인자로 함수를 호출하는 객체를 전달했는데, 이번 코드에서는 전달하지 않았다. 인스턴스 메서드를 호출하면 객체가 자동으로 첫 번째 인자인 self로 객체 자신을 전달하기 때문이다.  
위 코드에서 객체 g의 메서드를 살펴보자
```python
>>>dir(g.give_money)#1
>>>g.givemoney.__func__#2
>>>g.givemoney.__self__#3
```
#1을 실행하면 객체 g의 give\_money()의 메서드의 속성을 확인할 수 있다. 이 중 \_\_func \_\_를 확인해 보면 Person 클래스의 give\_money() 함수임을, \_\_self \_\_를 확인해보면 Person 객체임을 알 수있다.
```python
>>>g.givemoney.__self__ is g
True
```
또한 \_\_self \_\_가 이 메서드를 가진 객체 자신을 참조하고 있음을 확인할 수 있다.  
따라서 **메서드 내부에 함수와 객체의 참조를 가지고 있으므로 함수에 직접 객체의 참조를 전달 할 수 있기 때문에 객체에서 메서드를 호출할 때 self를 전달하지 않아도 된다.**
```python
class A:
    c_mem = 10               #1

    @classmethod
    def cls_f(cls):          #2
        print(cls.c_mem)

    def __init__(self, num):
        self.i_mem = num     #3

    def ins_f(self):
        print(self.i_mem)
```
 #1 에서 c\_mem과 같이 클래스가 가지는 멤버를 클래스 멤버라고한다. 또한 데코레이터@classmethod를 통해 cls\_f() 메서드는 클래스 메서드가 된다.  
 클래스 멤버와 클래스 메서드는 클래스가 가지고 있으므로 객체가 없어도 클래스를 통해 접근하거나 호출할 수 있으며, 전역 변수와 전역 함수를 대체할 수 있다.
## 정보 은닉Information Hiding
캡슐화할 때 어떤 맴버와 메서드는 공개하여 유저가 사용할 수 있도록 하고, 어떤 것들은 숨겨서 유저가 접근할 수 없도록 할 것인지 정해야 하는데 이런 개념을 **정보 은닉**이라고 한다. 객체 지향 프로그래밍에서 잘된 정보 은닉은 필요한 메서드만 공개하고 나머지는 모두 숨기는 것이다.   
파이썬은 기본적으로 정보 은닉을 지원하지 않기에 완벽한 정보 은닉은 불가능하다. 다만 유저의 실수를 막을 수 있는 두 가지 방법이 있다.
- 숨기려는 멤버 앞에 언더바 붙이기
- 프로퍼티 기법


### 언더바 붙이기
```python
class Account:
    def __init__(self, name, money):
        self.user = name
        self.__balance = money#1

    def get_balance(self):
        return self.__balance#2

    def set_balance(self, money):
        if money < 0:
            return

        self.__balance = money#3

if __name__ == "__main__":
    my_acnt = Account('greg', 5000)
    my_acnt.__balance = -3000#4

    print(my_acnt.get_balance())
    
>>> my_acnt.__dict__
{'user': 'greg', '_Account__balance': 5000, '__balance': -3000}
```
balance를 모두 \_\_balance로 바꾸었다. 다만 실행 예와 같이 my\_acnt의 멤버가 예상과는 다르다. 정보 은닉이 올바르게 되었다면 \_\_balance가 보이지 않아야 하고, 멤버로 만든 적 없는 \_Account\_\_balance가 추가되어있다.  
 클래스 안에서 멤버 앞에 언더바를 두 개 붙이면 이 멤버는 객체가 만들어 질 때 ‘\_클래스 이름’이 멤버 앞에 붙게된다. 다만 이렇게 변경된 멤버는 \_\_dict\_\_를 사용해 유저 또한 알고 수정할 수 있다.
‘\_\_balance’ 멤버는 기존의 멤버 이름이 바뀌었기에 새로운 멤버 하나를 더 갖게 된것이다.

### 프로퍼티 기법
```python
class Account:
    def __init__(self, name, money):
        self.user = name
		#인스턴스 멤버 선언이 아닌 #3의 setter 메서드 호출
        self.balance = money#1
        
    @property
    def balance(self):#2
        return self._balance

    @balance.setter
    def balance(self, money):#3
        if money < 0:
            return
		
		#실제 인스턴스 멤버 선언이 일어나는 부분
        self._balance = money

if __name__ == "__main__":
    my_acnt = Account('greg', 5000)
    my_acnt.balance = -3000#4

    print(my_acnt.balance)#5
```
#2에서 데코레이터 @property를 함수 정의에 붙였다. 따라서 balance() 메서드는 getter함수가 되어 함수 안의 코드를 실행하고 연산된 값을 반환한다. #3에 이름이 같지만 @balance.setter가 붙어있는 함수는 setter 함수의 역할을 하는데, 객체의 속성 값을 간접적으로 설정하고, 설정 시에 추가적인 검증이나 제약을 적용할 수 있다. 정리하자면 다음과 같다.
- @property : getter 메서드를 정의하기 위해 사용하며, 속성을 읽을때 이 메서드가 호출된다.
- @멤버이름.setter : setter 메서드를 정의할 때 사용되며, 속성에 값을 설정할 때 이 메서드가 호출된다.
하지만 이 방법도 원천적으로 유저가 접근하는 것을 막을수는 없다.

```python
>>> my_acnt.__dict__
{'user': 'greg', '_balance' : 5000}
>>> my_acnt._balance = -3000
>>> my_acnt.balance
-3000
```
\_\_dict \_\_를 통해 멤버를 확인 할 수 있고, \_balance 멤버로 접근해 값을 음수로 변경하면 setter 함수를 통해 변경하는 것이 아니므로 값이 음수로 바뀐다.