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

# Bayesian Classification

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.4.png" title="5.4" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.4 두 개의 클래스 조건부 확률 밀도 함수와, 이에 대응하는 후험 클래스 확률를 함께 나타낸 예를 생각해보자. 이 후험 확률은 베이즈 정리를 이용해 계산할 수 있으며, 이는 두 곡선의 합으로 나눈 값을 의미한다. 녹색 수직선은 오분류율을 최소화하는 최적의 결정 경계선이다.
</div>

일부 단순한 머신러닝 문제에서는, 각 클래스에 대한 특성 벡터의 조건부 확률 분포 $p(\mathbf{x} \vert C_k)$뿐만 아니라, 클래스의 사전 우도 $p(C_k)$ 역시 결정할 수 있다. Bayes' rule에 의해 특성 벡터 $\mathbf{x}$가 주어졌을 때 클래스 $C_k$의 우도(그림 5.4)는 다음과 같이 주어진다.

$$\begin{align}
p_k = p(C_k\vert \mathbf{x}) &= \frac{p(\mathbf{x}\vert C_k)p(C_k)}{\sum_jp(x\vert C_j)p(C_j)} \tag{5.1} \\
&= \frac{\exp l_k}{\sum_j \exp l_j} \tag{5.2}
\end{align}$$

> Remark. $P(A\vert B)$ : 조건부 확률, B가 주어졌을 때 A가 일어날 확률

이 때, $\frac{\exp l_k}{\sum_j \exp l_j}$는 **정규화된 지수 함수(_normalized exponential_)** 또는 **소프트 맥스 함수(_softmax function_)**라고 부른다. $l_k$에 대해

$$
l_k=\log p(\mathbf{x}\vert C_k)+ \log p(C_k)
$$

는 샘플 $\mathbf{x}$가 클래스 $C_k$에 속할 때의 **로그-우도(_log-likelihood_)**를 의미한다.

소프트 맥스 함수는 벡터에서 벡터로의 함수 형태로 나타내기도 하며, 이때는 다음과 같이 표기한다.

$$
\mathbf{P}=\text{softmax}(\mathbf{l})
$$

**소프트 맥스 함수**는 최댓값 지시 함수(maximum indicator function)의 부드러운 형태로 볼 수 있다. 이 함수는 $l_k$가 다른 값들에 비해 큰 값일 때, 해당 $l_k$에 대해 1을 반환한다.

특성 벡터 $\mathbf{x}$가 주어졌을 때 클래스 $C_k$의 우도를 결정할 때 사용되는 공식(5.1)을 이용하는 방법을 **베이즈 분류(_Bayesian classification_)**라고 한다. 왜냐하면 이 방법은 베이즈 정리를 이용해 조건부 특성 우도 $p(\mathbf{x} \vert C_k)$와 클래스에 대한 사전 분포 $p(C_k)$를 결합함으로써, 후험(posterior) 클래스의 확률을 결정하기 때문이다. 

또한, 다음과 같이 특성 벡터의 각 구성 요소들이 독립적으로 생성된다고 가정하는 경우에는 **나이브 베이스 분류(_naïve Bayes classifier)**라고 한다.

$$
p(\mathbf{x}\vert C_k) = \prod_i p(x_i \vert C_k)
$$

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.5.png" title="5.5" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.5 붉은색은 로지스틱 시그모이드 함수, 파란색은 수정된 오차함수
</div>

이진 분류 문제에서는 공식(5.2)를 다음과 같이 쓸 수 있다.

$$
p(C_0 \vert \mathbf{x}) = \frac{1}{1+\exp(-l)}=\sigma(l)
$$

이때 $l=l_0-l_1$은 두 클래스 로그-우도의 차이이며 로그 오즈**(_log odds_)** 또는 **로짓(_logit_)**라고 한다.

$\sigma(l)$함수는 **로지스틱 시그모이드 함수(_logistic sigmoid function_)** 또는 **로지스틱 함수**라고 부르며, 시그모이드는 S자 커브를 의미한다.

## LDA(Linear Discriminant Analysis)와 QDA(Quadratic Discriminant Analysis)
### LDA

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.6.png" title="5.6" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.6 두 개의 유일하게 분포된 가우스 클래스의 로지스틱 회귀. (a) 두 개의 가우스 분포가 파랑/빨강으로 표현되어있다. (b) 후험 확률은 함수의 높이와 붉은색 잉크의 비율로 표현되어있다.
</div>

소프트맥스 함수와 시그모이드 함수에 기반한 확률적 생성 분류 모델은 모든 로그-우도 집합에 적용할 수 있지만, 분포가 다변량 가우스 형태를 띌 경우 수식이 훨씬 간단해진다. 공분산 행렬 $\Sigma$가 동일한 가우스 분포에 대해서는 다음 수식을 적용할 수 있다.

