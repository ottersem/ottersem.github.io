---
layout: post
title: Linear Algebra
date: 2025-03-18 01:37:00
description: Linear Algebra from MML
tags: Linear_Algebra, Vector, Matrix
categories: Math
pretty_table: true
---

# 행렬
## 단위행렬(Identity Matrix)
$\mathbb{R}^{n \times n}$행렬에서  대각선 방향으로는 1, 다른 모든 요소는 0인 값으로 채워진 행렬을 **단위행렬(Identity Matrix)**라고 부른다.

$$I_n = 
\begin{bmatrix}
1 & 0 & \cdots & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 & \cdots & 0 \\
\vdots & \vdots  & \ddots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 0 & \cdots & 1
\end{bmatrix}
\in \mathbb{R}^{n \times n}$$

## 행렬의 성질
- Associativity

$$\forall A \in \mathbb{R}^{m \times n}, B \in \mathbb{R}^{n \times p}, C \in \mathbb{R}^{p \times q} : (AB)C = A(BC)$$
- Distributivity

$$\forall A, B \in \mathbb{R}^{m\times n},\ C,D \in \mathbb{R}^{n\times p} : (A+B)C = AC + BC, A(C+D) = AC + AD$$
- Multiplication with the identity matrix

$$\forall A \in \mathbb{R}^{m \times n} : I_mA = AI_n = A$$
이때 $m \ne n$이면 $I_m \ne I_n$이다.

## 역행렬(Inverse Matrix)
두 정방 행렬 $A \in \mathbb{R}^{n \times n}, B \in \mathbb{R}^{n \times n}$에 대해 $AB = I_n = BA$를 만족하는 $B$를 $A$의 역행렬이라고 부르며 $A^{-1}$로 표기한다. 모든 행렬이 역행렬을 가지지 않으며 A가 역행렬을 가지면 A는 _regular/invertible/nonsingular_ 로 부르며, 역행렬을 가지지 않으면 _singular/noninvertible_ 로 부른다. 또한 행렬이 역행렬을 가지면 그 행렬은 _고유한(unique)_ 행렬이다. 

### 역행렬 계산하기

$$A := \begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
\in \mathbb{R}^{2\times 2}$$

$$A' := \begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11}
\end{bmatrix}
\in \mathbb{R}^{2\times 2}$$

위 두 행렬을 곱하면 다음과 같은 결과를 얻는다.

$$AA' := \begin{bmatrix}
a_{11}a_{22}-a_{12}a_{21} & 0 \\
0 & a_{11}a_{22} - a_{12}a_{21}
\end{bmatrix}
=(a_{11}a_{22}-a_{12}a_{21})I$$

따라서

$$A^{-1} = \frac{1}{a_{11}a_{22}-a_{12}a_{21}}
\begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11}
\end{bmatrix}$$

${a_{11}a_{22}-a_{12}a_{21}} \ne 0$이 필요충분조건(if and only if)을 만족하면 위 수식이 성립한다.

## 전치행렬(Transpose)
$A \in \mathbb{R}^{m \times n}, B \in \mathbb{R}^{n \times m}$이며 $b_{ij} = a_{ji}$ 일때 $B$는 $A$의 전치행렬이며, $B = A^\top$로 표기한다.

### 전치행렬과 역행렬의 성질
$$\begin{gather} AA^{-1} = I = A^{-1}A \\
(AB)^{-1} = B^{-1}A^{-1} \\
(A+B)^{-1} \ne A^{-1}+B^{-1} \\
(A^\top)^\top = A \\
(AB)^\top = B^\top A^\top \\
(A+B)^\top = A^\top + B^\top \end{gather}$$

## 행렬의 스칼라곱
- Associativity

$$(\lambda \psi)C = \lambda(\psi C), \quad C \in \mathbb{R}^{m \times n}$$

- Distributivity

$$\begin{gather} (\lambda + \psi)C = \lambda C + \psi C, \quad C \in \mathbb{R}^{m \times n} \\
\lambda(B+C) = \lambda B + \lambda C, \quad B,C \in \mathbb{R}^{m \times n} \end{gather}$$
- $$\lambda(BC) = (\lambda B)C = B(\lambda C) = (BC)\lambda \quad B\in \mathbb{R}^{m \times n} , C \in \mathbb{R}^{n \times k}$$

- $(\lambda C)^\top = C^\top \lambda^\top = C^\top \lambda = \lambda C^\top$ 왜냐하면 모든 $\lambda \in \mathbb{R}$에 대해 $\lambda = \lambda ^\top$이기 때문.

## 일차방정식의 표현
$$\begin{gather} 2x_1+3x_2+5x_3 = 1\\
4x_1-2x_2-7x_3 = 8\\
9x_1 + 5x2 - 3x_3 = 2 \end{gather}$$

위 식은 행렬을 이용해서 다음과 같이 간단히 표현할 수 있다. 

$$\begin{bmatrix}
2&3&5 \\
4&-2&-7 \\
9&5&-3
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}
=
\begin{bmatrix}
1\\
8\\
2
\end{bmatrix}$$

또한 위 표현은 $Ax = b$ 꼴로 표현되기도 한다.

## 일차방정식의 해 구하기
## 일반해와 특수해

$$\begin{bmatrix}
1&0&8&-4 \\
0&1&2&12
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3 \\
x_4
\end{bmatrix}
=
\begin{bmatrix}
42\\
8
\end{bmatrix}$$

위 수식은 $\sum^4_{i=1} x_ic_i = b$ 꼴로 나타낼 수 있다. 이때 $c_i$는 행렬의 $i$번째 열이고 b는 수식의 우측에 위치한 행렬이다.

$$b=\begin{bmatrix}
42 \\ 8
\end{bmatrix}
=
42
\begin{bmatrix}
1 \\ 0
\end{bmatrix}
+
8
\begin{bmatrix}
0 \\1
\end{bmatrix}$$

이므로 해는 $[42, 8, 0, 0]^\top$임을 알 수 있고, 이를 _특수해(particular solution, special solution)_라고 부른다. 다른 모든 해를 구하기 위해 0을 일반적이지 않은 방법으로 사용할 수 있는데, 특수해에 0을 붙이는 건 해(solution)에 아무런 영향을 미치지 않으므로, 행렬의 세 번째 행을 첫 번째, 두 번째 행을 활용해 정리할 수 있다.

$$\begin{bmatrix}
8 \\ 2
\end{bmatrix}
=
8
\begin{bmatrix}
1 \\ 0
\end{bmatrix}
+
2
\begin{bmatrix}
0 \\ 1
\end{bmatrix}$$

따라서, $0 = 8c_1+2c_2-1c_3+0c_4$ 이고 $(x_1, x_2, x_3, x_4) = (8,2,-1,0)$이다. 또한 이 해에 스칼라 곱을 취하면 0 벡터가 나오므로

$$\begin{bmatrix}
1&0&8&-4 \\
0&1&2&12
\end{bmatrix}
(\lambda_1 \begin{bmatrix} 8 \\ 2 \\ -1 \\ 0 \end{bmatrix} ) = \lambda_1(8c_1+2c_2-c_3) = 0$$

임을 알 수 있다.

동일하게 네번째 행을 계산하면

