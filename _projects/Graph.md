---
layout: distill
title: Graph Representation Learning
description: Graph Representation Learning and GNN
img: assets/img/GRL_cover.jpeg
importance: 1
category: study
toc:
  - name: Ch.1 Introduction
    subsections :
    - name: Graph
  - name: Ch.3 Neighborhood Reconstruction Method
    subsections :
    - name: Encoder-Decoder perspective
  - name: Ch.4 Multi-Relational Data and Knowledge Graphs
    subsections :
    - name: Reconstructing Multi-Relational Data
    - name: Loss Functions
  - name: Ch.5 Graph Neural Network Model
    subsections :
    - name: Neural Message Passing

---

# Ch.1 Introduction
## Graph 
그래프 $\mathcal{G}=(\mathcal{V,E})$는 노드의 집합 $\mathcal{V}$와 노드 간 엣지의 집합 $\mathcal{E}$로 정의된다. 이때 노드 $u$에서 노드 $v$로 향하는 엣지는 $(u,v)\in\mathcal{E}$로 표기한다.

다양한 경우에 **Simple Graph**를 고려하는데 simple graph의 주요한 특징은 다음과 같다.

- 노드 쌍은 하나의 엣지만 가진다.
- 자기 자신과 연결되는 엣지는 없다.
- 엣지의 방향성이 없다. $(u,v)\in\mathcal{E}\leftrightarrow(v,u)\in\mathcal{E}$

일반적으로 **Adjacnecy Matirx** $\mathbf{A} \in \mathbb{R}^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert}$를 통해 그래프의 관계를 표현한다. 이는 행렬로 모든 노드간의 관계를 표현하는 방법이며 다음과 같이 이 행렬로 노드의 존재 여부를 표현할 수 있다.

$$
\mathbf{A}[u,v]=
\begin{cases}
1 \quad if \quad  (u,v)\in\mathcal{E} \\
0 \quad otherwise
\end{cases}
$$

그래프의 모든 엣지가 방향성을 가지지 않는 undirected edge라면 adjacency matrix는 symmetric matrix이며, directed/undirected edge가 섞여있다면 symmetric일 수도 아닐 수도 있다.

이때, Edge를 0과 1이 아닌 0~1의 실수로 표현하면 이는 **weighted edge**라고 부른다.

### Multi-Relational Graphs
Undirected, directed, weighted edge와 더불어 엣지의 type이 다른 그래프를 가정할 수도 있다. 이런 경우에 엣지의 표기법을 확장하는 **Extended Edge Representation** $(u,\tau,v)\in\mathcal{E}$ 를 사용한다. 또한 adjacency matrix를 엣지의 type 별로 정의하여 $\mathbf{A}_\tau$ 로 표기한다.

이런 그래프를 **Multi-Relational Graph**라고 부른다. 이 그래프는 adjacency tensor $\mathbf{A}\in\mathbb{R}^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{R}\rvert\times\lvert\mathcal{V}\rvert}$로 표현한다. 이 때 $\mathcal{R}$은 관계의 집합을 의미한다.

#### Heterogeneous graphs
**Heterogeneous graph**는 node에 유형(type)을 부여한 그래프이다. 노드에 각각을 구분하는 유형이 부여되었기 때문에 노드의 집합을 여러개의 겹치지 않는 노드의 집합으로 분할할 수 있다.

$$
\mathcal{V = V_1 \cup V_2 \cup \ldots \cup V_k} \quad where \quad \mathcal{V_i \cap V_j=\emptyset}
$$

이런 종류의 그래프의 엣지는 일반적으로 노드 유형에 따른 제약 조건을 따른다. 가장 흔한 제약은 특정 엣지가 특정 유형의 노드들만 연결할 수 있다는 것이다 $(v,\tau_i,u)\in\mathcal{E} \rightarrow u\in\mathcal{V}_j,\, v\in\mathcal{V}_k$.

Heterogeneous graph의 특수한 케이스로 **Multipartite graph**가 존재한다. 이 그래프의 엣지는 다른 유형의 노드들만 연결한다 $(u,\tau_i,v)\in\mathcal{E} \rightarrow u\in \mathcal{V}_j,\, v\in\mathcal{V}_k\land j\ne k$.

