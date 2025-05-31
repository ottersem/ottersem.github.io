---
layout: post
title: Analytic Geomatry
date: 2025-05-29 20:37:00
description: Analytic Geomatry from MML
tags: Linear_Algebra, norms, inner_products, orthonoraml, orthogonal
categories: Math
pretty_table: true
---

| **섹션**                             | **꼭 챙길 핵심식·키워드**                      | **왜 중요한가?**                      | **읽기 강도** |
| ---------------------------------- | ------------------------------------- | -------------------------------- | --------- |
| **3.1 Norms**                      | ‖x‖₁, ‖x‖₂, 삼각부등식                     | 입력 스케일링·정규화, L1/L2 규제 직관         | ★★☆       |
| **3.2 Inner Products**             | ⟨x,y⟩, dot, positive-definite, SPD 행렬 | SVM 커널, GP 커널, 거리·유사도 모든 정의의 출발점 | ★★★       |
| **3.3 Lengths & Distances**        | d(x,y)=‖x−y‖, Cauchy-Schwarz          | KNN·군집·거리기반 손실                   | ★★☆       |
| **3.4 Angles & Orthogonality**     | cos ω=⟨x,y⟩/(‖x‖‖y‖)                  | SVM margin, cosine-sim 검색        | ★★☆       |
| **3.5 Orthonormal Basis**          | Gram-Schmidt 전까지 예습                   | PCA·SVD 직관 “축 바꾸기”               | ★☆☆       |
| **3.6 Orthogonal Complement**      | U⊥, normal vector                     | 하이퍼플레인, 제약 조건 투영                 | ★☆☆       |
| **3.7 Inner Product of Functions** | ∫ u(x)v(x)dx                          | 커널(무한 차원 Φ) 개념 맛보기               | ☆☆☆ (스킴)  |
| **3.8 Orthogonal Projections**     | P= B(BᵀB)⁻¹Bᵀ , LS 해                  | Linear Reg.(Ch 9), PCA 재구성 오차    | ★★★       |
| **3.8.3 Gram–Schmidt**             | uₖ = bₖ − π_{span(u₁…uₖ₋₁)}(bₖ)       | QR분해·CG·좌표정규화                    | ★★☆       |
| **3.9 Rotations**                  | 2D, 3D Givens                         | CNN weight 공유 해석, 증강변환           | ★☆☆       |

# 노름(Norms)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/MML/3.1.png" title="3.1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 3.1
</div>

## 정의
벡터 공간 $V$위의 노름은 다음과 같이 정의된다.

$$
\begin{gather}
\lVert \cdot \rVert : V \rightarrow \mathbb{R} \\
x \mapsto \lVert x \rVert
\end{gather}
$$

즉, **노름**은 벡터 공간 $V$와 각 벡터$x$에 대해 그 벡터의 **길이**를 나타내는 실수 값 $\lVert x \rVert \in \mathbb{R}$을 반환하는 함수이다.

## 노름의 성질
1. 절대적 동차성(Absolute homogeneity) : $\lVert \lambda x \rVert = \lvert \lambda \rvert \cdot \lVert x \rVert$
스칼라를 곱하면 노름도 그 절댓값만큼 스케일링 된다.

2. 삼각 부등식(Triangle inequality) : $\lVert x+y \rVert \le \lVert x \rVert + \lVert y \rVert$
두 벡터를 더한 벡터의 노름은 각 벡터 노름의 합보다 크지 않다.

3. 양의 정부호성(Positive definiteness) : $\lVert x\rVert \ge and \lVert x\rVert = 0 \Leftrightarrow x=0$
벡터의 노름은 0보다 크거나 같으며, 0인 경우에만 벡터가 0이다.

## Manhattan Norm(L1 Norm)
실수 공간 $\mathbb{R}^n$위에 정의된 _맨하탄 노름(Manhattan Norm_)은 $x\in \mathbb{R}^n$에서 다음과 같이 정의된다.

