---
layout: post
title: "[Paper] Multitask Active Learning for Graph Anomaly Detection"
date: 2026-07-04 12:00:00
description: Review of paper 'MITIGATE'
tags: Paper, AL, AD, Graph
categories: Paper
pretty_table: true
---

[Multitask Active Learning for Graph Anomaly Detection](https://arxiv.org/abs/2401.13210)

# First Pass

## Words

## 5C

1. **Category** : Graph AD + Graph AL을 결합한 새로운 방법론 제시
2. **Context**
   1. Graph Active Learning
      1. Active Learning for Graph Embedding[Paper](https://arxiv.org/abs/1705.05085)
   2. Active Anomaly Detection
      1. Incorporating Expert Feedback into Active Anomaly Discovery[Paper](https://ieeexplore.ieee.org/document/7837915/)
   3. Graph Anomaly Detection
      1. Deep Anomaly Detection on Attributed Networks[Paper](https://epubs.siam.org/doi/10.1137/1.9781611975673.67)
3. **Correctness** : Multitask Learning -> Confidence Difference -> Masked Aggregation으로 이어지는 흐름은 창의적임. 다만, out-of-distribution sample을 anomaly와 동일시 하고 있으며, 학습 초기에 anomaly가 없다고 가정하는 부분이 다소 비약적임. 정확히는 known anomaly label이 없다고 가정하는게 적절하다고 생각하나, 전제 자체가 비약이 심함. 또한 주장하는 바의 핵심에 대해 데이터와 근거가 부족함
4. **Contributions** : 논문이 주로 기여하고자 하는 바가 무엇인지?
5. **Clarity** : 논문의 핵심이 되는 용어를 후반부에 정의하여 초반부 가독성이 떨어짐. 템플릿 수정 또한 미약하며, 전반적으로 복잡한 핵심을 간결히 풀어 서술하기보단 간단한 문제를 과하게 현학적이게 서술함.

# Second Pass

## Introduction

### 문제 제기 1

선행 연구들에서 제안된 unsupervised methods는 outlier pattern을 도출하기 위해 데이터의 고유한(underlying) 분포에 크게 의존한다. 결과적으로, unsupervised methods는 가정하고 있는 분포에서 벗어나거나 특정 domain knowledge를 포함한 데이터를 마주했을때 불안정한 성능을 보인다.

또한 normal/anomalous nodes 둘 다 수동으로 annotation하는데에 많은 비용이 들기 때문에 충분한 양의 GT 라벨을 확보하기 어렵다. 따라서 fully supervised learning을 적용하는것도 현실적으로 제한된다.

### 문제 제기 2

기존 Semi-supervised AD는 normal/anomalous 노드가 모두 적절히 보함된 학습 데이터를 가정한다. 하지만 실제로는 제한된 라벨링 예산 아래에서 normal/anomalous 노드를 효과적으로 구분할 수 있는 이상적인 학습 데이터를 구축하는 것은 쉽지 않다.

### 문제 제기 3

존재하는 Anomaly Detection 해결을 위한 query strategy는 독립항등분포(i.i.d.) 데이터를 기반으로 설계되어있어 샘플들 간의 관계를 충분히 반영하지 못하며 그래프 구조 데이터에는 적합하지 않을 수 있다.

### 제안한 메커니즘

저자가 제안한 Multitask active graph anomaly detection framework는 auxiliary 작업으로부터 얻은 supervision 신호와, AL을 통해 획득한 anomaly label이라는 직접적인 supervision 신호를 함께 활용한다.

또한 더 가치있는 노드를 query하기 위해 training과 labeling 상태에 따른 노드의 informativeness와 representativeness를 동적으로 측정하는 query strategy를 제안하였다.

## Method

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/paper_review/MITIGATE/Mechanism.png" title="Illustration of the proposed MITIGATE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Illustration of the proposed MITIGATE
</div>

### Overview

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/paper_review/MITIGATE/Notations.png" title="Notations of the proposed MITIGATE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Notations of the proposed MITIGATE
</div>

저자의 매커니즘은 노드 representation 학습을 위한 shared encoder, 노드 classification과 anomaly score prediction을 위한 두 개의 decoder를 활용하였다.

초기 성능의 Gap을 줄이기 위해 classification uncertainty를 informativeness score 측정에 포함하였다.

Cluster 중심을 representative sample로 취급하는 K-Medoids 알고리즘을 node selection 과정에 적용하였다. 이 중심으로부터 가장 높은 informativeness score를 가진 b개의 노드를 고른 후에, oracle에게 선택된 노드들을 제공하여 normal인지 anomalous인지에 대한 label을 취득한다. 최종적으로 training 데이터 셋과 oracle을 거쳐 수정된 데이터셋을 통합하여 model training을 계속 진행한다.

#### Encoder

Graph Convolutional Networks(GCNs)를 적용하여 expressive node representation을 학습하였고, layer-wise propagation을 다음처럼 정의하였다.

$$
\mathbf{H}^{(l+1)}=\sigma(\mathbf{\tilde{D}^{-\frac{1}{2}}\tilde{A}\tilde{D}^{-\frac{1}{2}}H^{(l)}W^{(l)}}) \tag{2}
$$

이때, $\mathbf{\tilde{A}=A+I},\, \tilde{\mathbf{D}}_{ii}=\Sigma_j\tilde{\mathbf{A}_{ij}}$ 이다.

#### Node Classifier

Intermediate node representation의 구조적 정보를 더욱 보존하기 위해 GCN을 중간 노드 분류기로 사용하였다.

$$
\mathbf{Z}=\sigma(\mathbf{\tilde{D}^{-\frac{1}{2}}\tilde{A}\tilde{D}^{-\frac{1}{2}}HW}^N) \tag{3}
$$

Anomaly들이 classification에서 uncertain한 경향이 있기 때문에 anomaly probability를 측정하기 위해 entropy를 사용하였다. 높은 entropy 점수는 nomaly일 가능성이 높음을 의미한다.

노드 분류기에서 나온 $v_i$의 anomaly 점수는 다음과 같다.

$$
e_i = -\sum_j^C\mathbf{z}_{ij}\cdot \log \mathbf{z}_{ij} \tag{4}
$$

#### Anomaly score predictor

공유되는 노드 representation을 기반으로한 시그모이드 함수와 함께 linear transformation으로 anomaly socre predictor를 설계하였다.

$$
\mathbf{p} = Sigmoid(\mathbf{W}^A\mathbf{H}+b^A) \tag{5}
$$

#### Hybrid anomaly score

Node classifier와 anomaly socre predictor 모두 anomaly를 탐지하도록 설계되었기 때문에 weighted score function을 적용하여 두 예측값에 대한 standard score를 정의하였다.

$$
\mathbf{s} = Norm(\mathbf{e})+\phi\cdot Norm(\mathbf{p}),\,Norm(\mathbf{e})=\frac{\mathbf{e}-\mu_e}{\sigma_e} \tag{6}
$$

### Node Selection

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/paper_review/MITIGATE/Algorithm.png" title="Algorithm of the proposed MITIGATE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Algorithm of the proposed MITIGATE
</div>

노드 선택을 위해 distance-based clustering을 이용하여 각 노드의 representativeness를 평가하고, confidence difference를 이용하여 informativeness를 측정함으로써 노드의 가치를 산정한다.

#### Distance-based Clustering

**Masked aggregation mechanism**을 사용하여 이전 라벨링된 데이터들의 feature와 latent space안의 관계를 고려하는 distance feature를 생성하였다.

거리 기반 노드 선택에서 distance feature가 주변 이웃 노드의 현재 라벨링 상태를 반영해야 한다. 특히나, 이전 단계에서 선택된 노드들은 representative하기 때문에 선택되었다. 이러한 노드들의 특징을 주변 노드와 동일하게 집계하면 중심 노드의 representativeness가 왜곡될 수 있다. 이를 해결하기 위해, 저자는 이웃 노드의 라벨링 상태를 고려하는 masked aggregation mechanism을 통해 distance feature를 생성한다.

라벨링 되지 않은 노드에 내제된 distinctive feature를 강조하기 위해 이웃 정보를 평균낼 때 라벨링 되지 않은 이웃 노드의 수가 아니라 전체 이웃 노드의 수를 기준으로 계산한다.

$$
\hat{\mathbf{h}}_i^t=\frac{SUM(\mathbf{h}_j,\forall_{v_j}\in \mathcal{N}(v_i)\cap \mathcal{V}^{t-1}_U)}{|\mathcal{N}(v_i)|} +\mathbf{h}_i \tag{7}
$$

이때 거리는 $dist(v_i,v_j) = \| \hat{\mathbf{h}^t_i}-\hat{\mathbf{h}^t_j}\|_2\tag{8}$로 계산한다.

최종적으로 이 계산의 목표는 classification uncertainty와 anomaly 점수의 관점에서 normal/anomalous 노드를 효과적으로 계산하는 predictive model을 학습하는 것이다.

#### Confidence Difference

높은 엔트로피 점수는 노드가 anomaly로 분류될 confidence가 높음을 의미한다. 또한, anomaly score predictor 관점에서 anomaly 점수는 confidence의 level을 설명하는 indicator의 역할을 한다.

Node classifier의 confidence는 $\mathbf{c}^N\in\mathbb{R}^n$, anomaly score predictor의 confidence는 $\mathbf{c}^A\in\mathbb{R}^n$로 표기하고 다음을 따른다.

$$
\mathbf{c}^N\propto\mathbf{e}, \mathbf{c}^A\propto\mathbf{p} \tag{9}
$$

Node classifer와 Anomaly detector는 동일한 단계에서 동일한 노드에 대해 anomaly detection을 항상 동일하게 수행하지는 않는다. 서로 다른 task에서 나온 점수들의 scale 차이를 제거하기 위해, classification entropy와 anomaly score를 Z-score로 정규화하고, 그 confidence는 다음과 같이 다시 정의할 수 있다.

$$
\mathbf{c}^N=Norm(\mathbf{e}), \mathbf{c}^A=Norm(\mathbf{p}) \tag{10}
$$

여기서 confidence 차이를 정량화 하기 위해 manhattan distance를 적용할 수 있다.

$$
\mathbf{d} =|\mathbf{c^A-c^N}| \tag{11}
$$

높은 $\mathbf{d}$ 값은 두 decoder의 예측이 서로 충돌하고 있음을 의미한다. 이때 두 decoder의 예측을 일치시키고 보다 일관된 판단을 할 수 있도록, oracle이 confidence difference가 큰 노드의 정답을 제공하고, 이렇게 얻은 라벨을 이용해 두 decoder가 같은 방향으로 학습하도록 유도한다.

#### Selection

Model training에 알맞게 분별력 있는 샘플들을 고르고 positive sample이 부재함의 영향을 완화하기 위해 **time-sensitive informativeness measurement**를 제안하였다.

Exponentially decaying 파라미터 $\tau$를 도입하여, 노드 선택 과정에서 node classification entropy와 task confidence difference를 동적으로 결합한다. 이때 Informativeness score $Info \in \mathbb{R}^n$은 다음과 같이 정의된다.

$$
Info = \tau^{|\mathcal{V}^t_L|} Norm(\mathbf{e}) + (1-\tau^{|\mathcal{V}^t_L|})\mathbf{d} \tag{12}
$$

여기서 $\mid\mathcal{V}^t_L\mid$은 t번째 반복에서 현재까지 라벨이 부여된 노드의 개수를 의미하고, $\tau$는 1에 가까운 값으로 설정한다.

결과적으로, 학습 초기에는 informativeness score가 anomaly와 관련된 정보(분류 entropy)의 영향을 더 크게 받으며, 학습이 진행될수록 모델 중심(model-centric) 관점에서 두 task의 예측이 충돌하는(conflicting prediction) 노드를 찾는 방향으로 점차 초점이 이동한다.

### Model Training

각각의 querying 반복이 끝난 후 모델은 세 가지 측면에서 최적화를 계속적으로 수행한다.

1. Node Classification을 위해 미리 라벨된 노드 $\mathcal{V}_L^N$에 cross entropy loss를 계산한다.

$$
\mathcal{L}_{nc} = - \frac{1}{|\mathcal{V}_L^N|}\sum_{v_i\in\mathcal{V}_L^N}\sum^C_{j=0}y_{ij}^N\log z_{ij} \tag{13}
$$

2. 각 반복에서 AD 수행을 위해 라벨된 노드 $\mathcal{V}_L^t$에 대해 weighted binary cross-entropy loss를 적용한다.

$$
\mathcal{L}_{ad}=-\frac{1}{|\mathcal{L}_L^t|}\sum_{v_i\in\mathcal{V}^t_L}(\gamma^ty_i^A\log\mathcal{p}_i+(1-y_i^A)\log(1-\mathcal{p}_i)) \tag{14}
$$

3. 전체 라벨링된 데이터셋에 대해 classification prediction의 uncertainty를 최적화한다.

$$
\mathcal{L}_{un}-\frac{1}{|\mathcal{V}^t_{LN}|}\sum_{v_i\in\mathcal{V}_{LN}^t}\sum_k^C z_{ik}\log z_{ik} + \frac{1}{\mathcal{V}_{LA}^t}\sum_{v_j\in \mathcal{V}_{LA}^t}\sum_k^C z_{jk} \log z_{jk} \tag{15}
$$

15번 수식에서 정상 노드에서 예측된 uncertainty를 최소화(첫 번째 수식) 하는 동시에, anomaly의 uncertainty를 최대화(두 번째 수식)한다.

최종적으로 제안된 매커니즘의 전체 loss function은 다음처럼 정리할 수 있다.

$$
\mathcal{L}=\alpha \cdot \mathcal{L}_{nc} + \beta \cdot \mathcal{L}_{ad} + \mathcal{L}_{un}\tag{16}
$$

## Experiments

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/paper_review/MITIGATE/Experiments.png" title="Overall performance comparison in AUC-ROC(%) and AUC-PR(%) on four dataset" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overall performance comparison in AUC-ROC(%) and AUC-PR(%) on four dataset
</div>

## Supplement

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/paper_review/MITIGATE/Informativeness.png" title="Explanation about Confidence difference focusing on Entropy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Explanation about Confidence difference focusing on Entropy
</div>

그래프를 보면 파란색 네모 쳐져있는곳이 Informativeness가 높다고 정의한다.
좌에서 우로 갈수록 Classification Entropy가 높아지고, 아래에서 위로 갈수록 Anomaly Score가 높아진다. 결국, 박스 쳐져있는 곳은 Entropy와 Anomaly Score간의 간극이 큰 지점이라고 볼 수 있다.

더 자세히 설명하면, 우하단은 Entropy가 높고 Anomaly Score가 낮다. 논문에 의하면 엔트로피가 높은 노드는 이 노드가 어느 클래스인지 확신하지 못함을 의미하고, Anomaly Score가 낮다는 것은 일반적인 패턴을 가지는 정상 노드일 가능성이 높음을 의미한다. 반대로 Entropy가 낮고 Anomaly Score가 높으면 이는 이 노드가 어느 클래스인지 확신하는 정도가 높지만 정상 분포에서 많이 벗어나 있음을 의미한다.

따라서 우하단의 경우엔 classification은 이 노드가 Normal인지 Abnomal인지 확신하지 못하지만 Anomaly는 정상 노드임이 확실하다고 판단한 경우이고, 좌상단의 경우엔 어떤 노드인지 확신하지만 Anomaly head가 이상하다고 판단하는 경우이기 때문에 Informativeness가 높다고 판단한다.