$$\begin{bmatrix}
1&0&8&-4 \\
0&1&2&12
\end{bmatrix}
(\lambda_2 \begin{bmatrix} -4 \\ 12 \\ 0 \\ -1 \end{bmatrix} ) = \lambda_2(-4c_1+12c_2-c_4) = 0$$

이고 , 위에서 도출한 수식을 전부 합치면 다음 수식을 도출 할 수 있다.

$$\Bigl\{ x \in \mathbb{R}^4:x= \begin{bmatrix} 42 \\ 8 \\ 0 \\ 0\end{bmatrix} + \lambda_1\begin{bmatrix} 8 \\ 2 \\ -1 \\ 0 \end{bmatrix}+\lambda_2 \begin{bmatrix} -4 \\ 12  \\ 0 \\ 1\end{bmatrix}, \lambda_1,\lambda_2 \ \in \mathbb{R}) \Bigr\}$$

일반해를 찾는 과정을 정리하면 다음과 같다.
1. $Ax=b$의 특수해를 찾는다.
2. $Ax=0$꼴로 모든 해를 찾는다
3.  1, 2의 모든 해를 합쳐 일반해를 만든다.

## 사다리꼴 행렬(Row-Echelon Form)
다음 조건을 만족하는 행렬은 사다리꼴 행렬이다.
- 0 만을 포함하는 행을 행렬의 최 하단에 위치한다.
- 0 만을 포함하지 않는다면, 행의 가장 처음 나오는 수(_pivot, leading coefficient_)는 언제나 상위 행의 우측에 위치한다.
이때 사다리꼴 행렬에서 피벗에 상응하는 변수를 기저 변수(_basic variables_), 나머지를 자유 변수(_free variables_)라고 부른다.

## 기약 행사다리꼴 행렬(Reduced Row-Echelon Form)
사다리꼴 행렬이 다음 조건을 만족하면 기약 행사다리꼴 행렬이다.
- 사다리꼴 행렬의 형태를 가진다.
- 모든 피벗이 1이다.
- 피벗은 해당 열의 유일한 0이 아닌 값이다.
기약 행사다리꼴 행렬은 일차방정식의 일반해를 결정하기 방법을 제공한다.

## Minus-1 트릭

$$A =
\begin{bmatrix}
0 & \cdots & 0 & \mathbf{1} & * & \cdots & * & 0 & * & \cdots & * \\
\vdots & & 0 & 0 & \cdots & 0 & \mathbf{1} & * & \cdots & * & \vdots \\
& \ddots & & & & & & & & \ddots & \\
\vdots & & & \ddots & & & & & \vdots & & \vdots \\
0 & \cdots & 0 & 0 & 0 & \cdots & 0 & \mathbf{1} & * & \cdots & * \\
\end{bmatrix}$$

$A$는 기약 행사다리꼴 행렬의 형태를 띄며 \*은 무작위의 실수이다. 이때 $\begin{bmatrix}0 & \cdots & 0& -1& 0 &\cdots& 0 \end{bmatrix}$형태의 행을 $n-k$ 행에 추가하여 $n \times n$ 크기의 행렬$\tilde{A}$를 만들 수 있다.

이 확대행렬(Augmented Matrix) $\tilde{A}$의 대각성분은 1과 -1만을 포함하고 있으며, 따라서 피벗으로 -1일 가지는 열이 동류방정식 $Ax=0$의 해가 된다. 더 정확하게 설명하면 이 열들이 $Ax=0$의 해공간(커널/널공간)의 기저가 된다.

## 가우시안 소거법(Gaussian Elimination)을 사용한 역행렬의 계산

$$A = \begin{bmatrix}
1 & 0 & 2 & 0 \\ 1 & 1 & 0 & 0 \\ 1 & 2 & 0 & 1 \\ 1 & 1 & 1 & 1
\end{bmatrix}$$

위 행렬 A를 가우시안 소거법을 사용해 역행렬을 계산해보자.

첫째로 확대행렬을 작성하면 다음과 같다.

$$\begin{bmatrix}
1 & 0 & 2 & 0 &\bigm| 1 & 0 & 0 & 0 \\ 1 & 1 & 0 & 0 &\bigm| 0 & 1 & 0 & 0\\ 1 & 2 & 0 & 1 &\bigm| 0 & 0 & 1 & 0 \\ 1 & 1 & 1 & 1 &\bigm| 0 & 0 & 0 & 1
\end{bmatrix}$$

가우시안 소거법을 사용하여 기약행사다리꼴 행렬의 형태로 만들면 다음과 같다.

$$\begin{bmatrix}
1 & 0 & 0 & 0 &\bigm| -1 & 2 & -2 & 2 \\ 0 & 1 & 0 & 0 &\bigm| 1 & -1 & 2 & 2\\ 0 & 0 & 1 & 0 &\bigm| 1 & -1 & 1 & -1 \\ 0 & 0 & 0 & 1 &\bigm| -1 & 0 & -1 & 2
\end{bmatrix}$$

우리가 찾는 역행렬은 확대행렬의 우측 성분들과 같으므로

$$A^{-1} = \begin{bmatrix}
-1 & 2 & -2 & 2 \\
0 & 1 & 0 & 0\\
1 & -1 & 1 & -1 \\
-1 & 0 & -1 & 2
\end{bmatrix}$$

이며 이는 $AA^{-1} = I_4$임을 통해 알 수 있다.

# 벡터 공간(Vector Spaces)
## 군(Group)
군은 집합 연산을 위한 근본적인 역할을 할 뿐더러 컴퓨터 과학의 여러 분야에서 핵심적인 역할을 한다.
집합$\mathcal{G}$와 연산 $\otimes : \mathcal{G} \times \mathcal{G} \rightarrow \mathcal{G}$로 $\mathcal{G}$를 정의하자. 이때 $G := (\mathcal{G}, \otimes)$가 다음 네가지를 충족하면 **군(Group)**이라고 부른다.
1. $\otimes$연산시 $\mathcal{G}$의 닫힘 : $\forall x,y \in \mathcal{G} : x \otimes y \in \mathcal{G}$
2. Associativity : $\forall x,y,z \in \mathcal{G} : (x \otimes y) \otimes z = x \otimes (y \otimes z)$
3. Neutral element : $\exists e \in \mathcal{G}, \forall x \in \mathcal{G} : x \otimes e = x \ and \ e \otimes x = x$
4. Inverse element : $\forall x \in \mathcal{G}, \exists y \in \mathcal{G} : x \otimes y = e \ and \ y\otimes x = e$이때, $e$는 Neutral element 이며 $x$의 역$(y)$을 $x^{-1}$로 표기한다.

### 아벨리안 군
위 네가지에 더불어 다음 조건을 만족시키면 그 군$G = (\mathcal{G}, \otimes)$은 **아벨리안 군(Abelian Group)**이라고 부른다.

$$\forall x,y \in \mathcal{G} : x \otimes y = y \otimes x$$

### 일반선형군(General Linear Group)
역행렬 계산이 가능한 일반 행렬 $A \in \mathbb{R}^{n\times n}$은 일반선형군 $GL(n,\mathbb{R})$이며 아벨리안 군이 아님이 자명하다.