$$
p(\mathbf{x}\vert C_k)=\frac{1}{(2\pi)^{D/2}}\frac{1}{\lVert\Sigma\rVert^{1/2}}\exp \left\lbrace -\frac{1}{2}(\mathbf{x}-\mu_k)^\top\Sigma^{-1}(\mathbf{x}-\mu_k)\right\rbrace
$$

이진 분류 문제에서는 다음과 같이 쓸 수 있다.

$$\begin{align}
&p(C_0 \vert \mathbf{x}) = \sigma(\mathbf{w^\top x}+b) \tag{5.3}\\
&\mathbf{w}=\Sigma^{-1}(\mu_0-\mu_1), \tag{5.4} \\
&b = \frac{1}{2}\mu_0^\top\Sigma^{-1}\mu_0 +\frac{1}{2}\mu_1^\top\Sigma^{-1}\mu_1 + \log\frac{p(C_0)}{p(C_1)}
\end{align}$$

수식 5.3은 비생성형 기반 분류에서 사용되는 **로지스틱 회귀(_logistic regression_)**이다. 로지스틱 회귀 라고 불리는 이유는 **선형 회귀 식(logit function)**

$$
l(\mathbf{x}) = \mathbf{w^\top x} + b \tag{5.5}
$$

의 출력을 로지스틱 함수에 통과시켜 클래스 확률을 얻기 때문이다. 이때, 선형 회귀 식 (5.4)에서 $\mathbf{w}$는 가중치 벡터를, $b$는 편향을 의미하며 이 둘은 분류 경계를 결정한다.

가중치 벡터 방향(5.4)은 좌표계를 공분산 행렬의 역행렬 $\Sigma^{-1}$에 의해 회전한 뒤, 두 분포의 평균 벡터를 연결하는 방향과 일치함에 주목하자. 또한, 편향항은 평균 제곱 모먼트들과 클래스 사전 확률의 로그 비율 $\log(p(C_0)/p(C_1))$에 비례한다.

### QDA

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CVAA/5.7.png" title="5.7" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 5.7 QDA. 클래스 공분산이 다를 때, 가우스 분포간의 결정 평면은 이차곡선평면의 형태를 띈다.
</div>

클래스가 2개 이상인 경우에 소프트 맥스 함수(5.2)는 선형 로그 우도에 다음과 같이 적용될 수 있다.

$$\begin{align}
&l_k(\mathbf{x})=\mathbf{w}_k^\top\mathbf{x}+b_k \\
&w_k=\Sigma^{-1}\mu_k\\
&b_k = -\frac{1}{2}\mu_k^\top\Sigma^{-1}\mu_k + \log p(C_k)
\end{align}$$

분류가 한 클래스에서 다른 클래스로 전환되는 결정 경계가 선형이기 때문에 결정 기준을 다음과 같이 표현할 수 있다.

$$
\mathbf{w}_k \mathbf{x} + b_k > \mathbf{w}_l\mathbf{x}+b_l
$$

이러한 기준을 사용하여 데이터를 분류하는 기법은 **선형 판별 분석(_linear discriminant analysis, LDA_)**라고 한다.

지금까지 살펴본 경우들은 모두 클래스의 공분산 행렬 $\Sigma_k$가 유일한 경우이며, 그렇지 않을 경우 결정 평면은 선형을 유지하지 않으며 quadratic함을 (그림5.7)을 통해 보인다. 이런 이차 결정 평면을 사용하는 기법은 **이차 판별 분석(_quadratic discriminant analysis, QDA_)**라고 한다.

# Logistic Regression

클래스 분포 문제를 해결하는 가장 쉬운 방법 중 하나는 **로지스틱 회귀(_logistic regression_)**이다. 베이시안 분류에서 사용되었던 것과 동일하게 가중치 벡터에 선형 투영을 적용하는 개념을 사용한다.

$$
l_i = \mathbf{w\cdot x}_i + b
$$

이 선형 투영 결과를 로지스틱 함수에 적용하면

$$
p_i=p(C_0\vert \mathbf{x}_i)=\sigma(l_i)=\sigma(\mathbf{w^\top x}_i+b) \tag{5.6}
$$

를 사용하여 이진 클래스 확률을 얻을 수 있다.

로지스틱 함수는 미지의 변수들에 대한 사전 확률 분포를 따로 구성하거나 가정하지 않기 때문에 **판별(_discriminative_) 모델**의 간단한 예시 중 하나라고 볼 수 있다.

따라서 클래스 평균과 공분산을 추정하여 분석할 수 없기 때문에 가중치 $\mathbf{w}$와 편향 $b$를 구하는 새로운 방법이 필요한데, 정답 클래스의 로그 후험 확률을 최대화 함으로써 구할 수 있다.

