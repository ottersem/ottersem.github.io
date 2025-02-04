---
layout: post
title: Backpropagation
date: 2024-09-28 21:39:00
description: 오차역전파법
tags: Neural_Network
categories: DL
pretty_table: true
toc:
  beginning: true
---

# Backpropagation
오차역전파를 노드(원)과 에지(선)으로 이루어진 계산 그래프라고 생각해보자.  
에지에는 숫자가, 노드에는 연산자가 할당된다. 이때 계산을 왼쪽에서 오른쪽으로 진행하는 단계(출발점에서 종착점으로의 전파)를 **순전파**, 그 반대로 오른쪽에서 왼쪽으로 계산하는 단계(종착점에서 출발점으로의 전파)를 **역전파**라고한다.
## 국소적 계산
계산 그래프의 특진은 ‘국소적 계산’을 전파함으로써 최종 결과를 얻는다. 여기서 ‘국소적’이란 **’자신과 직접 관계된 작은 범위’**라는 뜻이다. 즉, 전체에서 어떤 일이 일어나든 자신(노드)과 관계된 정보만으로 결과를 출력할 수 있다는 것이다. 전체 계산이 아무리 복잡하더라도 각 단계에서 하는 일은 해당 노드의 ‘국소적 계산’일 뿐이다.
## 연쇄법칙Chain Rule
역전파는 ‘국소적인 미분’을 순방향과는 반대인 오른쪽에서 왼쪽으로 전달한다. 또한, 이 ‘국소적 미분’을 전달하는 원리는 **연쇄법칙**에 따른 것이다.
계산그래프를 사용한 역전파의 예를 살펴보자. 
![](#)
그림과 같이 역전파의 계산 절차는 신호 $E$에 노드의 국소적 미분($\frac{\partial y}{\partial x}$)을 곱한 후 다음 노드로 전달하는 것이다. 여기에서 국소적 미분은 순전파 때의 $y=f(x)$ 계산의 미분을 구한다는 것이며, 이는 $x$의 $y$에 대한 미분을 구한다는 뜻이다. 그리고 이 국소적 미분을 상류에서 전달된 값에 곱해 앞 쪽 노드로 전달하는 것이다.
### 합성함수
**합성 함수란 여러 함수로 구성된 함수**이다. 연쇄법칙은 합성 함수의 미분에 대한 성질이며 다음과 같이 정의된다.
> 합성 함수의 미분은 합성 함수를 구성하는 각 함수의 미분의 곱으로 나타낼 수 있다.

다음 수식으로 예를 들어보자.

$$z=t^2 \\
t = x+y$$

이때 $\frac{\partial z}{\partial x} = \frac{\partial z}{\partial t}\frac{\partial t}{\partial x}$ 처럼 나타낼 수 있으며, $\frac{\partial z}{\partial t} =2t, 
\frac{\partial t}{\partial x} = 1$ 이므로 $\frac{\partial z}{\partial x} = \frac{\partial z}{\partial t}\frac{\partial t}{\partial x} =2t \times 1 = 2(x+y)$처럼 계산할 수 있다.  
정리하자면 역전파의 계산 절차에서는 노드로 들어온 입력 신호에 그 노드의 국소적 미분(편미분)을 곱한 후 다음 노드로 전달한다.
## 역전파
### 덧셈 노드의 역전파

$z = x + y$일 때 $z$의 미분은 해석적으로 다음과 같다.

$$\frac{\partial z}{\partial x} = 1, \
\frac{\partial z}{\partial y} = 1$$

따라서 덧셈 노드의 역전파는 입력 신호를 다음 노드로 출력할 뿐이므로 상류로부터 노드에 전달된 값을 하류로 전달한다.
### 곱셈 노드의 역전파

$z = xy$일 때 $z$의 미분은 해석적으로 다음과 같다.
$$\frac{\partial z}{\partial x} = y, \
\frac{\partial z}{\partial y} = x$$

따라서 곱셈 노드의 역전파는 상류의 값에 순전파 때의 입력 신호를 ‘서로 바꾼 값’을 곱해서 하류로 보낸다. 다만 덧셈의 역전파에서는 상류의 값을 그대로 흘려보내서 순방향 입력 신호의 값이 필요하지 않지만, 곱셈의 역전파는 순방향 입력 신호의 값이 필요하기에 곱셈 노드를 구현할 때는 순전파의 입력 신호를 변수에 저장해둔다.
## 활성화 함수 계층 구현
### ReLU
ReLU의 수식과 그 미분은 다음과 같다.

$$y = 
\begin{cases}
x(x>0)\\
0(x\le0) 
\end{cases} \qquad
\frac{\partial y}{\partial x} = 
\begin{cases}
1(x>0)\\
0(x\le0) 
\end{cases}$$

순전파 때의 입력인 $x$가 0보다 크면 역전파는 상류의 값을 그대로 하류로 전달하는 반면, 순전파 때 $x$가 0 이하면 역전파 때는 하류로 신호를 전달하지 않는다.

```python
class Relu:
    def __init__(self):
        self.mask = None

    def forward(self, x):
        self.mask = (x <= 0)
        out = x.copy()
        out[self.mask] = 0

        return out

    def backward(self, dout):
        dout[self.mask] = 0
        dx = dout

        return dx
```

위와 같이 ReLU 클래스를 구현하면 순전파 때 만들어둔 mask를 사용하여 True인 곳에서는 상류에서 전파된 dout을 0으로 설정한다.
### Sigmoid
시그모이드 함수는 다음과 같다.

$$y=\frac{1}{1+exp(x)}$$

곱셈 노드와 같이 나눗셈 노드를 미분하면 다음과 같다.

$$\begin{align}
\frac{\partial y}{\partial x} = -\frac{1}{x^2} \\
=-y^2
\end{align}$$

위 식에 따르면 나눗셈 노드의 역전파 때는 상류에서 흘러온 값에 $-y^2$(순전파의 출력을 제곱한 후 마이너스를 붙인 값)을 곱해 하류로 전달한다.  
exp노드는 지수연산을 수행하며 지수함수의 미분은 형태를 유지하기에 $\frac{\partial y}{\partial x} = exp(x)$와 같다. 따라서 sigmoid함수의 역전파의 최종 출력은 $\frac{\partial L}{\partial y}y^2exp(-x)$값이 하류로 전달된다.  
최종 출력 수식에서 알 수 있듯 순전파의 입력$x$와 출력 $y$만으로 계산할 수 있는데, 다시 한 번 정리하면 다음과 같이 $y$(순전파의 출력)만으로도 계산할 수 있다.

$$\begin{align}
\frac{\partial L}{\partial y}y^2exp(-x) = \frac{\partial L}{\partial y}\frac{1}{(1+exp(-x))^2}exp(-x) \\
=\frac{\partial L}{\partial y}\frac{1}{1+exp(-x)}\frac{exp(-x)}{1+exp(-x)} \\
=\frac{\partial L}{\partial y}y(1-y)
\end{align}$$

```python
class Sigmoid:
    def __init__(self):
        self.out = None

    def forward(self, x):
        out = sigmoid(x)
        self.out = out
        return out

    def backward(self, dout):
        dx = dout * (1.0 - self.out) * self.out

        return dx
```

위와 같이 sigmoid를 구현하면 순전파의 출력을 인스턴스 변수 out에 보관했다가 역전파 때에 그 값을 재사용한다.
## Affine/Softmax 계층
### Affine계층
신경망의 순전파 시에 수행하는 행렬의 곱을 **어파인 변환 Affine Transformation**라고 한다. 따라서 어파인 변환을 수행하는 처리를 ‘Affine 계층’이라는 이름으로 구현한다.  
행렬의 곱 계산은 대응하는 차원의 원소 수를 일치시키는 게 핵심이다. 예를 들자면 $X \cdot W = O$ 에서 차례로 (2,), (2,3), (3,) 처럼 대응하는 차원의 원소 수를 일치시켜야 한다.  
위 내용을 참고하면 $Y=np.dot(X,W)+b$을 계산하고 $Y$를 활성화 함수로 변환해 다음 층으로 전파하는 것이 신경망 순전파의 흐름임을 알 수 있다.  
행렬을 사용한 역전파도 행렬의 원소마다 전개해보면 스칼라값을 사용한 계산과 같은 순서로 생각할 수 있다. 실제로 X와 W의 역전파를 각각 전개해보면 다음과 같다.
$$\frac{\partial L}{\partial X} _{(2,)}= \frac{\partial L}{\partial Y}_{(3,)} \cdot W^T_{(3,2)},\
\frac{\partial L}{\partial W}_{(2,3)} = X^T_{(2,1)} \cdot \frac{\partial L}{\partial Y}_{(1,3)}$$
눈 여겨봐야 할 점은 $X,W$는 각각의 역전파$\frac{\partial L}{\partial X}, \frac{\partial L}{\partial W}$와 같은 형상이라는 점이다. 행렬의 곱에서는 대응하는 차원의 원소 수를 일치시켜야 하는데, 이를 위해서는 전치행렬을 동원해야 할 수도 있기 때문이다. 정리하자면 행렬 곱의 역전파는 행렬의 대응하는 차원의 원소 수가 일치하도록 곱을 조립하여 구할 수 있다.
#### 배치용 Affine계층
상술한 Affine계층이 입력 데이터로 X 하나만을 고려한 것이었다면, 배치용 Affine계층은 X의 형상이 (N,2)가 된 것이다. 계산 과정 또한 역전파 시의 행렬의 형상에 주의하면 이전과 같이 $\frac{\partial L}{\partial X}, \frac{\partial L}{\partial W}$를 도출할 수 있다.

$$\frac{\partial L}{\partial X} _{(N,2)}= \frac{\partial L}{\partial Y}_{(N,3)} \cdot W^T_{(3,2)},\
\frac{\partial L}{\partial W}_{(2,3)} = X^T_{(2,N)} \cdot \frac{\partial L}{\partial Y}_{(N,3)}$$

$$*\ \frac{\partial L}{\partial B}_{(3)} = \frac{\partial L}{\partial Y}_{(N,3)}의 \ 첫 \ 번째 \ 축(열방향)의 \ 합$$
순전파의 편향 덧셈은 각각의 데이터에 더해진다. 따라서 역전파 때는 각 데이터의 역전파 값이 편향의 원소에 모여야 하기에 편향의 역전파는 그 두 데이터에 대한 미분을 데이터마다 더해서 구한다.
```python
>>> dY = np.array([[1,2,3],[4,5,6]])
>>> dY
array([[1, 2, 3],
       [4, 5, 6]])
>>> dB = np.sum(dY, axis = 0)
>>> dB
array([5, 7, 9])
```
### Softmax-with-loss계층
소프트맥스 함수는 입력 값을 정규화하여 출력한다. 다시말하자면 소프트맥스 함수는 정답을 확률로 해석할 수 있는 틀을 제공해주며, 가장 높은 점수만을 알면 되는 **추론**과정에서는 사용되지 않고, **학습**과정에서 사용된다. 교차 엔트로피 오차를 포함한 소프트맥스 계층을 구현하기에 softmax-with-loss 계층이라는 이름으로 구현한다. 3클래스 분류를 가정하고 예를 들어보자.  
우선 이전 계층에서 3개의 점수$(a_1,a_2,a_3)$를 입력받고 정규화 하여 $(y_1,y_2,y_3)$를 출력한다. 교차 엔트로피 오차 계층에서는  소프트맥스 계층의 출력$(y_1,y_2,y_3)$과 정답 레이블$(t_1,t_2,t_3)$를 입력받고, 이 데이터를 통해 손실$L$을 출력하는 것이 순전파 과정이다.  
이제 역전파 과정을 살펴보자. 소프트맥스 계층의 역전파는 $(y_1 - t_1, y_2 - t_2, y_3 - t_3)$라는 깔끔한 결과를 내놓는데 이 값은 소프트맥스 계층의 출력과 정답 레이블의 차분이다. **신경망의 역전파에서는 이 차이인 오차가 앞 계층으로 전달**된다.  
다시한번 되새겨 보는 신경망 학습의 목적은 **신경망의 출력이 정답 레이블과 가까워 지도록 가중치 매개변수의 값을 조정하는 것**이다. 따라서 소프트맥스 계층의 역전파 값은 **신경망의 현재 출력과 정답 레이블의 오차를 있는 그대로 드러내는 것**이다.
```python
class SoftmaxWithLoss:
    def __init__(self):
        self.loss = None # 손실함수
        self.y = None    # softmax의 출력
        self.t = None    # 정답 레이블(원-핫 인코딩 형태)
        
    def forward(self, x, t):
        self.t = t
        self.y = softmax(x)
        self.loss = cross_entropy_error(self.y, self.t)
        
        return self.loss

    def backward(self, dout=1):
        batch_size = self.t.shape[0]
        dx = (self.y - self.t) / batch_size 
        return dx	
```
## 오차역전파법 구현
오차역전파법을 구성하는 TwoLayerNet클래스의 인스턴스 변수와 메서드는 다음과 같다.

| 인스턴스 변수   | 설명                                                          |
| --------- | ----------------------------------------------------------- |
| params    | 딕셔너리 변수, 신경망의 매개변수 보관 [‘W1’]은 첫번째 층의 가중치, [‘b1’]은 첫번째 층의 편향 |
| layers    | 순서가 있는 딕셔너리 변수, 신경망의 계층을 순서대로 유지하고 보관                       |
| lastLayer | 신경망의 마지막 계층(SoftmaxWithLoss Layer)                          |

| 메서드                             | 설명                                                                 |
| ------------------------------- | ------------------------------------------------------------------ |
| \_\_init\_\_                    | 초기화 수행 인수는 앞에서부터 입력층 뉴런 수, 은닉층 뉴런 수, 출력층 뉴런 수, 가중치 초기화 시 정규분포의 스케일 |
| predict(self, x)                | 예측을 수행 x는 이미지 데이터                                                  |
| loss(self, x,t )                | 손실 함수의 값을 구한다 x는 이미지 데이터, t는 정답 레이블                                |
| accuracy(self, x, t)            | 정확도를 구한다                                                           |
| numerical\_gradiant(self, x, t) | 가중치 매개변수의 기울기를 수치 미분 방식으로 구한다                                      |
| gradient(self,x,t)              | 가중치 매개변수의 기울기를 오차 역전파법으로 구한다.                                      |


```python
import sys, os
sys.path.append(os.pardir)  # 부모 디렉터리의 파일을 가져올 수 있도록 설정
import numpy as np
from common.layers import *
from common.gradient import numerical_gradient
from collections import OrderedDict


class TwoLayerNet:

    def __init__(self, input_size, hidden_size, output_size, weight_init_std = 0.01):
        # 가중치 초기화
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(input_size, hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size, output_size) 
        self.params['b2'] = np.zeros(output_size)

        # 계층 생성
        self.layers = OrderedDict() #신경망의 계층을 순서가 있는 딕셔너리 OrderedDict에 보관한다. 따라서 순전파 때는 추가한 순서대로 각 계층의 forward() 메서드를 호출하기만 하면 처리가 완료된다. 마찬가지로 역전파 때는 반대 순서로 호출하기만 하면 된다.
        self.layers['Affine1'] = Affine(self.params['W1'], self.params['b1'])
        self.layers['Relu1'] = Relu()
        self.layers['Affine2'] = Affine(self.params['W2'], self.params['b2'])

        self.lastLayer = SoftmaxWithLoss()
        
    def predict(self, x):
        for layer in self.layers.values():
            x = layer.forward(x)
        
        return x
        
    # x : 입력 데이터, t : 정답 레이블
    def loss(self, x, t):
        y = self.predict(x)
        return self.lastLayer.forward(y, t)
    
    def accuracy(self, x, t):
        y = self.predict(x)
        y = np.argmax(y, axis=1)
        if t.ndim != 1 : t = np.argmax(t, axis=1)
        
        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy
        
    # x : 입력 데이터, t : 정답 레이블
    def numerical_gradient(self, x, t):
        loss_W = lambda W: self.loss(x, t)
        
        grads = {}
        grads['W1'] = numerical_gradient(loss_W, self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W, self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W, self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W, self.params['b2'])
        
        return grads
        
    def gradient(self, x, t):
        # forward
        self.loss(x, t)

        # backward
        dout = 1
        dout = self.lastLayer.backward(dout)
        
        layers = list(self.layers.values())
        layers.reverse()
        for layer in layers:
            dout = layer.backward(dout)

        # 결과 저장
        grads = {}
        grads['W1'], grads['b1'] = self.layers['Affine1'].dW, self.layers['Affine1'].db
        grads['W2'], grads['b2'] = self.layers['Affine2'].dW, self.layers['Affine2'].db

        return grads
```
### 오차역전파법으로 구한 기울기 검증
기울기를 구하는 두 가지 방법은 수치 미분을 사용하는 방법과 해석적으로 수식을 풀어 구하는 방법이다. 수치 미분은 느리며, 오차역전파법을 제대로 구현해두면 수치 미분은 더 이상 필요하지 않다. 그렇다면 수치 미분의 쓸모는 어디에 있을까? 수치 미분은 **오차역전파법을 정확하게 구현했는지 확인하기 위해 필요하다.**  
이처럼 두 방식으로 구한 기울기가 거의 같음을 확인하는 작업을 **기울기 확인**이라고 한다.
```python
import sys, os
sys.path.append(os.pardir)  # 부모 디렉터리의 파일을 가져올 수 있도록 설정
import numpy as np
from dataset.mnist import load_mnist
from two_layer_net import TwoLayerNet

# 데이터 읽기
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

x_batch = x_train[:3]
t_batch = t_train[:3]

grad_numerical = network.numerical_gradient(x_batch, t_batch)
grad_backprop = network.gradient(x_batch, t_batch)

# 각 가중치의 절대 오차의 평균을 구한다.
for key in grad_numerical.keys():
    diff = np.average( np.abs(grad_backprop[key] - grad_numerical[key]) )
    print(key + ":" + str(diff))
```
### 오차역전파법을 사용한 학습 구현
```python
import sys, os
sys.path.append(os.pardir)

import numpy as np
from dataset.mnist import load_mnist
from two_layer_net import TwoLayerNet

# 데이터 읽기
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

iters_num = 10000
train_size = x_train.shape[0]
batch_size = 100
learning_rate = 0.1

train_loss_list = []
train_acc_list = []
test_acc_list = []

iter_per_epoch = max(train_size / batch_size, 1)

for i in range(iters_num):
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]
    
    # 기울기 계산
    #grad = network.numerical_gradient(x_batch, t_batch) # 수치 미분 방식
    grad = network.gradient(x_batch, t_batch) # 오차역전파법 방식(훨씬 빠르다)
    
    # 갱신
    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[key] -= learning_rate * grad[key]
    
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)
    
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)
        print(train_acc, test_acc)
```
