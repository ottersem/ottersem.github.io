---
layout: post
title: Logistic Regression
date: 2025-01-17 14:26:00
description: 로지스틱 회귀분석
tags: Logistic_Regression, Odds, Logit, Sigmoid
categories: ML
pretty_table: true
toc:
  beginning: true
---

# 로지스틱 회귀분석이란?
로지스틱 회귀분석 모델은 로지스틱 함수에서 이진 분류 문제를 풀기 위해 발전되었다. 이 모델은 주로 예/아니오 처럼 **두 가지 범주로 결과가 나뉘는 경우**에 사용된다.

- 확률 추정 : 로지스틱 회귀는 주어진 데이터가 특정 클래스에 속할 확률을 추정한다. 0과 1 사이의 값으로, 예측된 확률이 특정 임계값(일반적으로 0.5) 이상인 클래스와 아닌 클래스로 분류한다.
- 시그모이드 함수 : 로지스틱 회귀는 시그모이드 함수(또는 로지스틱 함수)를 사용하며 입력 데이터의 선형 조합을 0과 1사이의 확률 값으로 변환한다. 시그모이드 함수는 S자 형태의 곡선을 그리며, 이 함수는 선형 조합의 결과를 확률로 매핑한다.
- 최대 우도 추정 : 로지스틱 회귀 모델은 최대 우도 추정(Maximum Likelihood Estimation) 방법을 사용하여 모델 파라미터를 추정한다. MLE는 주어진 데이터에 대해 관측된 결과의 확률을 최대화하는 파라미터 값을 찾는 과정이다.
- 이진 분류 : 로지스틱 회귀는 기본적으로 이진 분류를 위해 설계되었지만 다중 클래스 분류 문제에도 적용될 수 있다.

## 로지스틱 회귀분석의 장점
- 해석하기 용이하다. 각 특성의 가중치를 분석해 어떤 특성이 결과에 더 큰 영향을 미치는지 이해할 수 있다.
- 결과의 확률을 제공하여 단순 분류 뿐 아니라 불확실성을 평가할 수 있다.
- 다양한 유형의 데이터에 적용할 수 있으며 비선형 관계를 모델링 할 수도 있는 등 유연성을 가진다.

## 로지스틱 회귀분석의 한계
- 기본적으로 선형 관계를 가정하기에 복잡한 비선형 관계를 모델링하기 위해선 추가적인 기법이 필요하다.
- 중요하지 않거나 상관관계가 높은 특성이 포함되어 있으면 모델의 성능이 저하될 수 있다.
- 특성의 수가 많거나 모델이 복잡할 경우 오버피팅이 발생할 수 있다.

# 이론
## 오즈(Odds)
특정 사건이 **발생할 확률과 그 사건이 발생하지 않을 확률 간의 비율**

$$odds = \frac{P(Y=1)}{1-P(Y=1)}$$

## 로그변환(Logit)과 시그모이드
로지스틱 회귀에서 종속 변수의 $\log(odds)$를 독립 변수들의 선형 조합으로 모델링한다. 오즈는 0 이상의 값만 존재하지만, 로그 변환으로 값의 범위를 실수 전체로 확장시켜 종속변수와 독립 변수 사이의 관계를 선형 방정식으로 표현할 수 있다. 이때 logit은 logistic과 probit을 합친 단어로 다음과 같이 정의된다.

$$L=\log(Odds)=\ln\frac{p}{1-p}$$

Odds는 그 값이 1보다 큰지가 결정의 기준이고, logit은 0 보다 큰지가 결정의 기준이다. 또한 logit함수와 sigmoid함수는 서로 역함수 관계를 가진다.

$$
\begin{align*}
\text{Logit}(p) &= \ln\left(\frac{1}{1-p}\right) = L, \\
\frac{p}{1-p} &= \exp(L), \\
\frac{1}{p} - 1 &= \frac{1}{\exp(L)}, \\
p &= \frac{\exp(L)}{1+\exp(-L)} = \frac{1}{1+\exp(-L)} = \text{Sigmoid}(L), \\
\therefore\quad \text{Logit}(p) &= L,\quad \text{Sigmoid}(L) = p.
\end{align*}
$$

로지스틱 회귀에서 시그모이드 함수는 입력 데이터의 선형 조합을 확률 값으로 변환하는 데 사용된다. 그 예로, 로지스틱 회귀 모델에서는 데이터의 특성과 가중치의 선형 조합을 계산하고, 시그모이드 함수의 입력으로 사용해 0과 1사이의 값을 얻는다.