$$
\lVert x \rVert_1 := \sum^n_{i=1}\lvert x_i \rvert
$$

상단 그림의 좌측 이미지는 $\lVert x \rVert_1 = 1$을 만족하는 모든 $x \in \mathbb{R}^2$들을 시각화 한 것이다.

## Euclidean Norm(L2 Norm)
실수 공간 $\mathbb{R}^n$위에 정의된 _유클리드 노름(Euclidean Norm_)은 $x\in \mathbb{R}^n$에서 다음과 같이 정의된다.

$$
\lVert x \rVert_2 := \sqrt{\sum^n_{i=1}x_i^2}=\sqrt{x^\top x}
$$

유클리드 노름은 원점으로부터 $x$까지의 유클리드 거리를 계산한다. 상단 그림의 우측 이미지는 $\lVert x \rVert_2 = 1$을 만족하는 모든 $x \in \mathbb{R}^2$들을 시각화 한 것이다.

# 내적(Inner product)
## 정의
벡터 공간 $V$에서 함수 $\Omega : V \times V \rightarrow \mathbb{R}$는 두 벡터를 입력받아 실수로 대응시키는 쌍선형(_bilinear_) 함수라고 하자. 이때 다음을 따른다.
- 모든 $x, y \in V$에 대해 $\Omega(x,y) = \Omega(y,x)$를 만족하면 $\Omega$는 대칭적(_symmetric_)이다.
- 다음 조건을 따르면 $\Omega$는 양의 정부호(_positive definite_)이다.

$$
\forall x\in V \backslash \{ 0 \} : \Omega(x,x) > 0, \quad \Omega(0,0)=0
$$

- 대칭적이고 양의 정부호인 쌍선형 함수 $\Omega : V \times V \rightarrow \mathbb{R}$은 **$V$의 내적(_inner product_)**이라고 부르며, 일반적으로 $\langle x,y\rangle$로 작성한다.
- 쌍 ($V,\langle \cdot,\cdot \rangle$)은 **내적공간(_inner product space_) 또는 벡터 공간에서의 내적(vector space with inner product)**라고 한다.


## 양의 정부호인 대칭 행렬(Symmetric, Positive Definite Matrices)
내적 공간 $V$와 $V$의 순서가 있는 기저 $B=(b_1, \ldots, b_n)$가 있다고 하자. 이때 $x,y \in V$인 모든 벡터는 기저벡터의 선형 결합으로 작성할 수 있으므로, $x=\sum_{i=1}^n\psi_ib_i,\ y=\sum_{j=1}^n\lambda_jb_j \in V$를 만족한다. 내적의 쌍선형성으로 인해 $x,y\in V$는

$$
\langle x,y\rangle = \langle \sum_{i=1}^n\psi_ib_i,\sum_{j=1}^n\lambda_jb_j\rangle = \sum_{i=1}^n \sum_{j=1}^n\psi_i\langle b_i,b_j \rangle \lambda_j=\hat{x}^\top A\hat{y}
$$

를 만족하고, 이때 $A_{ij}:=\langle b_i, b_j \rangle$과 $\hat{x}, \hat{y}$는 기저 $B$를 다르는 $x,y$의 좌표 벡터이다.

이는 내적 $\langle \cdot,\cdot \rangle$이 유일하게 $A$를 통해서만 정의됨을 의미한다. 또한 내적의 대칭성은 $A$ 또한 대칭임을 의미하며, 더 나아가서 내적의 양의 정부호성은 다음을 의미한다.

$$
\forall x \in V \backslash\{0\} : x^\top A x> 0
$$

내적의 양부호성을 만족하는 $A \in \mathbb{R}^{n\times n}$은 **양의 정부호인 대칭행렬** 또는 그냥 **양의 정부호인 행렬**이라고 부르며, 위 수식에서 $\geqslant$를 사용한다면 **_symmetric, positive semidefinite_**라고 부른다.