## 벡터 공간(Vector Spaces)
Real-valued 벡터공간 $V = (\mathcal{V},+, \cdot )$은 다음 두 연산을 수행하는 집합$\mathcal{V}$이다.
$$+ : \mathcal{V} \times \mathcal{V} \rightarrow \mathcal{V} \\
\cdot : \mathbb{R} \times \mathcal{V} \rightarrow \mathcal{V}$$
이때, 다음 성질을 만족한다.
1. $(\mathcal{V}, +)$는 아벨리안 군이다.
2. Distributivity : 
	1. $$\forall \lambda \in \mathbb{R},\ x,y \in \mathcal{V} : \lambda \cdot (x+y) = \lambda \cdot x + \lambda \cdot y$$
	2. $$\forall \lambda, \psi \in \mathbb{R}, \ x \in \mathcal{V} : (\lambda + \psi) \cdot x = \lambda \cdot x + \psi \cdot x$$
3. Associativity(Outer operation) : $\forall \lambda, \psi \in \mathbb{R}, \ x\in \mathcal{V} : \lambda \cdot (\psi \cdot x) = (\lambda \psi)\cdot x$
4. $$\forall x \in \mathcal{V} : 1\cdot x = x$$
이때 $x \in \mathcal{V}$는 **벡터**다. $(\mathcal{V}, +)$의 중립원소(neutral element)는 영벡터 $0=[0, \cdots,0]^\top$이며, Inner operation $+$는 벡터 덧셈(vector addition)이다. $\lambda \in \mathbb{R}$는 스칼라이며, Outer operation $\cdot$은 스칼라에 의한 곱연산이다.

## 벡터 부분공간(Vector Subspaces)
벡터공간 $V = (\mathcal{V}, +, \cdot)$, $\mathcal{U} \subseteq \mathcal{V}, \ \mathcal{U} \ne \not0$라 하자. 이때 $U$가 벡터 공간 연산 $+, \cdot$이 $\mathcal{U} \times \mathcal{U}, \mathbb{R} \times \mathcal{U}$를 만족하면, $U = (\mathcal{U}, + , \cdot)$을 $V$의 벡터 부분공간(선형 부분공간)라고 부른다.

벡터 부분공간$U$는 벡터 공간$V$과 대부분의 성질을 공유하는데, 모든 $x \in \mathcal{V}$를 포함하며, $x \in \mathcal{U} \subseteq \mathcal{V}$이기 때문이다. $U$가 $V$의 부분공간임을 보이기 위해선 다음 조건을 만족해야한다.
1. $$\mathcal{U} \ne \not0,\ in\ particular: 0 \in \mathcal{U}$$
2. Closure of $U$:
	1. $$\forall \lambda \in \mathbb{R}, \forall x \in \mathcal{U} : \lambda x \in \mathcal{U}$$
	2. $$\forall x,y \in \mathcal{U} : x+y \in \mathcal{U}$$

# 선형독립(Lineaer Independence)
벡터 공간 $V$와 유한한 갯수의 벡터 $x_1, \cdots, x_k \in V$에 대해 모든 $v \in V$와 $\lambda_1 \cdots \lambda_k \in \mathbb{R}$은 벡터 $x_1, \cdots, x_k$의 선형 결합 _(linear combination)_ 이다.

$$v=\lambda_1x_1 + \cdots + \lambda_k\lambda_k = \sum_{i=1}^k \lambda_ix_i \in V$$

0벡터는 언제나 $k$개의 벡터의 선형 결합으로 표현될 수 있는데 $0 = \sum_{i=1}^k 0x_i$가 언제나 참이기 때문이다.
## 선형 독립(Linear (In)dependence)
벡터공간 $V$가 $k \in \mathbb{N}$과 $x_1, \cdots, x_k \in V$을 만족하고, 최소 하나 이상의 $\lambda_i \ne 0$인 $0 = \sum_{i=1}^k \lambda_ix_i$과 같이 결합이 오직 trivial(모든 계수가 0)일때 벡터  $x_1, \cdots, x_k$는 **선형 독립**이다.

### 선형 독립 찾기
- 벡터들은 무조건 선형 독립이거나 종속적이다.
- 하나 이상의 벡터가 0이면 선형독립이며, 두 벡터가 같다면 선형독립이다.
- 벡터 $\{x_1, \cdots, x_k : x_i \ne 0, i =1, \cdots, k \}, k \geqslant 2$ 중 하나의 벡터가 다른 벡터들의 선형 결합이면 선형 종속이다.
- 가우시안 소거법을 사용했을때 모든 열이 피벗 열이면 선형 독립이다.

$k$개의 선형 독립 벡터 $b_1, \cdots, b_k$와 $m$개의 선형 결합으로 이루어진 벡터공간 $V$는 다음과 같다.

$$\begin{gather} x_1 = \sum^k_{i=1} \lambda_{i1}b_{i}, \\
\vdots \\
x_m = \sum^k_{i=1} \lambda_{im}b_{i} \end{gather}$$
열이 선형 독립인 벡터들$b_1, \cdots, b_k$로 이루어진 $B=[b_1, \cdots, b_k]$를 정의하면
$$\begin{gather}x_j = B\lambda_j, \quad \lambda_j =
\begin{bmatrix}
\lambda_{1j} \\
\vdots \\
\lambda_{kj}
\end{bmatrix}, \quad
j = 1, \cdots, m \end{gather} $$

이다.
벡터 $x_1, \cdots, x_m$이 선형 독립임을 알기 위해서 $\sum^m_{j=1}\psi_jx_j = 0$을 적용하면

$$\sum^m_{j=1}\psi_jx_j = \sum^m_{j=1}\psi_jB\lambda_j = b\sum^m_{j=1}\psi_j\lambda_j$$

이다.
위 수식을 통해서 열벡터 $\{ \lambda_1, \cdots, \lambda_m \}$가 선형독립일때 $\{x_1, \cdots, x_m \}$도 선형독립임을 알 수 있다.

# 기저(Basis)와 랭크(Rank)
## 생성집합(Generating Set)과 Span
$V = (\mathcal{V}, +, \cdot)$와 $\mathcal{A} = \{x_1, \cdots, x_k \}$가 있다고 하자. 모든 벡터 $v \in \mathcal{V}$는 $x_1, \cdots, x_k$의 선형결합으로 표현할 수 있으며, 이 때 $\mathcal{A}$는 $V$의 생성 집합(Generating Set)이다.

생성집합은 벡터 부분공간을 span하여 만들어진 벡터의 집합이다. 예를 들자면 모든 벡터는 생성 집합에 존재하는 벡터들의 선형결합으로 표현될 수 있다.

## 기저(Basis)
$V = (\mathcal{V}, +, \cdot)$와 $\mathcal{A} \subseteq \mathcal{V}$라고 하자. $\mathcal{V}$의 생성집합 $\mathcal{A}$는 더 이상의 작은 집합 ($\mathcal{V}$의 span)$\tilde{\mathcal{A}} \not\subseteq \mathcal{A} \subseteq \mathcal{V}$이 존재하지 않을때 **최소(minimal)**라고 부른다. $\mathcal{V}$의 모든 선형 독립인 생성 집합은 최소이며 $\mathcal{V}$의 **기저(Basis)**라고 부른다.