# LogisticRegression 클래스
Scikit-learn의 로지스틱 회귀 모델을 사용하여 모델을 조정하고 훈련할 수 있다.

```python
from sklearn.linear_model import LogisticRegression
import numpy as np
# 로지스틱 회귀 모델 생성
model = LogisticRegression()
#모델 훈련
model.fit(X,y)

x_data = np.linspace(-1.2, 1.2, 100).reshape(-1,1)
pred = model.predict_proba(x_data)[:,1]
```

LogisticRegression()에서 사용하는 주요 파라미터는 다음과 같다.

|                     |                                                                                 |
| ------------------- | ------------------------------------------------------------------------------- |
| `penalty`           | 정규화 종류. 'l1', 'l2', 'elasticnet', 'none' 중 선택. 기본값은 'l2'.                       |
| `dual`              | 이중 또는 원시 방법 선택. 기본값은 `False`.                                                   |
| `tol`               | 최적화 중단을 위한 허용 오차. 기본값은 1e-4.                                                    |
| `C`                 | 정규화 강도의 역수. 값이 작을수록 강한 정규화. 기본값은 1.0.                                           |
| `fit_intercept`     | 모델에 절편(상수 항) 포함 여부. 기본값은 `True`.                                                |
| `intercept_scaling` | 절편에 적용되는 스케일링 팩터. `fit_intercept`가 `True`일 때 사용.                                |
| `class_weight`      | 클래스 불균형을 처리하기 위한 가중치. 기본값은 `None`.                                              |
| `random_state`      | 난수 발생기 시드. 결과 재현성을 위함.                                                          |
| `solver`            | 최적화 문제를 해결하기 위한 알고리즘. 'newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga' 등 선택 가능. |
| `max_iter`          | 최적화를 위한 최대 반복 횟수. 기본값은 100.                                                     |
| `multi_class`       | 다중 클래스 분류 전략. 'auto', 'ovr', 'multinomial' 중 선택.                                |
| `verbose`           | 로그 출력 상세도.                                                                      |
| `warm_start`        | 이전 호출의 솔루션을 재사용하여 피팅을 초기화 여부. 기본값은 `False`.                                     |
| `n_jobs`            | 병렬 처리를 위한 CPU 코어 수. 기본값은 `None` (1개 코어 사용).                                     |

# statsmodel을 활용한 분석
```python
import statsmodel.api as sm

X_con = sm.add_constatn(X) #상수항 추가
sm_model = sm.Logit(y, X_con) #모델 생성
result = sm_model.fit()
print(result.summary())

Optimization terminated successfully.
         Current function value: 0.490686
         Iterations 6
                           Logit Regression Results                           
==============================================================================
Dep. Variable:                      y   No. Observations:                  300
Model:                          Logit   Df Residuals:                      298
Method:                           MLE   Df Model:                            1
Date:                Fri, 17 Jan 2025   Pseudo R-squ.:                  0.2921
Time:                        14:09:15   Log-Likelihood:                -147.21
converged:                       True   LL-Null:                       -207.94
Covariance Type:            nonrobust   LLR p-value:                 3.005e-28
==============================================================================
                 coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
const          0.0837      0.146      0.574      0.566      -0.202       0.369
x1             2.1228      0.254      8.343      0.000       1.624       2.622
==============================================================================
```

각각의 결과는 다음과 같이 해석할 수 있다.

(Pseudo) R-squared : 모형이 데이터에 잘 맞는 정도(얼마나 선형적인가)를 보여주는 지표이다. 1에 가까울수록 모델의 설명력이 높고, 0.4 이상이면 괜찮은 모델이라 할 수 있다.

coef(coeffcient, 계수) : 데이터로부터 얻은 계수의 추정치이다. 위 수식을 기준으로 y = 0.0837 + 2.1228x의 수식이 만들어 짐으로 해석할 수 있다.

p\>\|z\| (p-value, 유의 확률) : 독립변수의 유의 확률을 의미하며 95%의 신뢰도를 가져야 유의미하다고 판단된다. 따라서 유의확률이 0.05보다 작으면 독립 변수가 종속 변수에 영향을 미치는 것이 유의미하다고 보면 된다.

간략하게 정리하면 R-squeared가 0.4이상, p-value0.05 보다 작으면 유의미한 결과라고 볼 수 있다.