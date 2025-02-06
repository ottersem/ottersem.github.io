---
layout: post
title: Data Scaling for Regression Modeling
date: 2025-01-22 15:58:00
description: 회귀 모델링을 위한 데이터 표준화
tags: Standard_Scaler, Regression
categories: ML
pretty_table: true
---

# 연속형 변수와 이산형 변수
## 연속형 변수 (Continuous Variables)
**연속형 변수**는 무한하고 셀 수 없는 값들로 구성된다. 일반적으로 **실수**로 표현되며, **두 값 사이에는 항상 또 다른 값이 존재**할 수 있다.
 회귀 분석에서 연속형 변수는 일반적으로 **종속 변수**로 사용된다.

## 이산형 변수 (Discrete Variables)
**이산형 변수**는 셀 수 있는 분리된 값들로 구성된다. 일반적으로 **정수**로 표현되며, **두 값 사이에 다른 값이 존재하지 않는다.**
 회귀 분석에서 이산형 변수는 일반적으로 **독립 변수**로 사용된다. 또한, ‘범주형 변수’로도 간주될 때도 있다.

# 데이터 표준화와 정규화
## 데이터 표준화(StandardScaler)
StandardScaler는 특성의 평균을 0, 분산을 1로 조정하여 모든 특성이 동일한 스케일을 갖도록 변환하는 방법이다. 데이터 표준화를 사용하는 이유는, 우리가 다루는 데이터들의 크기가 다소 다를 때 발생하는 문제를 해결하기 위해서이다.
모델은 단순히 숫자의 크기 때문에 한 특성을 더 중요하게 여길 수 있고, 그 결과로 학습이 왜곡될 가능성이 있다. 그렇기에 데이터를 표준화 하여 데이터의 모든 특성은 모델 학습에 동등하게 기여할 수 있게 되고, 이는 더 균형 잡힌 학습 결과를 산출해낸다.

## 데이터 표준화의 장단점
### 장점
- 모델이 각 특성을 좀 더 균등하게 취급하도록 도와준다.
- 데이터를 정규 분포에 가깝게 만든다.
- 표준화된 특성은 최적화 알고리즘의 수렴을 빠르고 효율적으로 만들어, 모델 학습 과정의 성능을 향상시킨다.

### 단점
- 이상치가 있는 데이터에 적용할 때, 이상치들이 결과를 왜곡시킬 수 있다.
- 데이터를 표준화 하는 과정에서 특성의 원본 분포가 변경되어, 데이터의 구조적 특성이나 본질적인 정보가 감소할 수 있다.

## 데이터 표준화 수식

$$Z = \frac{(x - \mu)}{\sigma}$$

$\mu$는 평균, $\sigma$는 표준편차를 의미한다.

## StandardScaler 적용
```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

# fit 메서드는 데이터에 대한 평균과 표준편차를 계산한다.
scaler.fit(data)
# transform 메서드는 계산된 평균과 표준편차를 사용하여 데이터를 표준화한다.
scaled_data = scaler.transform(data)

# 표준화된 데이터를 데이터프레임으로 변환한다.
scaled_data_df = pd.DataFrame(scaled_data, columns =['columnname1_scaled', 'columnname2_scaled'])
```