만약 $A \in \mathbb{R}^{n\times n}$이 양의 정부호인 대칭 행렬이라면 다음 정의는 순서가 있는 기저 $B$를 따르는 내적을 의미한다.

$$
\langle x,y \rangle = \hat{x}^\top A \hat{y}
$$

## 정리
실수 값을 가지는 유한한 차원의 벡터 공간 $V$와 그 공간의 순서가 있는 기저$B$가 있을 때 다음 명제가 성립한다

$$\langle\cdot,\cdot\rangle : V \times V \rightarrow \mathbb{R}$$

이때 위 명제가 내적이 되기 위한 필요충분 조건은, 대칭이고 양의 정부호인 행렬 $A\in\mathbb{R}^{n\times n}$가 존재하는 것이다. 동시에 내적은 다음과 같이 표현된다.

$$
\langle x,y \rangle = \hat{x}^\top A \hat{y}
$$

위 명제를 충족하면 다음과 같은 성질을 같는다.
- **$A$의 널 공간은 오직 0으로 구성된다.** 왜냐하면 모든 $x \ne 0$에 대해 $x^\top Ax>0$이기 때문이며, 이는 $x \ne 0$일때 $Ax \ne 0$임을 의미한다.
- **$A$의 대각성분 $a_{ij}$는 양수이다.** 왜냐하면 $a_{ii}=e_i^\top A e_i$이기 때문이다. 이때는 $e_i$는  $\mathbb{R}^n$에 속한 표준 기저벡터 중 $i$번째 벡터이다.

# 길이와 거리(Lengths & Distances)

일반적으로 모든 내적은 노름 $\lVert x\rVert := \sqrt{\langle x,x \rangle}$을 유도할 수 있고, 이를 통해 벡터 간의 거리를 계산할 수 있다. 그러나 모든 노름이 내적을 통해 유도되지는 않는다.

$x= [1,1]^\top \in \mathbb{R}^2$일 때 스칼라 곱을 내적으로 이용한다면 다음과 같이 $x$의 길이를 계산 할 수 있다.

$$
\lVert x \rVert = \sqrt{x^\top x}=\sqrt{1^2 + 1^2} = \sqrt{2}
$$

만약 다른 내적을 정의해 이용한다면 어떨까?

$$
\langle x,y \rangle := x^\top \begin{bmatrix}1 & -\frac{1}{2} \\ -\frac{1}{2} & 1\end{bmatrix}y = x_1y_1 - \frac{1}{2}(x_1y_2+x_2y_1)+x_2y_2
$$

벡터의 노름을 계산할 때 $x_1, x_2$가 같은 부호를 가진다고 가정하면 스칼라 곱을 사용한 방식보다 작은 값을 반환하지만, 다른 부호를 가진다고 가정하면 스칼라 곱 보다 더 큰 값을 반환한다. 위 내적을 이용해서 계산하면 다음과 같다.

$$
\langle x,x\rangle = x_1^2 - x_1x_2 + x_2^2 = 1-1+1 = 1 \Rightarrow \lVert x \rVert = \sqrt{1} = 1
$$

## 정의

내적 공간 ($V,\langle \cdot,\cdot \rangle$)에서 다음 수식은 $x,y$간의 **거리(_distance_)**를 나타낸다.

$$
d(x,y) := \lVert x-y\rVert = \sqrt{\langle x-y, x-y\rangle}
$$

이때 스칼라 곱을 내적으로 사용한다면 이 거리는 **유클리드 거리(_Euclidean distance_)**라고 부른다.

다음 사상은 **_Metric_**라고 부른다.