### 성질
$V = (\mathcal{V}, +, \cdot)$가 $\mathcal{B} \subseteq \mathcal{V}, \mathcal{B} \ne \not0$면, 다음 성질이 성립한다.
1. $\mathcal{B}$는 $\mathcal{V}$의 기저이다.
2. $\mathcal{B}$는 최소 생성집합이다.
3. $\mathcal{B}$는 $\mathcal{V}$에 속해있는 벡터들의 최대 선형 독립 집합이다. 다른 벡터를 이 집합에 추가하면 언제나 선형 종속이다.
4. 모든 벡터 $x \in V$는 $\mathcal{B}$의 벡터의 선형 결합이고, 모든 선형 결합은 유일하며 그 이유는 다음 수식을 따른다.

$$x = \sum_{i=1}^k \lambda_i b_i = \sum_{i=1}^k \psi_ib_i$$

$$\lambda_i, \psi_i \in \mathbb{R}, \quad b_i \in \mathcal{B}, \qquad\lambda_i = \psi_i, i = 1, \cdots, k$$

### 예시
$\mathbb{R}^3$공간의 일반기저는 다음과 같다.

$$\mathcal{B} = \{ \begin{bmatrix} 1 \\ 0 \\ 0\end {bmatrix}\, \begin{bmatrix} 0 \\ 1 \\ 0\end {bmatrix}\, \begin{bmatrix} 0 \\ 0 \\ 1 \end {bmatrix}\}$$

이때 $\mathbb{R}^3$의 다른 기저들도 들 수 있다.

$$\mathcal{B_1} = \{ \begin{bmatrix} 1 \\ 0 \\ 0\end {bmatrix}\, \begin{bmatrix} 1 \\ 1 \\ 0\end {bmatrix}\, \begin{bmatrix} 1 \\ 1 \\ 1 \end {bmatrix}\},\quad \mathcal{B_2} = \{ \begin{bmatrix} 0.5 \\ 0.8 \\ 0.4\end {bmatrix}\, \begin{bmatrix} 1.8 \\ 0.3 \\ 0.3\end {bmatrix}\, \begin{bmatrix} -2.2 \\ -1.3 \\ 3.5 \end {bmatrix}\}$$

집합

$$\mathcal{A} = \{ \begin{bmatrix} 1 \\ 2\\ 3 \\ 4\end {bmatrix}\, \begin{bmatrix} 2 \\ -1 \\ 0 \\2 \end {bmatrix}\, \begin{bmatrix} 1 \\ 1 \\ 0 \\ -4 \end {bmatrix}\}$$

은 선형 독립이지만 $\mathbb{R}^4$의 생성집합과 기저는 아니다. 예를 들어, $[1, 0,0,0]^\top$은 $\mathcal{A}$의 요소의 선형 조합으로 생성할 수 있다.

## 부분공간의 기저 찾기
부분공간의 기저 $U=span[x_1, \cdots, x_m] \subseteq \mathbb{R}^n$은 다음 절차를 통해 찾을 수 있다.
1. 행렬$A$의 spanning 열 벡터를 작성한다.
2. $A$의 기약행렬을 찾는다.
3. $U$의 기저는 피벗 열에 해당하는 스패닝 벡터들이다.

### 예시
벡터 부분공간 $U \subseteq \mathbb{R}^5$은 다음 벡터들에 의해 스팬된다.

$$x_1 = \begin{bmatrix} 1 \\ 2 \\ -1 \\ -1 \\ -1 \end{bmatrix}, \quad
x_2 = \begin{bmatrix} 2 \\ -1 \\ 1 \\ 2 \\ -2 \end{bmatrix}, \quad
x_3 = \begin{bmatrix} 3 \\ -4 \\ 3 \\ 5 \\ -3 \end{bmatrix}, \quad
x_4 = \begin{bmatrix} -1 \\ 8 \\ -5 \\ -6 \\ 1 \end{bmatrix}
\in \mathbb{R}^5,$$

$x_1, \cdots, x_4$가 $U$의 기저인지 알기 위해서는 각 벡터들이 선형독립인지 알아야 하며 다음 수식을 풀어야 한다.

$$\sum_{i=1}^4 \lambda_i x_i = 0$$

이는 다음 동차 방정식을 도출한다.

$$[x_1, x_2, x_3, x_4] =
\begin{bmatrix}
1 & 2 & 3 & -1 \\
2 & -1 & -4 & 8 \\
-1 & 1 & 3 & -5 \\
-1 & 2 & 5 & -6 \\
-1 & -2 & -3 & 1
\end{bmatrix}$$

위 수식을 행사다리꼴 형태로 변환하면 다음과 같다.

$$\begin{bmatrix}
1 & 2 & 3 & -1 \\
2 & -1 & -4 & 8 \\
-1 & 1 & 3 & -5 \\
-1 & 2 & 5 & -6 \\
-1 & -2 & -3 & 1
\end{bmatrix}
\rightsquigarrow \cdots \rightsquigarrow
\begin{bmatrix}
1 & 2 & 3 & -1 \\
0 & 1 & 2 & -2 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}$$

피벗열들이 벡터 집합이 선형독립임을 나타내고 있으므로 $x_1, x_2, x_4$는 선형 독립이다. 그러므로 $\{x_1, x_2, x_4 \}$은 $U$의 기저이다.

## 랭크(Rank)
행렬 $A \in \mathbb{R}^{m\times n}$의 선형 독립인 열의 수가 선형 독립인 해의 수와 같다면 그 수를 $A의$ **랭크(rank)**라고 부르고 $\mathrm{rk}(A)$로 표기한다.
행렬의 랭크는 다음의 중요한 성질을 가진다.
- 열랭크 = 행랭크, $\mathrm{rk}(\mathbf{A}) = \mathrm{rk}(\mathbf{A}^\top)$
- 열공간(이미지)의 차원 = 랭크. $A \in \mathbb{R}^{m\times n}$의 열들은 $\mathbb{R}^m$의 부분공간 $U$를 생성하며, $\mathrm{dim}(U) = \mathrm{rk}(A)$이다. 이때 $U$를 상(image) 또는 range라고 부른다.
- 행공간의 차원도 랭크이다. $A \in \mathbb{R}^{m\times n}$의 행들은 $\mathbb{R}^m$의 부분공간 $W$를 생성하며, $\mathrm{dim}(W) = \mathrm{rk}(A)$이다. 이는 $A^\top$에 대해 가우스 소거법을 적용하여 얻을 수 있다.
- 정칙행렬조건 : $\mathbb{R}^{n\times n}$에 대해 $\mathbf{A} \iff \mathrm{rk}(\mathbf{A}) = n$. 즉, 랭크가 최대일 때문 가역 행렬이다.
- 선형 시스템 해의 존재 조건은 $$\mathbf{A}x = b, \quad \mathrm{rk}(\mathbf{A}) = \mathrm{rk}([\mathbf{A} \mid b]) $$를 만족해야한다.
- 해 공간의 차원 : 해 공간$\{ x \in \mathbb{R}^n \mid \mathbf{A}x = 0 \}$의 차원은 $n - \mathrm{rk}(\mathbf{A})$이며, 이 해 공간을 커널 또는 널공간이라고 한다.
- 전랭크( Full Rank) $\mathrm{rk}(\mathbf{A}) = \min(m, n)$이면 Full Rank, 그렇지 않으면 rank deficient 라고 한다.

예를 들어보자

$$A=\begin{bmatrix}
1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0
\end{bmatrix}$$

