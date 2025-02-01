---
layout: post
title: NN Derivative
date: 2024-09-10 11:15:00
description: 뉴럴 네트워크에서의 미분
tags: Neural_Network
categories: DL
pretty_table: true
---

# 미분
미분은 한순간의 변화량을 표시한 것이다.

$$\frac{df(x)}{dx} = \lim\nolimits_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

위 수식을 기반으로 미분을 파이썬으로 구현해보자.
```python
def numerical_differentiation(f, x):
	h = 10e-50
	return(f(x+h) - f(x) / h
```
만약 h가 0 이라면 계산이 불가능하니 가능한 한 작은 값을 이용했다. 그러나 계산시에 작은 값이 생략되어 최종 계산 결과에 오차가 생기게하고 이 오차를 **반올림 오차rounding error**라고 한다.
```python
>>> np.float(1e-50)
0.0
```
첫번째 개선점으로 아주 작은 값(h)를 $10^{-4}$를 이용하면 좋은 결과를 얻는다고 알려져 있다.  
두번째 개선점은 **차분**과 관련한 것인데, 앞의 구현에서는 x+h와 x 사이의 함수 f의 차분을 계산하고 있지만 정확한 x위치의 기울기에 해당하지는 않기에 엄밀하게 일치하지는 않는다.  
따라서 이 오차를 줄이기 위해 (x+h) 와 (x-h) 일 때의 함수 f의 차분을 계산하는 방법을 쓰기도 한다. 이 차분을 **중심 차분**이라고 한다.
```python
def numerical_differentiation(f, x):
	h = 1e-4
	return(f(x+h) - f(x-h) / (2*h)
```
## 편미분
그렇다면 변수가 여러개인 함수는 어떻게 처리해야 할까? 다음 수식을 통해 살펴보자.

$$f(x_0,x_1) = x_0^2 + x_1^2$$
```python
def function(x):
	return x[0]**2 + x[1]**2
```
위 함수를 미분할 때에는 변수가 2개 이기에 어느 변수에 대한 미분인지를 구별해야 하고, 이와 같이 변수가 여럿인 함수에 대한 미분을 **편미분**이라고 한다. 편미분 수식은 $\frac{\partial f}{\partial x_0}$나 $\frac{\partial f}{\partial x_1}$ 처럼 작성한다.  
그렇다면 동시에 편미분을 계산하고 싶다면 어떻게 할까? $(x_0, x_1)$ 양쪽의 편미분을 $(\frac{\partial f}{\partial x_0},\frac{\partial f}{\partial x_1})$과 같이 묶어서 계산하고, 벡터로 정리한 것을 **기울기**라고 한다.
```python
def numerical_gradient1d(f, x):
    h = 1e-4
    grad = np.zeros_like(x) # x와 형상이 같은 배열 생성

    for idx in range(x.size):
        tmp_val = x[idx]
        #f(x+h)계산
        x[idx] = tmp_val + h
        fxh1 = f(x)

        #f(x-h)계산
        x[idx] = tmp_val - h
        fxh2 = f(x)

        grad[idx] = (fxh1 - fxh2) /  (2*h)
        x[idx] = tmp_val #값 복원
    return grad
```
이 기울기에 마이너스를 붙이면 기울기는 함수의 **’가장 낮은 장소(최솟값)’**을 가리킴을 알 수 있다. 더 정확히 표현하자면 **기울기가 가리키는 쪽은 각 장소에서 함수의 출력 값을 가장 크게 줄이는 방향이다.**