#### Multiplex Graphs
**Multiplex Graph**는 그래프를 k개의 레이어의 집합으로 분해한다. 모든 노드는 모든 레이어에 속하고, 각 레이어는 고유한 관계를 가진다.

**Intra-layer** edge는 하나의 레이어 내부에서만 연결되는 엣지이고, **Inter-layer** edge는 레이어 간 동일한 노드를 연결하는 엣지이다.

예를 들면, 교통 네트워크를 multiplex graph로 표현할 때 각 노드들은 도시를 의미하고 각각의 레이어는 노드 간의 교통편을 의미한다고 정의할 수 있다. 이때 Intra-layer edge는 한 개의 교통수단으로 각 노드를 이동할 수 있음을 의미하고, Inter-layer edge는 한 도시에서 갈아탈 수 있는 교통편을 의미한다.

### Feature Information
그래프에는 종종 **attribute**나 **feature** 정보가 담겨있는 경우가 있다. 대부분의 경우에는 실수 행렬 $\mathbf{X}\in\mathbb{R}^{\lvert\mathcal{V}\rvert\times m}$로 표현되는 node-level attribute다.

# Ch.3 Neighborhood Reconstruction Method
**Node Embedding**은 노드의 그래프 내부에서의 위치와 local graph neighborhood 구조를 low-dimensional 벡터로 압축/인코딩함을 의미한다. 다른 말로는 노드들을 latent space에 project하여 그 공간에서의 기하학적 관계와 원래 그래프의 관계를 반영하도록 하는 것.

결국 핵심은 Graph representation과 Node representation은 다르다는 것.
## Encoder-Decoder perspective
1. Encoder는 그래프의 노드들을 저차원 벡터/임베딩으로 매핑한다
2. Decoder는 저차원 노드 임베딩을 받아 원본 그래프에 속한 각 노드의 이웃들에 대한 정보를 복원 한다.

### Encoder
**Encoder**는 노드 $\mathcal{v\in V}$를 벡터 임베딩 $\mathbf{z}_\mathcal{V} \in \mathbb{R}^d$로 매핑하는 함수이다.

$$
\text{ENC} : \mathcal{V}\rightarrow \mathbb{R}^d, \quad \text{ENC}(\mathcal{v}) = \mathbf{Z}[\mathcal{v}]
$$
이 때, $\mathbf{Z}\in\mathbb{R}^{\lvert\mathcal{V}\rvert\times d}$ 는 모든 노드들의 임베딩 벡터를 담고있는 행렬이며, $\mathbf{Z}[\mathcal{v}]$는 노드 $\mathcal{v}$에 대응하는 $\mathbf{Z}$의 행이다.

**Shallow Embedding Method**는 각 노드마다 학습 가능한 임베딩 벡터를 직접 할당하는 방법이다. 그러나 인코더는 shallow embedding 방식에 국한되지 않고, 더 일반적인 형태로 확장할 수도 있다.
### Decoder
**Decoder**는 encoder에서 생성된 벡터 임베딩을 입력으로 받아 특정한 그래프 통계량(statistic)을 복원한다. 일반적으로 다음과 같이 **pairwise 디코더**를 사용한다.

$$
\text{DEC} : \mathbb{R}^d\times\mathbb{R}^d\rightarrow\mathbb{R}^+
$$

Pairwise 디코더는 노드 쌍 간의 관계나 유사도를 예측하는데 사용된다.(Reconstruction of the relationship).

목표는 reconstruction loss를 최소화 하는 방향으로 인코디와 디코더를 최적화 하는 것이다.

$$
\text{DEC}(\text{ENC}(u),\text{ENC}(v)) = \text{DEC}(\mathbf{z}_u,\mathbf{z}_v) \approx \mathbf{S}[u,v]
$$

이 때 $\mathbf{S}[u,v]$는 graph-based similarity measure between nodes를 의미한다.

### Optimizing an Encoder-Decoder Model
Reconstruction objective를 달성하기 위해 일반적으로 학습 노드 쌍의 집합 $\mathcal{D}$에 대한 emperical reconstruction loss $\mathcal{L}$을 최소화 하여야 한다.

{% raw %}
$$
\mathcal{L} = \sum_{(u,v)\in\mathcal{D}}l(\text{DEC}(\mathbf{z}_u,\mathbf{z}_v),\mathbf{S}[u,v])
$$
{% endraw %}

