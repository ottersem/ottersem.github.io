---
layout: post
title: Parameter Renewal
date: 2024-10-06 20:29:00
description: 파라미터 갱신
tags: Neural_Network
categories: DL
---
# 매개변수 갱신
- 최적화 : 손실 함수의 값을 가능한 한 낮추는 매개변수의 최적값을 찾는 문제

## 확률적 경사 하강법SGD
확률적 경사 하강법이란 매개변수의 기울기를 구해, 기울어진 방향으로 매개변수 값을 갱신하는 일을 몇 번이고 반복해서 최적의 값에 다가가는 것이다.

$$W \leftarrow W - \eta \frac{\partial L}{\partial W}$$

$W$는 갱신할 가중치 매개변수이며 $\frac{\partial L}{\partial W}$은 $W$에 대한 손실 함수의 기울기이다. $\eta$는 학습률을 의미하며, 하이퍼 파라미터로 작용한다. 위 식에서 알 수 있듯이 SGD는 기울어진 방향으로 일정 거리만 가겠다는 단순한 방법이다.
```python
class SGD:
	def __init__(self, lr = 0.01):
		self.lr = lr

	def update(self, params, grads):
		for key in params.keys():
			params[key] -= self.lr * grads[key]
```
lr은 learning rate를 의미한다. 학습률을 인스턴스 변수로 유지하고, update 메서드는 반복해서 호출된다.

### 단점
SGD의 단점은 비등방성 함수에서는 탐색 경로가 비 효율적이라는 것이다. 무식하게 기울어진 방향으로 진행하는 방향이 그 이유이고, 또한, 지그재그로 탐색하는 근본 원인은 기울어진 방향이 본래의 최솟값과 다른 방향을 가리켜서이기도 하다.
## Momentum
모멘텀 기법의 수식은 다음과 같다.

$$V \leftarrow \alpha v - \eta \frac{\partial L}{\partial W} \\
W \leftarrow W + v$$

SGD에서는 볼 수 없었던 $v$라는 변수는 물리에서 말하는 속도에 해당한다. 모멘텀은 공이 그릇의 바닥을 구르는 듯한 움직임을 보여주는데, $\alpha v$항이 물체가 아무런 힘을 받지 않을 때 서서히 하강시키는 역할을 하기 때문이다.
```python
class Momentum:
    def __init__(self, lr=0.01, momentum=0.9):
        self.lr = lr
        self.momentum = momentum
        self.v = None
        
    def update(self, params, grads):
        if self.v is None:
            self.v = {}
            for key, val in params.items():                                
                self.v[key] = np.zeros_like(val)
                
        for key in params.keys():
            self.v[key] = self.momentum*self.v[key] - self.lr*grads[key] 
            params[key] += self.v[key]
```
인스턴스 변수 v는 속도의 역할을 한다. 초기화 때는 아무 값도 담지 않지만, update가 처음 호출될 때 매개변수와 같은 구조의 데이터를 딕셔너리 변수로 저장한다.  
전체적인 갱신의 양상은 SGD와 유사하지만 보다 ‘지그재그 정도’가 덜하다. 이는 x 축의 힘은 아주 작지만 방향이 변하지 않아 한 방향으로 일정하게 가속하기 때문이다. 반대로 y 축의 힘은 크지만 위아래로 번갈아 받아 상충하여 y 축 방향의 속도는 안정적이지 않다.

## AdaGrad
신경망 학습에서는 학습률 값이 중요한데, 이 값이 **너무 작으면** 학습 시간이 너무 길어지고, 반대로 **너무 크면** 발산하여 학습이 제대로 이뤄지지 않는다.  
이 학습률을 정하는 기술로 **학습률 감소learning rate decay**가 있다. 학습률을 서서히 낮추는 간단한 방법은 매개변수 ‘전체’의 학습률 값을 일괄적으로 낮추는 것이다. 이를 발전시켜 AdaGrad는 ‘각각의’ 매개변수에 ‘맞춤형’ 값을 만들어준다.

$$h \leftarrow h+ \frac{\eta L}{\eta W} \odot \frac{\eta L}{\eta W} \\
W \leftarrow W - \eta \frac{1}{\sqrt h}\frac{\eta L}{\eta W}$$

새로운 변수 h는 **기존 기울기 값을 제곱하여 계속 더해준다.** 그리고 매개변수를 갱신할 때 $\frac{1}{\sqrt h}$를 곱해 학습률을 조정한다. 매개변수의 원소 중 많이 움직인 원소는 학습률이 낮아진다는 뜻인데, 학습률 감소가 매개변수의 원소마다 다르게 적용됨을 뜻한다.
```python
class AdaGrad:
    def __init__(self, lr=0.01):
        self.lr = lr
        self.h = None
        
    def update(self, params, grads):
        if self.h is None:
            self.h = {}
            for key, val in params.items():
                self.h[key] = np.zeros_like(val)
            
        for key in params.keys():
            self.h[key] += grads[key] * grads[key]
            params[key] -= self.lr * grads[key] / (np.sqrt(self.h[key]) + 1e-7)
```
주의해야 할 점은 1e-7이라는 작은 값을 더해 self.h[key]에 0 이 담겨있어도 0으로 나누는 상황을 막아준다.
## Adam
모멘텀과 AdaGrad를 융합한 기법이 Adam이다. 두 방법의 이점을 조합해 매개변수 공간을 효율적으로 탐색하는 기능을 기대할 수 있고, 하이퍼 파라미터의 ‘편향 보정’이 진행된다.
```python
class Adam:
    def __init__(self, lr=0.001, beta1=0.9, beta2=0.999):
        self.lr = lr
        self.beta1 = beta1
        self.beta2 = beta2
        self.iter = 0
        self.m = None
        self.v = None
        
    def update(self, params, grads):
        if self.m is None:
            self.m, self.v = {}, {}
            for key, val in params.items():
                self.m[key] = np.zeros_like(val)
                self.v[key] = np.zeros_like(val)
        
        self.iter += 1
        lr_t  = self.lr * np.sqrt(1.0 - self.beta2**self.iter) / (1.0 - self.beta1**self.iter)         
        
        for key in params.keys():
            #self.m[key] = self.beta1*self.m[key] + (1-self.beta1)*grads[key]
            #self.v[key] = self.beta2*self.v[key] + (1-self.beta2)*(grads[key]**2)
            self.m[key] += (1 - self.beta1) * (grads[key] - self.m[key])
            self.v[key] += (1 - self.beta2) * (grads[key]**2 - self.v[key])
            
            params[key] -= lr_t * self.m[key] / (np.sqrt(self.v[key]) + 1e-7)
            
            #unbias_m += (1 - self.beta1) * (grads[key] - self.m[key]) # correct bias
            #unbisa_b += (1 - self.beta2) * (grads[key]*grads[key] - self.v[key]) # correct bias
            #params[key] += self.lr * unbias_m / (np.sqrt(unbisa_b) + 1e-7)
```
Adam은 하이퍼 파라미터를 3개 설정하는데 하나는 학습률$\eta \ or \ \alpha$, 일차 모멘텀용 계수$\beta _1$과 이차 모멘텀용 계수 $\beta _2$이다.

