---
layout: post
title: Polynomial Features
date: 2025-03-15 22:37:00
description: PolynomialFeatures를 활용한 피처의 다항식 조합 생성
tags: PolynomialFeatures
categories: ML
pretty_table: true
---

# Polynomial Features
Scikit-learn의 PolynomialFeatures를 사용하면, 기존 피처의 다항식 조합을 쉽게 생성할 수 있다.

```python
from sklearn.preprocessing import PolynomialFeatures
import numpy as np

...

poly = PolynomialFeatures(degree=2, include_bias=False)

X_poly = poly.fit_transform(X)
features_names = poly.get_feature_names_out(input_features=X.columns)

train_df = pd.DataFrame(X_poly, columns = features_names)
```

위 코드는 원본 피처 세트 X를 PolynomialFeatures를 사용하여 원본 피처의 다항 조합을 생성한다.

 ‘degree=2’는 2차 다항식 피처를 생성함을 의미하며 ‘include\_bias=False’파라미터는 변환된 피처 셋에 상수항을 추가하지 않도록 한다. 생성된 X\_poly에는 원본 피처, 피처의 제곱, 그리고 피처 간의 상호작용 항이 포함된다.

## 유의사항
PolynomialFeatures를 사용해 변환된 피처는 직접 사용될 수는 있으나 모든 경우에 자동으로 모델의 예측 성능을 향상시킴을 보장하지는 않는다. 따라서 피처 생성 전에는 타겟 변수와 상관 관계 분석을 통해 유의미한 변환 여부를 결정해야한다.

또한 생성된 피처들은 기존 변수들과의 상관 관계를 분석하여 모델에 도움이 되지 않거나 오버피팅을 유발할 수 있는 피처를 식별하여 모델의 일반화 능력을 향상을 꾀해야한다. 특히나, 고차 다항식 피처는 변수 간의 상호작용을 복잡하게 만들 가능성이 있다.