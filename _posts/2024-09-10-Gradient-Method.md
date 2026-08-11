---
layout: post
title: Gradient Method
date: 2024-09-10 12:15:00
description: 뉴럴 네트워크에서의 경사법(Gradient Method)
tags: Neural_Network, Gradient_Method
categories: DL
pretty_table: true
---

# 3경사법Gradient Method

학습 단계에서 손실 함수가 최솟값이 될 때의 매개변수 값을 찾아내는 방법은 매우 복잡하다. 또한 매개변수 공간이 매우 클 때 어디가 최솟값이 되는 곳인지 짐작하기도 어려운데, 이때 기울기를 이용해 함수의 최솟값을 찾으려는 것이 경사법이다. 다만 각 지점에서 함수의 값을 낮추는 방안을 제시하는 지표가 기울기인 것이지 기울기가 가리키는 곳에 정말 함수의 최솟값이 있는지, 정말로 나아가야 할 방향인지에 대해서는 보장할 수 없다.  
경사법은 현 위치에서 기울어진 방향으로 일정 거리만큼 이동하고, 이동한 곳에서 기울기를 구하고, 그 기울어진 방향으로 나아가기를 반복한다. 이렇게 함수의 값을 점차 줄이는 것이 **경사법**이다.

$$x_0 = x_0-\eta \frac{\partial f}{\partial x_0}$$
$$x_1 = x_1-\eta \frac{\partial f}{\partial x_1}$$

$\eta$(에타)는 갱신하는 양을 나타내며, 신경망 학습에서는 **학습률**이라고 한다. 한 번의 학습으로 얼마만큼 매개변수 값을 갱신하는지를 정하는 것이다. 위 수식을 바탕으로 경사 하강법을 구현하는 방법은 다음과 같다.

```python
def gradient_descent(f, init_x, lr=0.01, step_num = 100) :
    # f:최적화 하려는 함수, init_x : 초기값, lr : learning rate(학습률), step_nump : 경사법에 따른 반복 횟수
    x = init_x

    for i in range(step_num):
        grad = numerical_gradient(f,x)
        x -= lr * grad
    return x
```

주의해야할 점은 학습률이 너무 크면 큰 값으로 발산하고, 반대로 너무 작으면 거의 갱신되지 않은 채 끝나기에 학습률과 같은 **하이퍼 파라미터**를 적절히 조정하는것이 필요하다.

## 신경망에서의 기울기

신경망 학습에서도 당연히 기울기를 구해야 하고, 여기서 기울기는 가중치 매개변수에 대한 손실 함수의 기울기이다. 예를 들어 형상이 $2\times3$, 가중치가 $W$, 손실 함수가 $L$인 신경망의 경사는 $\frac{\partial L}{\partial W}$로 나타낼 수 있다.

$$
W=
\begin{pmatrix}
w_{11} & w_{12} & w_{13} \\
w_{21} & w_{22} & w_{23}
\end{pmatrix}
$$

$$
\frac{\partial L}{\partial W}=
\begin{pmatrix}
\frac{\partial L}{\partial W_{11}} & \frac{\partial L}{\partial W_{12}} & \frac{\partial L}{\partial W_{13}} \\
\frac{\partial L}{\partial W_{21}} & \frac{\partial L}{\partial W_{22}} & \frac{\partial L}{\partial W_{23}}
\end{pmatrix}
$$

$\frac{\partial L}{\partial W}$의 각 원소는 각각의 원소에 대한 편미분이다.

## 학습 알고리즘

신경망 학습의 절차는 다음과 같다.

1. 미니배치 : 훈련 데이터 중 일부를 무작위로 가져오고, 이 데이터의 손실 함수 값을 줄이는 것이 목표이다.
2. 기울기 산출 : 각 가중치 매개변수의 기울기를 구한다.
3. 매개변수 갱신 : 가중치 매개변수를 기울기 방향으로 갱신한다.
4. 반복 :1~3단계를 반복한다.

이때 확률적으로 무작위로 골라낸 데이터인 미니배치로 데이터를 선정하기에 **확률적 경사 하강법stochastic gradient descent, SGD**라고 부른다.  
학습을 반복함으로써 손실 함수의 값이 서서히 내려가는데, 이 결과만으로는 다른 데이터셋에도 비슷한 결과를 도출할지는 확신할 수 없다. 이렇게 훈련 데이터에 포함된 이미지만 제대로 구분하고, 그렇지 않은 이미지는 식별할 수 없는 **오버피팅**을 일으키지 않는지 확인해야 하는데, 그 단위로는 **에폭epoch**을 사용한다.  
1에폭은 학습에서 훈련 데이터를 모두 소진했을 때의 횟수에 해당하며 1에폭별로 훈련 데이터와 시험데이터에 대한 정확도를 기록하는 것이 일반적이다.