이때 $l$은 디코더가 산출한 유사도 값 $\text{DEC}(\mathbf{z}_u,\mathbf{z}_v)$와 실제 값 $\mathbf{S}[u,v]$ 사이의 차이를 측정하는 loss function이다.

# Ch.4 Multi-Relational Data and Knowledge Graphs
**Knowledge Graph Completion**은 관측된 multi-relational graph를 기반으로 누락된 node-relation-node tuple을 예측하는 task이다.

**Multi-Relational(Knowledge) Graph**는 $\mathcal{G=(V,E)}$로 정의되며, 엣지는 두 노드 사이에 특정 관계 $\tau\in\mathcal{T}$가 존재함을 나타내는 튜플 $e=(u,\tau,v)$로 정의된다.

## Reconstructing Multi-Relational Data
두 노드 임베딩 $\mathbf{z}_u,\mathbf{z}_v$와 relation type $\tau$를 이용하여 튜플$(u,\tau,v)$의 존재 여부와 score를 복원한다.

이 task를 수행할 때 decoder는 단순히 노드 임베딩 쌍을 입력받는게 아니라 relation type까지 같이 입력받아야 한다.

$$
\text{DEC} : \mathbb{R}^d \times \mathcal{R} \times \mathbb{R}^d \rightarrow \mathbb{R}^+
$$

더불어, Decoder의 출력 $(\mathbf{z}_u, \tau, \mathbf{z}_v)$는 해당 edge가 그래프에 존재할 가능성으로 해석된다.

이때, 임베딩 행렬 $\mathbf{Z}$와 relation 행렬 $\mathbf{R}_\tau, \forall_\tau \in \mathcal{R}$은 다음과 같은 mean-squared reconstruction loss를 사용한다.

$$\begin{align}
\mathcal{L} & =\sum_{u\in\mathcal{V}}\sum_{v\in\mathcal{V}}\sum_{\tau\in\mathcal{R}}\lVert \text{DEC}(u,\tau,v)-\mathcal{A}[u,\tau,v]\rVert^2 \\
&= \sum_{u\in\mathcal{V}}\sum_{v\in\mathcal{V}}\sum_{\tau\in\mathcal{R}} \lVert\mathbf{z}_u^\top \mathbf{R}_\tau \mathbf{z}_v-\mathcal{A}[u,\tau,v]\rVert^2
\end{align}$$

이 때, $\mathcal{A} \in \mathbb{R}^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{R}\rvert\times\lvert\mathcal{V}\rvert}$는 multi-relational graph를 위한 adjacency tensor다.

## Loss Functions
위에서 설명한 reconstruction loss는 시간 복잡도가 $O(\lvert\mathcal{V}\rvert^2\lvert\mathcal{R}\rvert)$이기 때문에 게산이 사실상 불가능하며, 우리가 원하는 이상적인 loss의 시간 복잡도는 $O(\lvert\mathcal{E}\rvert)$이다. 또 다른 문제는 low-dimensional 노드 임베딩에서 adjacency tensor를 디코딩 해야한다는 것인데, 이 tensor에는 binary 값만 담겨져 있고, mean-squre error는 binary comparison과는 맞지 않는다.

### Cross-Entropy with Negative Sampling
Cross-Entropy loss with Negative Sampling은 다음처럼 정의할 수 있다.

$$
\mathcal{L} = \sum_{(u,\tau,v)\in\mathcal{E}} -\log(\sigma(\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_v))) - \gamma\mathbb{E}_{v_n\sim\mathbf{p}_{n,u}(\mathcal{V})}[\log(\sigma(-\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_v)))]
$$

이 때, $\sigma$는 로지스틱 함수, $\mathbf{P}_{n,u}(\mathcal{V})$는 전체 노드 집합 $\mathcal{V}$에 대한 negative sampling 분포, $\gamma>0$는 하이퍼파라미터를 의미한다.

수식을 좀 뜯어보면 첫 번째 항

$$
\log(\sigma(\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_v)))
$$
은 그래프에 실제로 존재하는 엣지를 **존재한다고 예측할 log-likelihood**와 같다.

두 번째 항

$$\mathbb{E}_{v_n\sim\mathbf{p}_{n,u}(\mathcal{V})}[\log(\sigma(-\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_v)))]$$

은 그래프에 실제로 존재하지 않는 엣지를 **존재하지 않는다고 올바르게 예측할 expected log-likelihood**와 같다.