이진 분류 문제에서, 각 훈련 샘플 $x_i$에 대한 클래스 레이블이  $t_i \in \lbrace 0,1 \rbrace$라고 하자. 또한, $p_i = p(C_0\vert \mathbf{x})$는 주어진 가중치와 편향 $(\mathbf{w}, b)$에 대해 로지스틱 함수(5.6)에 따라 계산된 클래스 $C_0$의 추정 확률이라고 하자. 이때, 로그 우도의 음수를 최소화 하는 방법으로 추정된 올바른 라벨에 대한 우도를 최대화 할 수 있으며, 이를 **크로스-엔트로피 손실(_cross-entropy loss_)** 또는 **오류 함수(_error function_)**라고 한다. 이는 모델이 정답 클래스에 대해 높은 확률을 출력하도록 유도하는 손실 함수로, 확률적 해석과 최적화 모두에서 직관적이며 널리 사용된다.

$$
E_{CE}(\mathbf{w},b) = - \sum_i \lbrace t_i\log p_i+(1-t_i)\log(1-p_i)\rbrace
$$

라벨이 $t_i=0$일 경우, 모델이 예측한 확률 $p_i = p(C_0\vert \mathbf{x}_i)$가 가장 높아야 하며, 반대로, $t_i=1$일 경우에는 이 값이 낮게 나와야 한다는 점에 주목하자.

이 수식은 클래스 마다 수행된 선형 회귀 결과에 정규화된 지수 함수를 적용하여 후험 확률을 정의함으로써,  **다중 클래스 손실(_multi-class loss_)**로 확장될 수 있다.

$$
p_{ik} = p(C_k\vert \mathbf{x}_i) = \frac{\exp l_{ik}}{\sum_j \exp l_{ij}} = \frac{1}{Z_i}\exp l_{ik}
$$

이때, $l_{ik} = \mathbf{w}_k^\top\mathbf{x}_i + b_k$이다.

수식 $Z_i = \sum_j \exp l_{ij}$는 **정규화 상수(_partition function_)**로 소프트맥스 함수의 분모에 해당하며 확률 분포로 정규화하는 역할을 한다. 위 형태에서 일부 전개 과정을 거치면 이에 대응하는 **다중 클래스 크로스 엔트로피 손실 함수(_multi-class cross-entropy loss_)**를 다음과 같이 구할 수 있다.

$$
E_{MCCE}(\lbrace\mathbf{w}_k,b_k\rbrace) = - \sum_i\sum_k\tilde{t}_{ik}\log{p_{ik}}
$$

여기서 $\tilde{t}_{ik}$는 **원-핫 인코딩**을 의미하며, 샘플 $i$가 클래스 $k$에 속할 경우 1, 그렇지 않으면 0이 된다. 클래스 레이블을 원-핫 벡터 대신 정수형 값 $t_i \in \lbrace 0,1, \ldots, K-1\rbrace$로 표현하면 손실 함수는 다음과 같이 더욱 간결하게 쓸 수 있다.

$$
E(\lbrace \mathbf{w}_k, b_k) = -\sum_i \log{p_{it_i}}
$$

또한 소프트맥스 확률 정의를 손실 함수에 직접 대입하면, 각 샘플 $i$에 대해 다음과 같이 정리할 수 있다.

$$
E(\lbrace \mathbf{w}_k, b_k) = -\sum_i(\log Z_i - l_{it_i})
$$

최적의 가중치와 편향값을 결정하기 위해서 **경사 하강법(_gradient descent_)**를 사용할 수 있다.

$$
\mathbf{w \leftarrow w -H^{-1}}\nabla E(\mathbf{w})
$$

이 때, $\nabla E$는 손실함수 $E$를 가중치 변수 $\mathbf{w}$에 대해 편미분한 경사(_gradient_)를 의미하고, $\mathbf{H}$는 이차 편미분으로 구성된 **헤세 행렬(_Hessian matrix_, 곡률 정보를 담고 있다.)**이다. 크로스-엔트로피 함수는 미지의 가중치 변수에 비선형이기 때문에, 반복해서 위 수식을 전개하면 최적의 해를 찾을 수 있다.

이 방법은 손실 함수의 이차 근사를 통해 반복적으로 가중 최소제곱(_weighted least squares_) 문제를 푸는 방식이며, 각 반복 단계에서 헤세 행렬이 갱신된다는 점에서 **반복 가중 최소제곱법(_iteratively reweighted least squares, IRLS_)**이라고 불린다.

많은 비선형 최적화 문제들은 다수의 **국소 한계점(_local minima_)**을 가지지만, 크로스-엔트로피 함수는 그렇지 않기 때문에, 유일 해에 도달할 수 있음을 보장받는다.
