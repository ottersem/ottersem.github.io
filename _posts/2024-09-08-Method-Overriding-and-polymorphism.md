---
layout: post
title: Method Overriding and Polymorphism
date: 2024-09-08 17:45:00
description: 메서드 오버라이딩과 다형성(Polymorphism)
tags: Method_Overriding Polymorphism
categories: CS
---

# 메서드 오버라이딩과 다형성
**다형성(polymorphism)**이란 **’상속 관계에 있는 다양한 클래스의 객체에서 같은 이름의 매서드를 호출할 때, 각 개체가 서로 다르게 구현된 메서드를 호출함으로써 서로 다른 행동, 기능, 결과를 가져오는 것’**을 의미한다. 그리고 이것을 구현하기 위해 파생 클래스 안에서 상속받은 메서드를 다시 구현하는 것을 **메서드 오버라이딩**이라고 한다.

## 메서드 오버라이딩
```python
class CarOwner:
    def __init__(self, name):
        self.name = name

    def concentrate(self):
        print('{} can not do anything else'.format
              (self.name))

class Car:
    def __init__(self, owner_name):
        self.owner = CarOwner(owner_name)
        
    def drive(self):                
        self.owner.concentrate()    
        print('{} is driving now.'.format(self.owner.name))   

class SelfDrivingCar(Car):
    def drive(self):                
        print('Car is driving by itself')   

```
위 코드를 보면 car 객체는 CarOwner객체가 운전하며, drive() 메서드가 시작하면 운전중임을 나타낸다. car객체를 상속받은 파생 클래스 SelfDrivingCar는 자율주행차로 차 주인이 운전하지 않기에 상속받은 drive() 메서드가 불필요하지만, 나머지 멤버나 메서드는 유효하다. 이럴 경우 SelfDrivingCar 클래스는 car 클래스를 상속하지만 불필요한 drive() 메서드만 클래스 안에서 다시 정의하고 있다.  
 이렇게 파생 클래스에서 상속받은 메서드를 다시 구현하는 것을 **메서드 오버라이딩(Method Overriding)**라고 한다.  
 위 코드를 기반으로 각각의 drive() 메서드를 호출해도 구현 내용이 다르므로 결과는 다르게 나오고, 이처럼 같은 이름의 메서드를 호출해도 호출한 객체에 따라 다른 결과를 내는 것을 **‘다형성’**이라고 한다.
## 다형성
```python
class Animal:
    def eat(self):          #1
        print('eat something')

class Lion(Animal):
    def eat(self):          #2
        print('eat meat')

class Deer(Animal):
    def eat(self):          #3
        print('eat grass')

class Human(Animal):
    def eat(self):          #4
        print('eat meat and grass')

if __name__ == "__main__":
    animals = []           #5
    animals.append(Lion())
    animals.append(Deer())
    animals.append(Human())

    for animal in animals:
        animal.eat()        #6
```
위 코드에서는 기본 클래스인 Animal에 eat()메서드가 있고 파생클래스에 오버라이딩 되어있다. 그러나 각각 육식, 초식, 잡식인지에 따라 무엇을 먹는지가 다르고, 호출시에도 오버라이딩 된  메서드를 호출한다. 이렇듯 불필요한 인스턴스가 생성되면 자원의 낭비로 이어지기에 애초에 Animal클래스의 인스턴스를 만들지 못하게 하고 싶다면 **추상 클래스(abstract class)**로 만들면 된다.  
추상 클래스는 독자적으로 인스턴스를 만들 수 없고 함수의 몸체가 없는 **추상 메서드**를 하나 이상 가지고 있어야 한다. 또한 추상 클래스를 상속받는 파생 클래스 에서는 추상 메서드를 반드시 오버라이딩 해야한다. 그렇지 않으면 파생 클래스도 추상 클래서가 되어 인스턴스를 만들 수 없다.
```python
from abc import *                   #1

class Animal(metaclass = ABCMeta):  
    @abstractmethod
    def eat(self):                  #2
        pass
```
(#1)의 abc는 abstrct base class의 약자이다. 추상 메서드로 만들고 싶은 메서드 위에 데코레이터 abstractmethod를 붙여주고, 메서드 구현부를 pass해 함수 몸체를 비워두면 eat()메서드는 추상메서드가 되며, Animal 클래스를 상속받는 모든 파생 클래스는 내부에 eat() 메서드를 반드시 오버라이딩 해야한다.