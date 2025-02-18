---
layout: post
title: Feature Engineering(1)
date: 2025-02-15 17:25:00
description: 피처 엔지니어링
tags: NMAE, Feature_Engineering
categories: ML
pretty_table: true
---

# Feature Engineering(1)
# NMAE(Normalized Mean Absolute Error)
NMAE는 **실제와 예측 값 사이의 차이를 절대값으로 취한 후, 실제 값으로 나누어 평균**을 내는 함수이다. 이는 오차의 크기가 원래 값에 대해 상대적으로 얼마나 큰지 나타내는 정규화된 지표이며, 낮은 NMAE 값은 모델의 예측이 실제 값에 가깝다는 것을 의미한다.

```python
from sklearn.liner_model import LinerRegression()
import numpy as np 
def NMAE(true, pred):
	score = np.mean(np.abs(true-pred) / true)
	return score

...
model = LinerRegression()
model.fit(X,y)

y_hat = model.predict(X)

score = NMAE(y, y_hat)

print(f'모델 NMAE: {score}')
```

NMAE 점수는 학습 데이터셋에 대한 것이므로, **모델이 학습 데이터에 대해 얼마나 잘 적합(fit)**했는지 나타낸다.
**실제 모델의 일반화 성능을 평가하려면 학습에 사용되지 않은 검증 데이터셋이나 테스트 데이터셋에 대해 NMAE를 계산**해야 한다.

# Feature Engineering
## by Human
주어진 데이터로부터 새로운 피처를 생성하는 목적은
- 모델이 데이터에서 더 많은 패턴을 학습할 수 있기 위해
- 데이터의 표현력을 증대시키기 위해
- 원래 데이터에 없던 새로운 정보를 추출하기 위해
- 데이터의 잠재적인 정보를 드러내기 위해

라고 할 수 있다.
예를 들면 날짜 정보를 기반으로 요일 정보를 추가한다던지, 또는 날씨(온도) 정보를 추가한다던지 등이 있다.
```python
X_human['week_day'] = pd.to_datetime(bicycle['date_time']).dt.weekday
```

## by Computer

sklearn등에서 제공하는 자동 feature engineering 등을 활용해도 좋지만 단순 연산을 통해서도 성능을 향상시킬 수 있다.
```python
# 2번은 컴퓨터로 만든 feature들을 사용합니다.
X_computer = X.copy()

col_list = X_computer.columns

# 이중 for문을 사용하여 feature 자기 자신의 제곱과 두 feature간의 곱이라는 새로운 feature를 추가합니다.
for i in range(len(col_list)):
    for j in range(i, len(col_list)):
        X_computer[f'{col_list[i]}*{col_list[j]}'] = X_computer[col_list[i]] * X_computer[col_list[j]]

X_computer.head()
```

> 자동연산을 이용해 피처를 생성하는 의미 : 단순 연산에 의한 피처 생성이 어떤 원리로 모델 성능을 향상 시키는가?
자동 연산에 의한 피처 생성이라는 개념은 **본질적으로 기계 학습 모델이 데이터의 비선형 관계를 더 잘 이해할 수 있도록 돕는 방법** 중 하나이다. sklearn의 PolynominalFeatures 같은 도구도 그런 방법이라고 볼 수 있다.

| 연산  | 효과                                 |
| --- | ---------------------------------- |
| 덧셈  | 두 피처를 더하는 것은 피처 간의 선형 조합을 생성한다.    |
| 뺄셈  | 한 피처에서 다른 피처를 빼는 것은 피처 간 차이를 강조한다. |
| 곱셈  | 두 피처의 곱은 피처 간 상호작용을 나타낸다.          |
| 나눗셈 | 한 피처를 다른 피처로 나누는 것은 비율을 생성한다.      |
| 제곱  | 피처의 제곱은 해당 피처의 중요도를 증가시킬 수 있다.     |

이렇게 자동 연산에 의한 피처 생성은 데이터의 원본 구조를 확장하고, 모델이 선형 관계와 비선형 관계를 모두 이해할 수 있게 해주지만, 각각의 연산이 실제로 데이터에 어떤 의미를 가지는지, 또 생성된 피처가 어떤 영향을 미칠지를 평가하는 것이 중요하다.

또한 무작위로 피처를 생성하고 이를 모델에 적용하기 보다는 피처가 가지는 의미와 모델의 목적을 이해하고, 이에 기반한 피처 선택이 효과적이다.

## by Human & Computer
자동 연산에 더불어 사람의 도메인 지식이 추가되는 편이 아무런 조작 없는 모델 대비 오차율이 대폭 줄고, 때로는 자동 연산이 적용된 모델 대비 약소한 성능 향상의 효과를 가진다.