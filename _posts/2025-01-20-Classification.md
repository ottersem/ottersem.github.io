---
layout: post
title: Classification
date: 2025-01-20 23:45:00
description: 분류 문제의 정의와 종류
tags: Binary_Classification, Multi-Class_Classification
categories: ML
pretty_table: true
toc:
  beginning: true
---

# 분류 문제란?
분류 문제는 예측하고자 하는 결과가 여러 카테고리 중 하나에 속하는 경우를 다룬다.
## 이진 분류(Binary Classification)
이진 분류는 ‘예’ 또는 ‘아니오’와 같이 두 가지 범주 중 하나를 선택하는 문제이다. 이진 분류 문제를 해결할 때에는 주어진 입력 데이터가 두 범주 중 하나에 속하는지를 결정하는 과정이 필요하다. 이를 위해 모델은 주로 데이터의 특성을 ‘예’ 또는 ‘아니오’와 같은 결정을 내릴 수 있는 경계를 학습한다. 대표적인 예로 로지스틱 회귀 알고리즘을 들 수 있다.

## 다중 분류(Multi-Class Classification)
다중 분류는 세 개 이상의 범주 중에서 하나를 선택해야 하는 문제이다. 이는 여러 선택지 중 가장 적합한 하나를 찾아내는 과정을 포함한다.
다중 분류 문제를 해결할 때는 각 범주에 속할 확률을 계산하고, 가장 높은 확률을 가진 범주를 해당 데이터 포인트의 범주로 선택하는 방법이 일반적이다. 이 과정에서 소프트맥스 함수를 사용해 각 클래스에 대한 확률을 계산한다.

## scikit-learn의 랜덤 포레스트를 이용한 간략한 분류 문제 해결
```python
from sklearn.ensemble import RandomForestClassifier

model_rf = RandomForestClassifier(random_state = 42)

model_rf.fit(train_x, train_y)

predict = model_rf.predict(test) 
```

## 모델 성능 평가 지표(Metric)
### 성능 평가 지표란?
성능 평가 지표는 모델의 성능을 평가하는 정량적이고 객관적인 평가 기준을 말한다. 성능 평가 지표는 머신러닝 워크플로우의 전 과정에 걸쳐서 사용된다. 각 단계에서 수행된 데이터 셋의 수정이 모델 성능에 미치는 영향을 평가하기 위해, 성능 지표들은 모델의 성능을 정확하고 객관적으로 측정할 수 있는 기준을 제공한다.

### 분류 모델의 평가 지표(정확도)
정확도는 분류 모델의 예측 성능을 나타내는 기본적인 지표로, 모델의 예측력이 얼마나 되는지를 나타낸다. 올바르게 예측된 데이터 포인트의 수를 전체 데이터 포인트의 수로 나눈 값으로 계산된다.

$$정확도(Accuracy) = \frac{올바르게\ 예측된\ 데이터}{전체\ 데이터}$$

### 혼동 행렬(Confusion Matrix)
혼동 행렬은 실제 레이블과 모델이 예측한 레이블의 조합을 행렬 형태로 나타낸 것이다. 혼동 행렬 표현을 통해 분류 모델의 성능을 좀 더 세분화하여 직관적으로 통찰 할 수 있다.
#### 양성과 음성
**양성(Positive)**은 일반적으로 관심있는 클래스를 의미하며  **음성(Negative)**은 그 반대를 의미한다.
#### 참과 거짓
**참(True)**은 모델이 예측한 결과가 실제로 맞는지를 의미하며, **거짓(False)**는 그 반대를 의미한다.

위 네 가지 기호를 정리하면 **TP, TN, FP, FN**으로 나타낼 수 있다.
- TP : 양성 클래스를 양성으로 예측한 경우
- TN : 음성 클래스를 음성으로 예측한 경우
- FP : 음성 클래스를 양성으로 **잘못** 예측한 경우
- FN : 양성 클래스를 음성으로 **잘못** 예측한 경우

#### 정밀도(Precision)
정밀도는 모델이 양성으로 예측한 항목들 중 실제로 양성인 항목의 비율을 측정한다. 이 지표는 거짓 양성의 수를 최소화하고자 할 때 중요하다. 특히나 잘못된 의사결정에 의한 손실을 최소화 하고자 하는 것이 우선순위 일때에는 가장 중요한 성능지표이다.

$$Precision = \frac{TP}{TP+FP}$$

#### 재현율(Recall)
재현율은 양성 클래스 중 올바르게 양성으로 예측한 비율을 측정한다. **실제 양성 케이스를 놓치지 않는 것이 중요할 때** 핵심적인 지표이다.

$$Recall = \frac{TP}{TP+FN}$$

#### 절충(Trade-Off)과 F1 점수(F1 Score)
일반적으로 정밀도를 높이면 재현율을 희생하고, 재현율을 높이려면 그 반대의 경향이 나타난다. 이때 F1 점수는 이러한 절충 관계의 균형을 찾는데 도움을 주는 지표로서, 두 지표의 조화로운 평균을 제공해 모델이 양쪽 지표에서 균등한 성능을 내고 있음을 보장한다. 특히나 양성 예측의 정확성과 양성 케이스의 누락을 동시에 최소화하고자 할 때 중요하다.

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# 학습 데이터와 검증 데이터로 분할
X_train, X_val, y_train, y_val = train_test_split(train_x, train_y, test_size=0.25, random_state=42)

# RandomForestClassifier 모델 생성 및 학습
clf_wine_RF = RandomForestClassifier(random_state=42)
clf_wine_RF.fit(X_train, y_train)

# 검증 데이터에 대한 예측 수행
y_pred = clf_wine_RF.predict(X_val)

# 성능 지표 계산 및 출력
# 성능 지표 계산 및 출력
accuracy_wine_RF =  accuracy_score(y_val, y_pred)
precision_wine_RF =  precision_score(y_val, y_pred, average='macro')
recall_wine_RF =  recall_score(y_val, y_pred, average='macro')
f1_score_wine_RF =  f1_score(y_val, y_pred, average='macro')

display(f"Accuracy:{accuracy_wine_RF}")
display(f"precision:{precision_wine_RF}")
display(f"recall: {recall_wine_RF}")
display(f"f1_score: {f1_score_wine_RF}")

```