$$
\begin{align}
d &: V \times V \rightarrow \mathbb{R} \\
&(x,y) \mapsto d(x,y)
\end{align}
$$
Metric은 다음 조건을 충족한다.
- 양의 정부호 : 모든 $x,y \in V$에 대해 $d(x,y) \geqslant0$이며, $d(x,y) = 0 \Leftrightarrow x=y$이다.
- 대칭성 : 모든 $x,y \in V$에 대해 $d(x,y)=d(y,x)$
- 삼각 부등식 : $x,y,z \in V$에 대해 $d(x,z) \leqslant d(x,y)+d(y,z)$

## 코시-슈바르츠 부등식(Cauchy-Schwarz Inequality)
내적 벡터 공간 ($V, \langle\cdot,\cdot \rangle$)이 노름 $\lVert \cdot \rVert$를 유도한다면 다음 코시 슈바르츠 부등식을 만족한다.

$$
\vert \langle x,y \rangle \vert \leqslant \lVert x\rVert\lVert y\rVert
$$

## Remark
벡터의 길이와 마찬가지로 벡터간의 거리도 내적 없이 노름만으로 정의할 수 있다. 하지만 그 노름이 내적에 의해 유도되었다고 가정하면 거리는 어떤 내적을 사용하는지에 의존적이다.

# 각과 직교 (Angles & Orthogonality)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/MML/3.2.png" title="3.2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 3.2
</div>

두 벡터간의 각 $\omega$를 정의함으로써 내적은 벡터공간의 기하학적 개념에도 접근할 수 있다. 상술한 코시 슈바르츠 부등식을 활용하면 다음과 같은 부등식을 도출 할 수 있다.

$$
-1 \le \frac{\langle x,y\rangle}{\lVert x\rVert \lVert y\rVert} \le 1
$$

따라서 유일한 $x,y$ 사이의 각$\omega \in [0,\pi]$가 존재한다.

$$
\cos{\omega} = \frac{\langle x,y\rangle}{\lVert x\rVert \lVert y\rVert}=\frac{\langle x,y\rangle}{\langle x,x\rangle\langle y,y\rangle}
=\frac{x^\top y}{\sqrt{x^\top x y^\top y}}
$$

## 정의(직교성, Orthogonality)
두 벡터 $x,y$가 필요충분조건 $\langle x,y \rangle = 0$을 만족하면 **직교(_orthogonal_)**한다고 표현하며, $x \perp y$로 작성한다. 추가로 $\lVert x\rVert = \lVert y \rVert = 1$(단위벡터)이면 **정규 직교(_orthonormal_)** 하다. 위 정의를 적용하면 0벡터는 벡터 공간 상의 모든 벡터에 직교한다.

벡터의 거리와 마찬가지로 스칼라 곱이 아닌 내적을 사용하면 $\omega$는 달라질 수 있다. 여기서 알 수 있는 점은, 어떤 내적에 대해서 두 벡터가 직교하다면, 다른 종류의 내적에 대해서는 직교하지 않는다는 점이다.

## 정의(직교행렬, Orthogonal Matrix)
정방행렬 $A \in \mathbb{R}^{n\times n}$이 필요충분조건 '각 열 벡터들이 모두 단위벡터이고 서로 직교한다'를 만족하면 **직교 행렬(_Orthogonal matrix_)**라고 부르며 다음과 같이 표현할 수 있다.

$$
\begin{gather}
AA^\top = I = A^\top A \\
A^{-1} = A^\top
\end{gather}
$$

이 때 직교행렬의 역행렬은 전치하여 얻을 수 있다.

### 직교 행렬의 특성
직교 행렬을 이용한 벡터의 변환은 **벡터의 길이를 보존**한다. 수식으로는 다음과 같이 표현할 수 있다.

$$
\|Ax\|^2 = (Ax)^\top (Ax) = x^\top A^\top A x = x^\top I x = \|x\|^2
$$

또한 직교행렬은 **두 벡터 사이의 각도도 보존**한다.

$$
\cos \omega = \frac{(Ax)^\top (Ay)}{\|Ax\| \cdot \|Ay\|} = \frac{x^\top y}{\|x\| \cdot \|y\|}
$$

