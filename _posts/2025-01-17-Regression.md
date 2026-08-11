---
layout: post
title: Regression
date: 2025-01-17 16:17:00
description: 회귀분석
tags: Regression, SLR, MLR, Multicollinearity
categories: ML
pretty_table: true
toc:
  beginning: true
---

# 회귀분석이란?

회귀분석은 변수들 사이의 관계를 이해하고 예측하는 통계적 방법이다. 하나의 변수(종속 변수)가 다른 변수들(독립 변수)에 의해 어떻게 영향을 받는지 알려준다.

1. 단순선형 회귀 : 하나의 독립 변수와 하나의 종속 변수 예측
2. 다중 선형 회귀 : 여러 독립 변수를 사용하여 종속변수 예측
3. 로지스틱 회귀 : 범주형 종속 변수 예측

## 회귀분석의 장점

1. 작은 데이터 세트에서도 효과적이다.
2. 간단하고 비용이 적게 든다.
3. 이해와 설명이 중요하다.
4. 선형 관계가 강한 데이터에 적합하다

## 회귀분석의 한계

- 선형 관계에만 집중하여 비선형 관계를 가진 데이터에는 맞지 않을 수도 있다.
- 단순한 모델이기에 복잡한 패턴과 관계를 완전히 설명하기엔 부족할 수 있다.

# 단순 선형 회귀(Simple Linear Regression)

단순 회귀 분석 식은 다음과 같다.

$$Y = a+bX+\epsilon$$

$X$(독립변수) : 예측하거나 설명하고자 하는 변수.

$Y$(종속변수) : 예측하려는 변수로, 독립변수에 의해 영향을 받는다.

$a$ (회귀계수) : y 절편이라고 하며, 독립변수의 값이 0일 때 예상되는 종속변수의 값

$b$ (회귀계수) : 기울기이며, 독립변수가 한 단위 변할 때 종속변수가 얼마나 변하는지 나타낸다.

$\epsilon$ (오차) : 모델이 설명하지 못하는 무작위 변동성

- 회귀선 : 데이터 포인트 사이의 관계를 나타낸다. ‘최적’의 선형 관계를 표현하며 독립 변수가 변할 때 종속 변수가 어떻게 변할 지 예측할 수 있다.

회귀 계수를 구하기 위해서는 다음 순서로 최소제곱법을 이용한다.

1. 회귀 모델의 정의
2. 오차의 제곱합 계산 : 독립 변수에 대해 실제 값과 회귀 모델에 의해 예측된 값 사이의 차이의 제곱합을 계산
3. 제곱합 최소화 : 제곱합을 최소화 하는 절편과 각 독립 변수에 대한 회귀 계수 값을 찾는다.

# 다중 선형 회귀(Multiple Linear Regression)

다중 회귀 분석 식은 다음과 같다.

$$Y = a+b_1X_1+b_2X+2+...+b_nX_n+\epsilon$$

다중 회귀분석은 여러개의 독립 변수와 한 개의 종속 변수를 가지는 선형 관계를 모델링한다. 회귀 분석 식을 통해 데이터에서 관찰되는 관계의 강도와 방향을 이해할 수 있다.

# 회귀분석을 위한 가정

1. 선형성 : 종속변수와 독립변수 사이에는 직선과 같은 선형의 관계가 있어야 한다.
2. 오차의 독립성(Independence of Errors) : 모델의 예측과 실제 값 사이의 차이(오차)가 서로 영향을 주지 않아야 한다.
3. 오차의 정규분포(Normality of Errors) : 오차는 ‘정규 분포’를 따라야 한다.
4. 오차의 등분산성(Homoscedasticity) : 오차의 크기가 독립 변수의 값에 관계없이 일정해야 한다.
5. 다중공선성(Multicollinearity)의 부재 : 독립 변수들이 서로 강하게 연관되어 있지 않아야 한다.

# 회귀모형 평가

## 회귀모형 적합도

1. 결정계수(R-squared) : 모델이 데이터의 변동성을 얼마나 잘 설명하는지를 나타낸다. 1에 가까울 수록 설명력이 높다는 의미이지만, 무조건 높다고 좋은 모델을 의미하지는 않는다.(오버피팅의 가능성)
2. 조정 결정계수(adjusted R-squared) : 독립 변수의 수를 고려하여 결정 계수 값을 조정한 값으로, 불필요한 변수가 모델에 추가될 때 수치를 보정한다.
3. 표준 오차(standard Error) : 회귀선과 실제 데이터 포인트 간 평균 거리를 나타낸다. 작을수록 모델의 예측이 실제 값에 더 가깝다는 의미다.
4. F-통계량 (F-statistic) : 모델의 전체 유의성을 평가한다. F-통계량이 크고 관련 p-값이 작을수록 모델이 통계적으로 유의미하다.
5. AIC (Akaike Information Criterion) 및 BIC(Bayesian Information Criterion) : 모델의 복잡성과 적합도를 함께 고려하는 지표다. 값이 작을수록 긍정적이다.

## 회귀계수에 대한 T검정

T 검정의 주요 목적은 회귀 모델에서 각 독립 변수가 종속 변수에 미치는 영향이 통계적으로 유의미한지를 평가하는 것이다. 구체적으로 다음과 같은 이유로 T 검정을 수행한다.