위 행렬 A는 선형 독립인 행과 열을 각각 두 개씩 가지고 있으므로 $\mathrm{rk}(A)=2$이다.

$$B=\begin{bmatrix}
1 & 2 & 1 \\ -2 & -3 & 1 \\ 3 & 5 & 0
\end{bmatrix}$$

위 행렬 B를 가우스 소거법을 사용해 랭크를 판별할 수 있다.

$$\begin{bmatrix}
1 & 2 & 1 \\ -2 & -3 & 1 \\ 3 & 5 & 0
\end{bmatrix}
\rightsquigarrow \cdots \rightsquigarrow
\begin{bmatrix}
1 & 2 & 1 \\ 0 & 1 & 3 \\ 0 & 0 & 0
\end{bmatrix}$$

이므로 선형 독립인 행과 열을 각각 두 개씩 가지고 있으므로 $\mathrm{rk}(A)=2$이다.

# 선형사상(Linear Mappings)
**사상(mapping)**은 벡터 공간에서 그 구조를 유지하면서 좌표의 개념을 정의할 수 있도록 도와준다. 두 개의 벡터 공간 $V, W$가 존재할 때 다음 조건을 충족하면, 사상 $\Phi : V \rightarrow W$은 벡터 공간의 구조를 보존한다.
- $$\Phi(x+y)=\Phi(x)+\Phi(y)$$
- $$\Phi(\lambda x) = \lambda\Phi(x)$$
이 때 모든 $x, y \in V$이며 $\lambda \in \mathbb{R}$이다.

요약하자면 다음과 같다.
$$\forall x,y \in V \quad \forall \lambda, \psi \in \mathbb{R} : (\lambda x + \psi y) = \lambda \Phi(x) + \psi \Phi(y)$$

## 단사(Injective), 전사(Surjective), 전단사(Bijective) 함수
임의의 집합 $V, W$에 대해 사상 $\Phi : V \rightarrow W$이 조건에 따라 다음을 만족한다.
- **단사 함수(Injective)** : $\forall x,y \in V : \Phi(x) = \phi(y) \Rightarrow x = y$
- **전사 함수(Surjective)** : $\Phi(V) = W$
- **전단사 함수(Bijective)** : 단사와 전사의 조건을 모두 충족

모든 사상 $\Phi$가 전사 함수라면 $W$의 모든 원소들은 $\Phi$를 통해 $V$에 도달할 수 있다. 또한 전단사 함수 $\Phi$는 __되돌릴 수 있다.__ 예를 들어 $\Psi:W\rightarrow V$사상이 $\Psi \circ \Phi(x) = x$를 만족시키면, 사상 $\Psi$는 $\Phi$의 역이며 일반적으로 $\Phi^{-1}$로 표기한다.

위 정의를 바탕으로 선형 사상의 특수한 경우 몇 가지를 도출할 수 있다.
- 동형 사상(Isomorphism) : $\Phi : V \rightarrow W$는 선형이며 전단사 함수이다. 구조적으로 같다는 의미이다.
- 자기 사상(Endomorphism) : $\Phi : V \rightarrow V$는 선형이다. 자기 자신으로 매핑함을 의미한다.
- 자기 동형 사상(Automorphism) : $\Phi : V \rightarrow V$는 선형이며 전단사 함수이다. 자기 자신으로 매핑하며 되돌릴 수 있음을 의미한다.
- 단위 사상(Identity mapping / Identity automorphism) : $\mathrm{id}_V : V \rightarrow V, x \mapsto x$ 

### 선형성 보존 사상(Homomorphism)
사상 $\Phi:\mathbb{R}^2 \rightarrow \mathbb{C}, \quad \Phi(x)=x_1+ix_2$는 선형성 보존 사상이다. 왜냐하면

$$\begin{align}
\Phi\left( 
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
+
\begin{bmatrix}
y_1 \\
y_2
\end{bmatrix}
\right)
&= (x_1 + y_1) + i(x_2 + y_2) \\
&= x_1 + ix_2 + y_1 + iy_2 \\
&= \Phi\left( 
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
\right)
+ 
\Phi\left( 
\begin{bmatrix}
y_1 \\
y_2
\end{bmatrix}
\right) \notag \\
\\
\Phi\left( 
\lambda 
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
\right)
&= \lambda x_1 + \lambda i x_2 
= \lambda(x_1 + i x_2)
= \lambda \Phi\left(
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
\right).
\end{align}$$

이는 복소수를 $\mathbb{R}^2$ 튜플로 표현할 수 있는 이유를 정당화해준다.
$\mathbb{R}^2$에서의 원소별 덧셈을 복소수 집합에서의 대응하는 덧셈으로 변환하는 선형적이고 일대일 대응인(mapping) 변환이 존재하기 때문이다.
단, 여기서는 **선형성(linearity)**만을 보여주었을 뿐, **일대일 대응(bijection)**임을 증명하지는 않았다.

## Axler Theorem
유한한 차원의 벡터 공간 $V,W$는 $\mathrm{dim}(V) = \mathrm{dim}(W)$일 때 동형사상이다.
직관적으로 말하면 이는 **같은 차원을 가진 벡터 공간들을 일종의 ‘같은 것’**이라고 이해할 수 있으며, **어떠한 정보 손실 없이 서로 변환이 가능**하다는 의미이다.

이 정리는 또한 우리가 $\mathbb{R}^{m\times n}$($m \times n$ 행렬로 구성된 벡터공간)과 $\mathbb{R}^{m n}$(길이가 $mn$인 벡터들의 공간)을 동일하게 취급할 수 있는 근거를 제공한다.

이 두 공간은 차원이 모두 $mn$이고, **하나를 다른 하나로 변환하는 선형적이고 전단사적인 사상**이 존재하기 때문이다.

## 선형 사상에서의 행렬 표현
모든 n 차원 벡터공간은 Axler Theorem에 의해 $\mathbb{R}^2$과 동형이다. 또한 n 차원 벡터공간 $V$의 기저 $\{b_1, \cdots b_n \}$는 다음과 같이 튜플로 작성하고 **$V$의 순서가 있는 기저(ordered basis)**라고 부른다.
$$B = (b_1, \ldots , b_n)$$
### 표기법
- $B = (b_1, \ldots , b_n)$ : **순서가 있는 기저(ordered basis)**
- $B = \{b_1, \ldots , b_n\}$ : **순서가 없는 기저(unordered basis)**
- $B = [b_1, \ldots , b_n]$ : 벡터 $b_1, \ldots , b_n$를 열로 가지는 행렬

## 좌표계(Coordinates)
벡터 공간 $V$와 순서가 정해진 기저 $B = (b_1, \ldots , b_n)$가 존재할 때, $V$의 임의의 벡터 $x \in V$에 대해, 다음과 같은 **선형 결합**을 얻을 수 있다.

$$x = \alpha_1 b_1 + \cdots + \alpha_n b_n$$

이는 $x$를 기저 B에 대해 나타난 것이고, $\alpha_1, \ldots, \alpha_n$는 $x$의 기저 B에 대한 좌표라고 하며, 아래 벡터 

$$\alpha =
\begin{bmatrix}
\alpha_1 \\
\vdots \\
\alpha_n
\end{bmatrix}
\in \mathbb{R}^n$$

