---
layout: post
title: Procedural Programming
date: 2024-08-25 12:27:00
description: 절차 지향 프로그래밍
tags: Procedural_Programming
categories: CS
---

# 절차 지향 프로그래밍Procedural Programming

절차를 의미하는 **프로시져Procedure**는 서브 루틴, 메소드, 함수라고도 불린다. 이하의 내용은 **’함수’**로 통일하도록 하겠다.  
 **함수**는 입력을 받아 일련의 연산 과정을 거쳐 출력을 내보낸다. 한 번 정의하면 다시 호출해 사용이 가능하고 어떤 일을 하는지 쉽게 파악할 수 있다. 또한 제작자와 사용자가 달라도 사용자는 인터페이스만 익혀 사용하면 된다. 따라서 코드를 기능별로 나누어 함수로 정의하고, 호출하여 사용하면 유지/보수 측면에도 간편하다.  
 **절차 지향 프로그래밍**은 “이 프로그램은 어떤 일을 하는가?”에 대한 질문의 대답이 될 수있다.

## 절차 지향 프로그래밍의 예제

### 기본준비

절차 지향 프로그래밍의 예제로 학생들의 점수를 가져와 평균과 표준편차를 구하고, 학년 평균과 비교하여 평가하는 프로그램을 만들어보자.

```python
>> from openpyxl import *
>>> wb = load_workbook('exam.xlsx')
>>> wb.sheetnames
['Sheet1']
>>> ws = wb.active
>>> ws
<Worksheet "Sheet1">
>>> g = ws.rows #1
>>> cells = next(g) #2
>>> cells
(<Cell 'Sheet1'.A1>, <Cell 'Sheet1'.B1>, <Cell 'Sheet1'.C1>, <Cell 'Sheet1'.D1>)
>>> keys = []
>>> for cell in cells:
...     keys.append(cell.value) #3
>>> keys
['name', 'math', 'literature', 'science']
```

rows는 데이터가 있는 모든 행을 발행자 객체로 반환한다.(#1) 그리고 next()함수로 첫번째 행을 가져와(#2) 출력하면 셀들이 들어있음을 확인할 수 있다. 이제 1행을 학생들의 데이터를 담을 딕셔너리의 키로 사용하고 실제 값을 가져온다.(#3)

```python
>>> for row in g:
...     dic = {k : c.value for k, c in zip(keys, row)} #1
...     student_data.append(dic) #2
>>> student_data
[{'name': 'greg', 'math': 95, 'literature': 65, 'science': 75}, {'name': 'john', 'math': 25, 'literature': 30, 'science': 55}, {'name': 'yang', 'math': 50, 'literature': 45, 'science': 40}, {'name': 'timothy', 'math': 15, 'literature': 65, 'science': 90}, {'name': 'melisa', 'math': 100, 'literature': 100, 'science': 100}, {'name': 'thor', 'math': 10, 'literature': 15, 'science': 20}, {'name': 'elen', 'math': 25, 'literature': 50, 'science': 100}, {'name': 'mark', 'math': 80, 'literature': 75, 'science': 80}, {'name': 'steve', 'math': 95, 'literature': 100, 'science': 95}, {'name': 'anna', 'math': 20, 'literature': 20, 'science': 20}]
```

**딕셔너리 컴프리헨션**을 이용해 학생 한명의 데이터를 모은 딕셔너리를 만들고(#1), 전체 학생 데이터를 저장하는 리스트 student_data에 추가하였다.(#2)

### 평균/분산/표준편차를 함수로 만들기

- 분산 : $Var(X) = E[(X-\mu)^2]$
- 표준편차 : $\sigma = \sqrt{Var(X)}$
  분산은 흩어져 있는 정도(산포도)를 구하는 방법 중 하나이고, 점수의 표준편차를 구하는 이유는 점수가 어떻게 퍼져있는지 알아보기 위함이다.  
   이제 평균, 분산, 표준편차를 구하는 함수를 작성해보자.

```python
def average(scores):
	s = 0
	for score in scores:
		s += score
	return round(s/len(scores), 1)

def variance(scores, avrg):
	s = 0
	for score in scores:
		s += (score - avrg) ** 2
	return round(s/len(scores), 1)

def deviation(variance):
	return round(math.sqrt(variance, 1)
```
