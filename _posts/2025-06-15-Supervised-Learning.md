---
layout: post
title: Supervised Learning
date: 2025-06-15 20:37:00
description: Supervised Learning from CVAA ch.5 Deep Learning
tags: CV, ML, DL
categories: CV
pretty_table: true
---


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.1.png" title="5.1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.1 지도학습에서는 입력값과 레이블의 쌍을 이용해, 모델이 주어진 입력으로부터 레이블을 가장 잘 예측할 수 있도록 파라미터를 추정한다.
</div>

머신 러닝 알고리즘은 크게 입력값과 출력값이 쌍으로 학습 알고리즘에 제공되는 **지도학습(_Supervised Learning_)**과 라벨(출력값) 없이 통계적 샘플만을 활용하는 **비지도학습(_Unsupervised Learning_)**으로 나뉜다.

위 그림에서 볼 수 있듯이, 지도 학습은 입력 쌍 {$x_i$}와 그에 대응하는 목표 출력값 {$t_i$}를 학습 알고리즘에 입력하는 과정을 포함한다. 이 학습 알고리즘은 모델의 예측값과 목표 출력값 사이의 일치하는 정도를 최대화 하기 위해 모델의 파라미터를 조정한다. 이때, 출력은 클래스 집합 {$C_k$}로부터 나오는 이산적인 레이블일 수도 있고, 혹은 연속적이며 잠재적으로 벡터 값을 가질 수도 있다. 이러한 출력 유형의 구분을 명확히 하기 위해 $y_i$로 나타낸다. 이산적인 레이블을 예측하는 경우는 클래스의 소속 여부를 예측하려는 것이므로 **분류(_Classification_)**라고 하며, 연속적인 값을 예측하는 경우는 전통적으로 데이터에 추세를 맞추는 문제로 간주되어 **회귀(_Regression_)**라고 불린다.

모델의 **학습 단계(_training phase_)**이후에는, 이전까지 학습되지 않았던 입력값에 대한 예측을 수행하게 되고, 이 단계를 **테스트 단계(_test phase_)**라고 한다.

머신 러닝에서는 일반적으로 입력에 대한 실제 확률 분포와 그에 대응하는 출력에 대한 결합 분포 데이터에 접근할 수 없기에 실제 세계의 분포를 대신하여 훈련 데이터의 분포를 일반적으로 사용한다. 이러한 근사는 **경험적 위험 최소화(_empirical risk minimization_)**이라고 알려져 있으며, 기대 위험을 다음과 같이 추정할 수 있다.

$$
E_{\text{Risk}}(\mathbf{w}) = \frac{1}{N}\sum L(y_i,f(x_i;\mathbf{w}))
$$

손실 함수 $L$은 입력 $x_i$와 모델 파라미터 $\mathbf{w}$에 대해 예측 함수 $f(x_i; \mathbf{w})$가 생성한 출력이 실제 목표값 $y_i$와 얼마나 차이 나는지를 나타내는 “비용”을 측정한다.

## Data preprocessing
- 중심화(**_Centering_**) : 각 벡터에서 평균값을 빼는 것
- 표준화(_**Standardizing**_) : 각 성분을 다시 스케일링하여 그 분산이 1(_Unit-Variance_)이 되게 하는 것
- _**Whitening**_ : 입력값의 공분산 행렬을 계산하고, 특이값 분해(SVD)한 후, 좌표계를 회전시켜 최종 차원들이 서로 상관이 없고 분산이 1이 되도록 하는 것. 컴퓨팅 비용이 많이 요구되므로 입력값이 저차원일때 효과적이다.

# Nearest Neighbors
**Nearest neighbors**는 매우 단순한 **비모수(_non-parametric_)** 기법이다. 조금 더 상세하게 설명하자면, **기저 분포(_underlying distribution_)**에 대해 소수의 파라미터를 가진 **해석적(_analytic_)** 형태를 사용하지 않는 기법이다. 대신, 모든 훈련 데이터를 그대로 유지하며, 평가 시점에는 '가장 가까운' $k$개의 이웃을 찾아 평균 내어 출력을 생성한다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.2.png" title="5.2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.2 Nearest neighbor classification. 별이 어떤 클래스에 속하는지 결정하기 위해 k개의 근접한 이웃들을 찾고, 그 중에서 가장 많은 클래스를 선택한다. 그림은 k=1, 9, 25 일때의 결과를 나타낸다.
</div>


그림 5.2는 $k=1$부터 $k=25$까지의 변화를 보여주는 그림이다. $k$값의 변화가 곧 최종 분류 레이블에 영향을 영향을 미침을 알 수 있다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.3.png" title="5.3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.3 경계가 불분명한 데이터에 대해 너무 작은 k값을 선택하면, 결정 평면의 비균질성을 불러일으킨다. 반면, 너무 큰 값은 작은 영역이 찌끄러지거나 사라지게 만든다.
</div>

그림 5.3은 $k$의 변화가 미치는 다른 영향을 보여준다. 그림의 좌측은 샘플의 초깃값을 보여주는데, 보면 알 수 있듯이 파란색과 주황색이 구분없이 굉장히 뒤섞여있음을 알 수 있다. 그림의 우측은 1 부터 50까지의 $k$ 값에 따른 $k$-NN 분류기의 **결정 경계(_decision boundaries_)**을 보여준다.$k$ 값이 너무 작으면, 분류기는 훈련 데이터에 오버피팅되어 예측 결과가 불안정하고 무작위적인 경향을 보인다. 반대로, $k$값이 커지면, 분류 경계가 지나치게 부드러워지며 소규모 영역이 축소되는 등 데이터의 언더피팅 문제가 발생한다. 따라서, $k$는 분류기의 성능을 좌우하는 중요한 하이퍼파라미터로, 적절한 값을 선택하는 것이 핵심임을 알 수 있다.