는 x의 **순서 있는 기저 B에 대한 좌표 벡터(coordinate vector)** 또는 **좌표 표현(coordinate representation)**이라 부른다.

같은 벡터라도 기저에 따라 좌표 표현이 달라진다. 예를 들어 표준 기저 $(e_1, e_2)$기준 좌표 $x = 2e_1 + 3e_2 \Rightarrow [x] = [2, 3]^T$로 나타낼 수 있는 반면 다른 기저 $b_1 = [1, -1]^T, b_2 = [1, 1]^T$에 대한 좌표는 $\Rightarrow [x]_B = \frac{1}{2}[-1, 5]^T$로 나타낼 수 있다.

이러한 좌표 변환은 $\Phi : \mathbb{R}^n \to V, \Phi(e_i) = b_i$을 따르기 때문이다.

### 변환 행렬(Transformation Matrix)
두 벡터 공간 $V, W$와 각각의 순서 있는 기저 $B = (b_1, \dots, b_n) \subset V$와 $C = (c_1, \dots, c_m) \subset W$가 선형 변환 $\Phi : V \rightarrow W$를 따른다고 하자. 이때 각 기저 벡터 $b_j$에 대해 $\Phi(b_j) = \sum_{i=1}^{m} \alpha_{ij} c_i$ 는 기저 $C$에 대해 표현한 고유한 선형 결합이다.

이 때, 이 $\Phi$를 나타내는 변환 행렬 $A_\Phi$를 다음과 같이 정의한다.

$$A_\Phi(i,j) = \alpha_{ij}$$

즉, $A_\Phi$는 $m\times n$행렬이고 $j$번째 열은 $\Phi(b_j)$의 $C$ 기준 좌표이다.

정리하자면 $A_\Phi$는 $V$의 기저 벡터들을 $W$로 보냈을 때 그 결과들을 행렬의 열벡터로 갖는 구조이다.

$\hat{x}$가 $x \in V$인 $B$의 기준좌표이고, $\hat{y}$가 $y = \Phi(x) \in W$인 $C$의 기준좌표일때 

$$\hat{y} = A_\Phi\hat{x}$$

로 표현할 수 있다.
#### 예시
선형성 보존 사상 $\Phi : V \rightarrow W$와 각각의 $V, W$에 대해 순서가 있는 기저 $B=(b_1, \dots, b_3)$와 $C = (c1,\dots, c4)$가 있다고 하자

$$\begin{gather}\Phi(b_1) = c_1 - c_2 + 3c_3 - c_4 \\
\Phi(b_2) = 2c_1 + c_2 + 7c_3 + 2c_4\\
\Phi(b_3) = 3c_2 + c_3 + 4c+4\end{gather}$$

일 때, $k = 1,2,3$과 $\Phi(B_k)=\sum_{i=1}^4\alpha_{ik}c_i$를 만족하는 변환행렬 $A_\Phi$가 있다면

$$A_\Phi = [\alpha_1, \alpha_2, \alpha_3] = \begin{bmatrix}
1 & 2 & 0 \\
-1 & 1 & 3 \\
3 & 7 & 1 \\
-1 & 2 & 4
\end{bmatrix}$$

이다.
## 기저 변환(Basis Change)
$V,W$의 기저를 변환시켰을 때 선형 사상 의 변환행렬이 어떻게 동작하는지 알아보자.

각각의 순서가 있는 기저 두 개 씩을 상정해보자.

$$B=(b_1, \dots, b_n), \qquad \tilde{B} = (\tilde{b_1}, \dots \tilde{b_n})$$

$$C=(c_1, \dots, c_m), \qquad \tilde{C} = (\tilde{c_1}, \dots \tilde{c_m})$$

$A_\Phi \in \mathbb{R}^{m\times n}$은 기저 $B,C$를 따르는 선형 사상 $\Phi : V \rightarrow W$의 변환 행렬이며, $\tilde{A_\Phi} \in \mathbb{R}^{m\times n}$은 기저 $\tilde{B}, \tilde{C}$를 따르는 상응하는 선형 사상이다.

예를 들자면, 2차원 변환 행렬 

$$A = \begin{bmatrix}
2 & 1 \\ 1 & 2
\end{bmatrix}$$

과 새로운 기저

$$B=(\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ -1\end{bmatrix})$$

을 정의하면 새로운 대각 변환 행렬을 얻을 수 있다.

$$\hat{A} = \begin{bmatrix}
3 & 0 \\ 0 & 1
\end{bmatrix}$$

결론부터 이야기하면 위 수식을 통해 상응하는 변환 행렬 $\tilde{A_\Phi}$을 얻을 수 있다.

$$\tilde{A_\Phi} = T^{-1}A_\Phi S$$

이때, $S \in \mathbb{R}^{n \times n}$은 기저 $\tilde{B}$를 기준으로 표현된 좌표를 기저 $B$를 기준으로 표현된 좌표로 변환하는 벡터 공간 $V$에서의 항등 변환 $id_V$의 변환 행렬이다. 마찬가지로, $T \in \mathbb{R}^{m \times m}$은 기저 $\tilde{C}$를 기준으로 표현된 좌표를 기저 $C$를 기준으로 표현된 좌표로 변환하는 벡터 공간 $W$에서의 항등 변환 $id_W$의 변환 행렬이다.

> **증명** :
> Drumm과 Weil에 따르면, $V$의 새로운 기저 $\tilde{B}$의 벡터들을 다음과 같은 방법의로 $B$의 기저 벡터들로 표현할 수 있다.

> $$\tilde{b_j} = s_{1j}b_1 + \cdots + s_{nj}b_n = \sum^n_{i=1}s_{ij}b_i, \quad j = 1,\dots, n$$

> 마찬가지로 $W$의 새로운 기저 벡터들도 표현할 수 있다.

> $$\tilde{c_k} = t_{1k}c_1 + \cdots + t_{mk}c_m = \sum^m_{l=1}t_{lk}c_l, \quad k = 1,\dots, n$$

> $S=((s_{ij})) \in \mathbb{R}^{n \times n}$은 $\tilde{B}$ 기준 좌표를 $B$ 기준 좌표로 변환해주는 행렬이며, 마찬가지로 $T = ((t_{lk}))\in \mathbb{R}^{m \times m}$은 $\tilde{C}$기준 좌표를 $C$ 기준 좌표로 변환해주는 행렬이다. 이때, $S$의 j번 째 열은 $\tilde{b_j}$의 좌표를, $T$의 k번 째 열은 $\tilde{C_k}$의 좌표를 나타낸다. 

> 이제 $\Phi(\tilde{b_j})$를 두가지 관점으로 바라보자. 첫 번째는 사상 $\Phi$를 $\tilde{b_j} \in V \rightarrow \tilde{c_k} \in W \rightarrow c_l \in W$로 전개해보자

> $$\Phi(\tilde{b_j}) = \sum^m_{k=1}\tilde{a_{kj}}\tilde{c_k} = \sum^m_{k=1}\tilde{a_{kj}}\sum^m_{l=1}t_{lk}c_l=\sum^m_{l=1}(\sum^m_{k=1}t_{lk}\tilde{a_{kj}})c_l$$

> 위 수식에서 새로운 기저벡터 $\tilde{c_k} \in W$를 기저 벡터 $c_l \in W$로 표현했다.
> 두 번째로 $\tilde{b_j}$를 $b_i \in V$로 전개하고 $\Phi({b_i})$를 이용해보자

