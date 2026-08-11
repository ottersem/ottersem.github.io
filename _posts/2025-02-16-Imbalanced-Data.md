---
layout: post
title: Imbalanced Data
date: 2025-02-15 17:33:00
description: 데이터 불균형
tags: Under_Sampling, Over_Sampling, RandomOverSampling, SMOTE, RandomUnderSampling, NearMiss
categories: ML
pretty_table: true
toc:
  - name: 데이터 불균형
  - name: 오버샘플링
    subsections:
      - name: 단순 무작위 복제
      - name: SMOTE
  - name: 언더샘플링
    subsections:
      - name: 무작위 언더 샘플링
      - name: NearMiss
---

# 데이터 불균형

**데이터 불균형**은 한 클래스의 데이터가 다른 클래스에 비해 훨씬 많을 때 발생한다. 불균형은 모델 학습 과정에 큰 영향을 미쳐, 특정 유형의 데이터에 과도하게 적응하게 만들고 다른 유형을 무시하게 한다.

## 데이터 불균형이 가져오는 문제

- 소수 클래스의 과소평가
- 모델 과적합
- 일반화 능력 저하

## 불균형을 균형있게 만드는 방법들

- 언더 샘플링(Undersampling)
  다수 클래스의 샘플을 줄여, 희귀 사건을 모두 선택하고 풍부한 사건들을 적절히 추출하여 데이터 셋을 균일하게 만든다. 이를 통해 큰 데이터셋에서 중요하지 않은 정보를 줄여 모델이 핵심 패턴에 더 집중할 수 있게 도와준다.
- 오버 샘플링(Oversampling)
  소수 클래스의 샘플을 인위적으로 늘려, 무든 클래스가 비슷한 수의 샘플을 가지도록 한다. 이를 통해 모델이 소수 클래스에 대해 더 많은 정보를 학습하도록 하여, 보다 균형 잡힌 예측을 가능하게 한다.

# 오버 샘플링

## 단순 무작위 복제

**단순 무작위 복제**는 데이터 불균형 해결을 위해 **소수 클래스의 샘플들을 단순히 복사하여 늘리는 접근 방식**을 취한다.

```python
from imblearn.over_sampling import RandomOverSampler

ros = RandomOverSampler(random_state=42)
X_resampled, y_resampled = ros.fit_resample(X_train, y_train)

print("오버샘플링 적용 후의 클래스 분포:\n", y_resampled.value_counts())
```

### 단순 무작위 복제의 장단점

|        장점        |         단점         |
| :----------------: | :------------------: |
| 간단하고 쉬운 구현 |     과적합 위험      |
|     빠른 처리      |  데이터 다양성 부족  |
|  데이터 분포 유지  | 실제 분포와의 불일치 |

위와 같은 장단점을 토대로, 단순 무작위 복제를 사용할 때는 모델의 성능과 일반화 능력을 주의 깊게 모니터링하고, 필요에 따라 다른 오버 샘플링 기법을 함께 사용하는 것도 고려해 볼 수 있다.

## SMOTE(Synthetic Minority Over-sampling Technique)

**SMOTE(합성 소수 오버샘플링 기법)**은 **기존 소수 클래스 인스턴스 간의 특성을 보간하여 새로운 합성 샘플을 생성**한다.

### SMOTE의 합성 샘플 생성 과정

1. **이웃 선택** :
   소수 클래스의 특정 인스턴스를 선택하고, 가장 가까이 있는 다른 소수 클래스 인스턴스들 중에서 하나 이상을 ‘이웃’으로 선택한다.
2. **임의의 이웃 선택** :
   이 중에서 하나의 이웃을 무작위로 선택한다. 데이터 셋에서 다양성을 보장하기 위해 무작위성을 도입하는 절차로, 선택된 이웃은 원본 인스턴스와 유사하지만, 동일하지는 않다.
3. **특성 차 계산** :
   선택된 이웃과 원본 인스턴스 간의 각 특성 값 차이를 계산한다. 이 차이는 새로운 인스턴스를 생성하는데 사용될 **’벡터’**를 나타낸다.
4. **새 인스턴스 생성** :
   계산된 특성 차이에 0에서 1 사이의 랜덤 스칼라 값을 곱한다. 이 절차는 새로운 합성 인스턴스가 원본 인스턴스와 선택된 이웃 사이의 **‘중간점’**에 위치하도록 한다.
5. **합성 인스턴스 추가** :
   계산된 새 특성 값을 원본 인스턴스의 특성 값에 추가하여 새로운 합성 인스턴스를 생성한다.

> SMOTE의 데이터 생성 방식은 데이터셋에 다양성을 추가하고, 모델이 소수 클래스의 특징을 더 잘 학습하도록 돕기 위함이다.

### SMOTE의 장단점

|        장점        |         단점          |
| :----------------: | :-------------------: |
| 데이터 다양성 증가 | 잘못된 샘플 생성 위험 |
|    과적합 감소     |      계산 복잡성      |
|   모델 성능 향상   |     적용의 어려움     |