실제 적용에서는 몬테카를로 근사를 사용하여 다음처럼 표현한다.

$$
\mathcal{L} = \sum_{(u,\tau,v)\in\mathcal{E}} -\log(\sigma(\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_v))) - \sum_{v_n\in\mathcal{P}_{n,u}}[\log(\sigma(-\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_{v_n})))]
$$

$\mathcal{P}_{n,u}$는 $\mathcal{P}_{n,u}(\mathcal{V})$에서 샘플링한 적은 수의 노드 집합을 의미한다.

### Max-Margin Loss

$$
\mathcal{L} = \sum_{(u,\tau,v)\in\mathcal{E}}\sum_{v_n\in\mathcal{P}_{n,u}} \max(0, -\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_v)+\text{DEC}(\mathbf{z}_u,\tau,\mathbf{z}_{v_n})+ \Delta )
$$
이 loss function에서도 실제 노드 쌍의 디코딩 점수와 negative sample의 점수를 비교하고 이를 **Contrastive estimation**이라고 한다. 다만, 이를 binary classifcation이 아니라 두 점수의 상대적인 순위를 학습한다. $\Delta$ 항은 마진(margin)이라고 하며, 모든 example에서 두 점수 차가 최소 $\Delta$이상이면 로스는 0이 된다.

# Ch.5 Graph Neural Network Model
**Graph Neural Network** : 그래프 데이터에 deep neural network를 적용한 general framework
-> 그래프 구조에 의존성을 가지는 노드의 representation을 생성한다.

## Neural Message Passing
**Neural Message Passing**을 사용하여 노드들은 벡터 형태의 메세지를 서로 주고받으며, 신경망을 통해 각 노드 feature를 갱신한다.

GNN은 일반적으로 노드 feature $\mathbf{X}\in\mathbb{R}^{d\times\lvert\mathcal{V}\rvert}$ 집합과 함께 그래프 $\mathcal{G=(V,E)}$를 입력받아 노드 임베딩 $\mathbf{z}_u, \forall_u \in \mathcal{v}$를 생성한다.

### Overview of the Message Passing Framework
GNN의 각 message-passing 반복에서 각각의 노드 $u\in\mathcal{V}$에 대응하는 hidden embedding $\mathbf{h}_u^{(k)}$은 노드 $u$의 그래프 neighborhood로부터 집계된 정보를 바탕으로 갱신된다.

$$\begin{align}
\mathbf{h}_u^{(k+1)} &= \text{UPDATE}^{(k)}(\mathbf{h}_u^{(k)}, \text{AGGREGATE}^{(k)}({\mathbf{h}_v^{(k)},\forall_v\in\mathcal{N}(u)})) \\
&= \text{UPDATE}^{(k)}(\mathbf{h}_u^{(k)},\mathbf{m}^{(k)}_{\mathcal{N}(u)})
\end{align}$$

이때, $\text{UPDATE, AGGREGATE}$는 뉴럴 네트워크와 같이 미분가능한 임의의 함수이며, $\mathbf{m}_{\mathcal{N}(u)}$은 노드 $u$의 그래프 neighborhood $\mathcal{N}(u)$로부터 집계된 "메세지"이다.

GNN의 각 반복 $k$에서 $\text{AGGREGATE}$함수는 노드 $u$의 그래프 neighborhood $\mathcal{N}(u)$에 속한 노드들의 임베딩 집합을 입력받고 집계된 neighborhood 정보를 기반으로 메세지 $\mathbf{m}_{\mathcal{N}(u)}^{(k)}$를 생성한다. $\text{UPDATE}$ 함수는 집계된 메세지 $\mathbf{m}_{\mathcal{N}(u)}^{(k)}$와 노드 $u$의 이전 임베딩 $\mathbf{h}_u^{(k-1)}$을 결합하여 새로운 임베딩$\mathbf{h}_u^{(k)}$을 만든다. 

초기 단계 $k=0$에서 모든 노드의 임베딩은 각 노드의 입력 feature로 설정된다. GNN message passing을 $K$번 반복하고 난 뒤에 마지막 레이어의 출력값을 각 노드의 임베딩으로 정의할 수 있다

$$
\mathbf{z}_u=\mathbf{h}_u^{(K)}, \forall_u \in \mathcal{V}
$$

### The Basic GNN