> $$\begin{gather}\Phi(\tilde{b_j}) = \Phi(\sum^n_{i=1}s_{ij}b_i)=\sum^n_{i=1}s_{ij}\Phi(b_i)=\sum^n_{i=1}s_{ij}\sum^m_{l=1}a_{li}c_l \\ = \sum^m_{l=1}(\sum^n_{i=1}a_{li}s_{ij})c_l, \quad j=1,\dots,n \end{gather}$$

> 위 두 수식 중 대응되는 항을 비교하면

> $$\sum^m_{k=1}t_{lk}\tilde{a}_{kj} = \sum^n_{i=1}a_{li}s_{ij}$$

> $$\rightarrow T\tilde{A_\Phi} = A_\Phi S \in \mathbb{R}^{m\times n}$$

> $$\rightarrow \tilde{A_\Phi} = T^{-1}A_\Phi S$$

> 임을 알 수 있고, 이 마지막 식이 **기저 변경에 따른 선형 사상의 행렬 표현 변환 법칙**이다.

### Equivalence
$A, \tilde{A} \in \mathbb{R}^{m\times n}$은 $\tilde{A} = T^{-1}AS$를 따르는 정규 행렬 $S \in \mathbb{R}^{n\times n}$과 $T \in \mathbb{R}^{m\times m}$이 존재하면 등가법칙을 따른다.

### Similarity
$A, \tilde{A} \in \mathbb{R}^{n\times n}$은 $\tilde{A} = S^{-1}AS$를 따르는 $S \in \mathbb{R}^{n\times n}$이 존재하면 **유사**하다. 이 때, similarity를 가지는 행렬은 언제나 equivalente하지만, 그 역은 성립하지 않는다.

### 고려해야 할 점
벡터공간 $V, W, X$가 존재할 때, 위 정리에 따르면 사상 $\Phi : V \rightarrow W$ 와 $\Psi : W \rightarrow X$ 이 선형이면  $\Phi \circ \Psi : V \rightarrow X$ 또한 선형이다. 상응하는 사상의 변환행렬 $A_\Phi$와 $A_\Psi$가 존재하면 $A_{\Psi \circ \Phi} = A_\Psi A_\Phi$로 작성할 수 있다.

그럼 이제 기저 변환을 선형 사상들의 합성 관점에서 바라볼 수 있다.
- $A_\Phi$는 선형 사상 $\Phi_{CB} : V \rightarrow W$의 변환 행렬이다.
- $\tilde{A_\Phi}$는 선형 사상 $\Phi_{\tilde{C}\tilde{B}} : V \rightarrow W$의 변환행렬이다.
- $S$는 $\tilde{B}$ 를 $B$의 관점에서 표현하는 선형 사상 $\Psi_{B\tilde{B}}:V\rightarrow V$(자기동형사상)의 좌표변환행렬이다. 일반적으로, $\Psi = \mathrm{id}_V$는 $V$의 단위행렬이다.
- $T$는 $\tilde{C}$ 를 $C$의 관점에서 표현하는 선형 사상 $\Xi_{C\tilde{C}}:W\rightarrow W$(자기동형사상)의 변환행렬이다. 일반적으로, $\Xi = \mathrm{id}_W$는 $W$의 단위행렬이다.

위 선형 사상들의 합성 관점에서 바라본 기저 변환을 요약하면

$$ A_\Phi:B\rightarrow C,\quad \tilde{A_\Phi}:\tilde{B} \rightarrow \tilde{C}, \quad S: \tilde{B} \rightarrow B, \quad T: \tilde{C} \rightarrow C, \quad T^{-1}: C\rightarrow \tilde{C} $$

이고,

$$ 
\tilde{B} \rightarrow \tilde{C} = {\color{blue} \tilde{B} \rightarrow B} {\color{red} \rightarrow C} \rightarrow \tilde{C}

$$

$$\tilde{A_\Phi} = T^{-1}{\color{red}A_\Phi}{\color{blue}S} $$

임을 알 수 있다.

바로 위의 수식에서 식은 오른쪽에서 왼쪽으로 수행되는데, 그 이유는 선형 사상들이 벡터 오른쪽에 곱해지는 구조이기 때문이다. 따라서 변환의 흐름은

$$x \mapsto Sx \mapsto A_{\Phi}(Sx) \mapsto T^{-1}(A_{\Phi}(Sx)) = \tilde{A}_{\Phi}x$$ 

와 같이 진행된다.

## 상과 영공간(Image and Kernel)
**상(_Image/Range_)** 과 **영공간(_Kernel/Null Space_)** 은 몇가지 중요한 성질을 가진 벡터 부분 공간이다.
선형 사상 $\Phi : V \rightarrow W$에서 영공간은 다음과 같이 정의한다.$$\mathrm{ker}(\Phi) := \Phi^{-1}(0_W) = \{v \in V: \Phi(v)=0_W \}$$
풀어서 해석하자면 $\Phi(V)=0$이 되는 모든 $v \in V$의 집합이며, 걸러져서 0이 되는 방향임을 의미한다. 비유하자면 $V$는 입력 공간, $\Phi$는 선형 필터와 같다.

선형 사상 $\Phi : V \rightarrow W$에서 상은 다음과 같이 정의한다.

$$
\mathrm{Im}(\Phi) := \Phi(V) = \{w \in W |\exists v\in V : \Phi(v) = w\}
$$

풀어서 해석하자면 $v \in V$가 존재해서 $\Phi(v) = w$가 된다는 의미이며, 필터를 통과한 정보가 도달되는 공간이라고 볼 수 있다.

또한 각각 $V,W$를 $\Phi$의 $domain$과 $codomain$라고 부르기도 한다.

임의의 벡터 공간 $V,W$의 선형 사상 $\Phi : W \rightarrow W$에서 다음 특성을 가진다.
- $V$의 영벡터 $0_V$는 항상 $W$의 영벡터 $0_W$로 매핑($\Phi(0_V)=0_W$)된다. 따라서 $0_V \in \mathrm{ker}(\Phi)$이며, 커널은 최소한 영벡터 하나는 항상 포함하므로 절대 비어있지 않다.
- $\mathrm{Im}(\Phi) \subseteq W$는 항상 $W$의 부분 공간이며, $\mathrm{ker}(\Phi) \subseteq V$는 $V$의 부분 공간이다.
- $\Phi$는 단사(Injective)일 때이자 그 때에만 $\mathrm{ker}(\Phi)=\{0\}$이다.

### 영공간과 열공간
임의의 행렬 $A \in \mathbb{R}^{m\times n}$과 임의의 선형 사상 $\Phi : \mathbb{R}^n \rightarrow \mathbb{R}^m, x\mapsto Ax$이 존재한다고 가정하자($\mapsto$는 mapping을 의미).

- $a_i$ 가 $A$의 열인 모든 $A = [a_1, \dots, a_2]$에 대해 다음 수식을 얻을 수 있다.

$$\begin{align}
\mathrm{Im}(\Phi) &= \{Ax:x\in \mathbb{R}^n\}=\{\sum_{i=1}^nx_ia_i:x1, \dots, x_n \in \mathbb{R}\} \\
&=span[a_1, \dots, a_n] \subseteq \mathbb{R}^m
\end{align}
$$ 