SMOTE는 데이터 불균형 문제에 효과적이지만, 데이터의 특성과 문제의 복잡성을 고려해야 한다.

### SMOTE 적용

```python
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_smote, y_smote = smote.fit_resample(X_train, y_train)

print("오버샘플링 적용 후의 클래스 분포:\n", y_smote.value_counts())
```

### SMOTE 시각화

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 피처 선택
feature1 = '이전 거래와의 시간 간격'
feature2 = '거래 금액'

# 원본 데이터 분포 시각화
plt.figure(figsize=(16, 5))

plt.subplot(1, 2, 1)
sns.scatterplot(x=X_train.loc[:, feature1], y=X_train.loc[:, feature2], hue=y_train)
plt.title('Original Data')

# SMOTE 방법으로 오버샘플링한 데이터 시각화
plt.subplot(1, 2, 2)
sns.scatterplot(x=X_smote.loc[:, feature1], y=X_smote.loc[:, feature2], hue=y_smote)
plt.title('SMOTE')

plt.show()
```

# 언더 샘플링

## 무작위 언더 샘플링

**Random UnderSampling**은 **다수 클래스에서 데이터 포인트를 무작위로 선택하여 제거** 함으로써 소수 클래스와 다수 클래스의 균형을 맞춘다. 간단하고 직관적이라는게 장점이지만, 무작위로 데이터를 제거하는 과정에서 중요 정보의 손실이 발생할 수 있다는 점이 단점이다.
따라서 **데이터 셋의 크기가 매우 크고, 중요 정보의 손실이 상대적으로 덜 중요한 경우에 적합하다.**

### 무작위 언더 샘플링 적용

```python
from imblearn.under_sampling import RandomUnderSampler

# 언더샘플링 적용
rus = RandomUnderSampler(random_state=42)
X_under, y_under = rus.fit_resample(X_train, y_train)

# 결과 출력
print("언더샘플링 적용 후의 클래스 분포:\n", y_under.value_counts())
```

### 무작위 언더 샘플링의 장단점

|      장점       |        단점        |
| :-------------: | :----------------: |
| 간단함과 접근성 |   중요 정보 손실   |
|   계산 효율성   | 데이터 대표성 저하 |

## NearMiss

**NearMiss**는 다수 클래스의 샘플 중 소수 클래스 샘플과 가장 가까운 것들을 선택하여 보존한다.

| NearMiss(version=**N**) | 설명                                                                                     |
| :---------------------: | ---------------------------------------------------------------------------------------- |
|          N = 1          | 소수 클래스 샘플에 대해 **가장 가까운 다수 클래스 샘플을 선택**한다.                     |
|          N = 2          | 다수 클래스 샘플 중 소수 클래스 샘플과 **가장 가까운 평균 거리**를 가진 샘플을 선택한다. |
|          N = 3          | 소수 클래스 샘플의 이웃을 먼저 찾고, **이웃 중 다수 클래스 샘플을 선택**한다.            |

### NearMiss의 적용

```python
from imblearn.under_sampling import NearMiss

# NearMiss 버전별 적용
nm1 = NearMiss(version=1)
nm2 = NearMiss(version=2)
nm3 = NearMiss(version=3)

X_nm1, y_nm1 = nm1.fit_resample(X_train, y_train)
X_nm2, y_nm2 = nm2.fit_resample(X_train, y_train)
X_nm3, y_nm3 = nm3.fit_resample(X_train, y_train)

# 결과 출력
print("NearMiss-1 적용 후의 클래스 분포:\n", y_nm1.value_counts())
print("NearMiss-1 적용 후의 클래스 분포:\n", y_nm2.value_counts())
print("NearMiss-1 적용 후의 클래스 분포:\n", y_nm3.value_counts())
```

### NearMiss의 장단점

|         장점          |        단점        |
| :-------------------: | :----------------: |
|  클래스 간 균형 개선  |   정보 손실 위험   |
|      과적합 감소      |  선택 기준의 한계  |
| 노이즈 및 이상치 제거 | 데이터 분포의 웨곡 |
|                       |    계산 복잡성     |

### NearMiss 시각화

```python
from imblearn.under_sampling import NearMiss

# NearMiss 버전별 적용
nm1 = NearMiss(version=1)
nm2 = NearMiss(version=2)
nm3 = NearMiss(version=3)

X_nm1, y_nm1 = nm1.fit_resample(X_train, y_train)
X_nm2, y_nm2 = nm2.fit_resample(X_train, y_train)
X_nm3, y_nm3 = nm3.fit_resample(X_train, y_train)

# 결과 출력
print("NearMiss-1 적용 후의 클래스 분포:\n", y_nm1.value_counts())
print("NearMiss-1 적용 후의 클래스 분포:\n", y_nm2.value_counts())
print("NearMiss-1 적용 후의 클래스 분포:\n", y_nm3.value_counts())
```