- 통계적 유의성 판단 : 회귀계수가 0이라면, 해당 변수는 종속 변수에 영향을 미치지 않는 것으로 간주된다.
- 신뢰 구간 추정 : t 검정은 회귀계수의 신뢰 구간을 계산하는 데 사용된다. 신뢰 구간은 회귀계수가 특정 범위 안에 있을 확률을 제공한다.
- 변수 선택 : 회귀 모델에서 어떤 변수들이 결과에 중요한 영향을 미치는지 결정하는 데 t 검정 결과가 사용될 수 있다.
- 모델의 예측력 평가 : t 검정은 모델의 전체적인 예측력을 평가하는 데 도움을 준다.

## 더빈-왓슨(Durbin-Watson) 검정

더빈-왓슨 통계량은 0에서 4 사이의 값을 찾으며, 2 근처의 값은 잔차 간에 상관관계가 없음을 나타낸다. 0에 가까우면 양의 자기상관, 4에 가까우면 음의 자기상관이 있음을 의미한다.

## 오차의 정규성 검증

```python
from scipy import stats

# 잔차계산
residuals = result.resid

# Shapiro-Wilk test
shapiro_test = stats.shapiro(residuals)

# K-S test
ks_test = stats.kstest(residuals, 'norm')

# Q-Q plot
plt.figure(figsize=(6, 4))
sm.qqplot(residuals, line='s')
plt.title('Normal Q-Q Plot')
plt.show()
```

### 샤피로-윌크(Shapiro-Wilk)

샤피로-윌크는 표본 크기가 50개 미만일 때 효과적으로 검정할 수 있다. 샤피로-윌크 검정에서의 통계량(W)은 0과 1 사이의 값을 가진다. 값이 1에 가까울수록 데이터는 정규 분포를 더 잘 따르는 것으로 간주된다.

### 콜모고로브-스미르노브(Kolmogorov-Smirnov)

K-S 검정은 표본의 크기가 50개 이상인 경우에 고려가능한 검정법이다. K-S 검정의 통계량(D)은 0과 1 사이의 값을 가지며, 데이터가 기대하는 분포와 얼마나 다른지를 보여준다. 이 값이 작으면 정상적인 데이터와 유사하고, 크면 정상적인 데이터와 차이가 크다는 의미를 가진다.

### QQ플롯

QQ플롯(Quantile-Quantile Plot)은 샘플 데이터의 분위수와 정규 분포의 분위수를 비교하는 그래프이다. 데이터가 정규 분포를 따른다면, 점들이 직선에 가깝게 그려진다.

## 등분산성 검증

```python
from statsmodels.stats.diagnostic import het_breuschpagan, het_goldfeldquandt

# 잔차 계산
residuals = results.resid

# Breusch-Pagan test
bp_test = het_breuschpagan(residuals, results.model.exog)

# Residual plot
plt.scatter(predicted_values, results.resid)
plt.xlabel("Predicted Values")
plt.ylabel("Residuals")
plt.title("Predicted Values vs. Residuals")
plt.axhline(y=0, color='r', linestyle='--')
plt.show()
```

### 브루스-파간(Breusch-Pagan)

브루스-파간 검정은 선형 회귀 모델에서 잔차의 등분산성 가정이 유효한지를 검정하는 통계적 방법이다. 브루스-파간 검정 결과를 해석할 때는 통계량 자체보다는 통계량에 대한 p값이 더 중요하다.

- p \<= 0.05 : 통계량이 통계적으로 유의미하며, 잔차의 이분산성이 존재할 가능성이 높다.
- p \> 0.05 : 통계량이 통계적으로 유의미하지 않으며 잔차의 등분산성을 가정하는 것이 타당하다.

### 잔차 플롯

잔차 플롯은 잔차가 독립 변수의 모든 값에 대해 일정한 분산을 가지고 있는지 확인한다. 등분산성이 있다면, 플롯 상의 점들은 수평선을 중심으로 무작위로 퍼져있어야 하며, 명확한 패턴과 형태가 보이지 않아야 한다.

## 다중공선성(multicollinearity)

회귀분석에서 여러 독립변수들이 서로 높은 상관관계를 가질 때, 이들 변수들이 상호종속적 관계에 있다고 할 수 있다. 이를 **'다중공선성이 있다’**라고 말한다
다중공선성이 높은 경우, 회귀 계수의 추정이 불안정해지며, 작은 데이터의 변화에도 모델이 과도하게 반응할 수 있다. 또한, 어떤 변수가 결과에 미치는 영향을 정확히 추정하기 어려워진다.
이를 해결하기 위해 변수 선택, 주성분 분석 등을 통해 변수의 수를 줄이거나, 덜 상관관계가 있는 변수를 선택할 수 있다. 또한, 릿지 회귀나 라쏘 회귀와 같은 정규화 기법을 사용하여 다중공선성의 영향을 줄일 수 있다.

### 분산팽창계수(Variance Inflation Factor, VIF)

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor

# VIF 계산
X = df[['X1', 'X2', 'X3']]
X = sm.add_constant(X)
vif_data = pd.DataFrame()
vif_data["feature"] = X.columns
vif_data["VIF"] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]

print(vif_data)
```

VIF는 회귀모델에서 독립변수가 다른 독립변수들과 얼마나 강하게 연관되어 있는지를 나타내는 값이다.

$$VIF = \frac{1}{1-R^2}$$

VIF가 1에 가까우면 다중공선성이 **없는 것으로 간주**하고, 5 이상이면 **다중공선성이 있을수 있다고 보고**, 10 이상이면 **심각한 다중공선성**이 있다고 간주한다. 또한, VIF는 변수들 간 선형 관계만을 고려하기 때문에, 비선형 관계에 대해서는 감지하지 못할 수 있다.