예를 들면, 상은 $A$의 열의 스팬이며, 열공간(_column space_)라고 부른다. 그러므로 열공간(상)은 $\mathbb{R}^m$의 부분공간이며 $m$은 행렬의 '높이'를 의미한다.
- $\mathrm{rk}(A) = \mathrm{dim}(\mathrm{Im}(\Phi))$. Rank는 독립적인 열의 수를 의미하며, 이는 이미지의 차원과 같고, $A$가 얼마나 많은 출력을 생성하는지와 관련있다.
- 영공간은 동차방정식 $Ax=0$의 해 공간이며, $\mathrm{ker}(\Phi)$은 $Ax=0$의 일반해 공간이다. 따라서 $\mathrm{ker}(\Phi) = \{x \in \mathbb{R}^n:Ax=0\}$이며, 이는 영공간이 $A$의 열벡터들에 어떤 $x$를 곱했을 때, $0 \in \mathbb{R}^m$이 되는 모든 $x$임을 의미한다. 정리하자면, $0 \in \mathbb{R}^m$이므로 커널은 정의역에서 입력값으로 향하는 값 중 무효가 되는 방향임을 의미한다
- $\mathrm{dim}(\mathrm{ker}(\Phi))+\mathrm{dim}(\mathrm{Im}(\Phi)) = n$ (Rank-Nullity 정리)
- 커널은 $\mathbb{R}^n$의 부분공간이며 $n$은 행렬의 '너비'를 의미한다.

### Rank-Nullity Theorem
임의의 벡터 공간 $V,W$와 임의의 선형사상 $\Phi : V \rightarrow W$는 다음을 만족한다.

$$
\mathrm{dim(ker}(\Phi))+\mathrm{dim(Im(}\Phi)) = \mathrm{dim}(V)
$$

- 만약 상이 정의역보다 작으면(($\mathrm{dim}(\mathrm{Im}(\Phi))<\mathrm{dim}(V)$) 반드시 커널에 0 이외의 벡터가 존재하고(non-injective, 단사하지 않음), $Ax=0$에 무수히 많은 해 존재가 가능하다.
- $\mathrm{dim}(V) = \mathrm{dim}(W)$면 다음 상관관계가 성립한다. 
$$\Phi \ is \ injective \Leftrightarrow \Phi \ is \ surjective \Leftrightarrow \Phi \ is \ bijective$$ 정리하면, 정의역의 차원이 공역의 차원일 때 $\Phi$가 단사이면 자동으로 전사이고 그 반대도 성립한다. $\mathrm{Im}(\Phi) \subseteq W$이기 때문.
- $\mathrm{dim}(\mathrm{ker}(\Phi)) = 0$ : 단사
- $\mathrm{dim}(\mathrm{Im}(\Phi))=\mathrm{dim}(W)$ : 전사

# 아핀 공간(Affine Spaces)
## 아핀 부분 공간(Affine Subspaces)
임의의 벡터 공간 $V$가 $x_0 \in V, U \subseteq V$를 만족한다면, 다음 부분집합

$$
\begin{align}
L &= x_0 + U :=\{x_0 + u : u \in U\} \\
&=\{v \in V|\exists u\in U:v=x_0+u\}\subseteq V
\end{align}
$$

은 **아핀 부분공간(_affine subspace_)** 또는 **V의 선형 다양체(_linear manifold_)**라고 부른다. $U$는 **방향(_direction_)** 또는 **방향 공간(_direction space_)**라고 부르며 $x_0$는 **기준점(_support point_)**라고 부른다.

정의에 따르면, 어떤 점 $x_0 \notin U$ 일 때, 아핀 부분공간의 정의는 원점 0을 포함하지 않는다. 따라서 $x_0 \notin U$ 인 경우, 아핀 부분공간은 V의 (선형) 부분공간(즉, 벡터공간의 부분집합)이 아니다.

아핀 부분공간의 예를 들자면 $\mathbb{R}^3$ 공간에서 원점을 지나지 않는 점, 선, 면을 들 수 있다.

벡터 공간 $V$에 존재하는 두 아핀 부분 공간 $L=x_0+U$와 $\tilde{L} = \tilde{x_0}+\tilde{U}$가 존재한다고 상정해보자. 이때, $U \subseteq \tilde{U}$이며 $x_0 - \tilde{x_0} \in \tilde{U}$ 일 때이자 그 때에만 $L \subseteq \tilde{L}$이다.

아핀 부분 공간은 종종 **파라미터**로 기술되기도 한다.$V$의 $k$차원 아핀 공간 $L=x_0+ U$가 존재한다고 가정해보자. 이때, $(b_1, \dots, b_k)$가 $U$의 순서가 있는 기저라면 $x\in L$의 모든 요소는

$$
x = x_0+\lambda_1b_1 + \dots + \lambda_kb_k
$$

로 유일하게 기술되며, $\lambda_1, \dots \lambda_k \in \mathbb{R}$이다. 

위 표현은 $L$의 **매개변수 방정식(_parametric equation_)**라고 하며, 방향 벡터 $b_1, \dots, b_k$와 매개변수 $\lambda_1, \dots, \lambda_k$로 이루어진다.

### 선형 방정식의 비동차계와 아핀 부분 공간(Inhomogeneous system of linear equations and affine subspaces)
비동차 선형 시스템(Inhomogeneous linear system)의 해 공간(solution)은 항상 $n-\mathrm{rk}(A)$차원의 아핀 부분공간이다.

어떤 k차원 아핀 부분 공간에서 적절한 $A\in \mathbb{R}^{m\times n}$과 $b \in \mathbb{R}^m$, 그리고 $Ax=0$을 찾으면 $Ax=b$의 해 집합과 같아진다.

## 아핀 사상(Affine Mappings)
벡터 공간 사이의 [[#선형사상(Linear Mappings)]]과 유사하게 두 아핀 공간 사이에도 아핀 사상을 정의할 수 있다. 선형 사상과 아핀 사상은 밀접하게 연관되어 있어 선형사상의 많은 요소들을 아핀사상에서도 공유한다.

두 벡터 공간 $V, W$, 선형 변환 $\Phi \rightarrow W$ 그리고 $a \in W$가 있다고 하면, 아핀 사상 $\phi$를 다음과 같이 정의할 수 있다.

$$
\begin{align}
\phi : &V \mapsto W\\
& x \mapsto a+ \Phi(x)
\end{align}
$$

이때 벡터 $a$는 $\phi$의 **변환 벡터(translation vector)**라고 부른다.

### 아핀 사상의 성질
- 모든 아핀 사상은 선형 사상과 평행이동의 합성이다.
	- 임의의 아핀 사상 $\phi : V \to W$는 선형 사상 $\Phi:V\to W$와 평행이동 $\tau: W\to W$의 합성으로 나타낼 수 있다($\phi = \tau \circ\Phi$). 이때 $\Phi, \tau$는 유일하게 결정된다.
- 아핀 사상들의 합성은 여전히 아핀 변환이다.
- 아핀 사상이 전단사면 기하적 구조를 보존한다.
	- 이는 길이, 각도는 변할 수 있지만, 차원(dimension), 평행성(parallelism)은 그대로 유지된다는 의미이다.