# 정규직교 기저(Orthonormal Basis)
## 정의
n차원 벡터 공간 $V$의 기저 $\{b_1, \ldots,b_n\}$이 다음 조건을 만족하면 이 기저는 **정규 직교 기저(_Orthonormal Basis, ONB_)**라고 부른다.

1. $\langle b_i, b_j\rangle = 0 \quad \mathbf{for} \ \ i\ne j$
2. $\langle b_i, b_i \rangle = 1$

조건 1만 만족하고 2는 만족하지 않는다면 단순 직교 기저(_orthogonal basis_)이다.

## Gram-Schmidt Process
주어진 벡터 집합 $\{\tilde{b_1}, \ldots ,\tilde{b_n}\}$이 직교도 아니고 정규화도 되어있지 않은 경우 이를 정규직교 기저로 바꾸는 과정을 **_Gram-Schmidt Process_**라고 한다.

1. 벡터 집합을 행렬($\tilde{B}=[\tilde{b_1}, \ldots, \tilde{b_n}]$)로 만든다.
2. 행렬을 증강 행렬 $[\tilde{B}\tilde{B}^\top \lvert \tilde{B}]$로 만들어 가우스 소거법을 적용한다.

## 정규직교 기저의 예

$$
b_1 = \frac{1}{\sqrt{2}}\begin{bmatrix}1\\1\end{bmatrix}, \qquad b_2 = \frac{1}{\sqrt{2}}\begin{bmatrix}1\\-1\end{bmatrix}
$$

- $b_1^\top b_2 = 0 \ \rightarrow$ 직교
- $\lVert b_1\rVert=\lVert b_2\rVert = 1 \rightarrow$ 정규

# 직교 여공간 (Orthogonal Complement)
D차원 벡터 공간 $V$와 M차원 벡터 부분 공간 $U \subseteq V$가 있을때, 직교 여공간 $U^\bot$은 $V$의 (D-M)차원 부분공간이며, $V$의 벡터 중 $U$의 벡터에 직교하는 모든 벡터를 포함한다. 더 나아가 $U \cap U^\bot = \{0\}$ 이므로 공간 $V$에 포함된 모든 벡터는 다음과 같이 유일하게 분해할 수 있다.

$$x \;=\; \underbrace{\sum_{m=1}^{M}\lambda_m\,b_m}_{\text{U 성분}}

      + \underbrace{\sum_{j=1}^{D-M}\psi_j\,b^{\perp}_j}_{U^{\perp}\text{ 성분}},

      \qquad \lambda_m,\psi_j\in\mathbb{R}.$$

이 때 $(b_1, \ldots b_M)$은 $U$의 기저이며, $(b_1^\bot, \ldots b_{D-M}^\bot)$은 $U^\bot$의 기저이다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/MML/3.3.png" title="3.3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 3.3
</div>

직교 여공간은 (이차원 부분 공간에 속하는) 평면 $U$를 삼차원 벡터 공간에서 표현할 수 있도록 한다. 부연 설명하자면, 평면 $U$에 직교하는 벡터 $w(\lVert w \rVert=1)$는 $U^\bot$의 유일 기저벡터이며 부호($\pm$)만 다르다. $w$에 직교하는 모든 벡터는 평면 $U$에 평행하며, 벡터 $w$는 $U$의 **법선벡터 (_normal vector_)**라고 부른다.

# 직교 투영 (Orthogonal Projections)
## 정의(투영, Projections)
벡터 공간 $V$와 그 부분공간 $U\in V$가 있다고 하자. 선형 사상 $\pi : V \rightarrow U$가 다음 조건을 만족시키면 **투영(_projections_)**이라고 한다.

$$
\pi^2=\pi \circ \pi = \pi
$$

위 정의는 **투영 행렬(_projection matrices_)**$P_\pi$에 적용된다.