---
layout: post
title: Outlier Scan
date: 2025-02-04 20:58:00
description: 이상치의 탐지
tags: Z-Score, IQR, DBSCAN, LOF
categories: ML
pretty_table: true
---

# 이상치 탐지
# 이상치란?
데이터 세트 내에서 다른 값들과 현저하게 다른 데이터를 말한다. 데이터 분석에서 이상치를 제대로 파악하고 적절하게 다루는 것은 데이터의 질을 높이고 정확한 분석 결과를 얻기 위해 중요하다.

## 이상치의 발생 이유
1. 인간적인 실수(Human Error)
2. 데이터 자체의 손상
3. 예외적인 경우

## 이상치의 유형
1. 단변량 이상치
단 하나의 특징만 보아 탐지하는 유형이다. 평균적인 데이터 포인트에서 너무 멀리 떨어져 있는 경우를 말한다.
2. 다변량 이상치
여러 특징을 함께 보아 찾는다. 대부분의 사람들은 키 대비 몸무게가 유사하지만, 어떤 특정한 사람은 키에 비에 몸무게가 너무 적거나 많은 경우가 발생할 수 있다. 이런 경우를 다변량 이상치라고 한다.

## 이상치가 미치는 영향
1. 예측의 오차가 커진다.
2. 데이터의 일반적인 흐름이 깨진다.
3. 결과의 치우침이 발생할 수 있다.
4. 분석의 규칙들이 흔들린다.

# 이상치 탐지
## 단변량 이상치
### Z-Score
**Z-Score**는 데이터에서 표준 편차를 활용해 이상치를 감지하는 간단하고 강력한 방법이다.
Z-Score는 데이터 포인트가 데이터 세트의 평균으로부터 얼마나 떨어져 있는지를 측정한다. 이 방법은 데이터 세트 내에서 각 데이터 포인트의 상대적 위치를 수치화하여, 데이터 포인트가 평균적인 범위 내에 있는지, 아니면 이상치를 가지는지 판단하는 데 사용된다.
$$z=\frac{x-\mu}{\sigma}$$
$x$ : 데이터 포인트
$\mu$ : 평균
$\sigma$ : 표준편차
#### Z-Score의 장단점

| 장점            | 단점                |
| ------------- | ----------------- |
| 간단하고 직관적      | 정규 분포 의존성         |
| 표준화된 점수       | 극단값에 민감           |
| 정규 분포 데이터에 적합 | 모든 이상치의 식별 불가 가능성 |
| 확장성           | 이진 결정의 어려움        |

#### Z-Score의 해석

| Z-Score | 해석                    |
| ------- | --------------------- |
| Z = 0   | 데이터 포인트가 평균값에 정확히 일치함 |
| Z \> 0  | 데이터 포인트가 평균값보다 높음     |
| Z \< 0  | 데이터 포인트가 평균값보다 낮음     |

Z-Score가 $\pm2$또는 $\pm3$정도의 매우 높거나 낮은 값은 데이터 세트에서 이상치일 가능성이 높다고 간주된다.

```python
def out_zscore(data, threshold=3):
	mean = np.mean(data)
	std = np.std(data)
	zscore = [(x-mean)/std for x in data]
	outliers = [x for x in data if np.abs((x - mean/std) > threshold]
	return zscores, len(outliners)

zscores, num_outliers = out_zscore(X_train)

# z score를 통해 계산한 이상치의 갯수
print("Total number of outliers are", num_outliers)

# 이상치의 분포 시각화
plt.figure(figsize = (10,5))
sns.distplot(zscores)
plt.axvspan(xmin = 3, xmax = max(zscores), alpha=0.2, color = 'red')
plt.show
```

#### 방법1. Z-Score 직접 계산 후 이상치 제거
각 데이터 포인트의  Z-Score를 수동으로 계산하고, 설정한 임계값을 넘는 데이터 포인트를 이상치로 판단하고 제거할 수 있다.
```python
Z_train = X_train.copy()
mean_train = Z_train['columnname'].mean()
std_train = Z_train['columnname'].std()

threshold = 3

#Train 데이터로 Z-점수 계산 및 이상치 제거
Z_train['z_score_column'] = (Z_train['columnname'] - mean_train) / std_train
train_no_outliers = Z_train[Z_train['z_score_column'].abs() <= 3]

train_no_outliers = train_no_outliers.drop('z_score_column', axis = 1)
train_no_outliers.shape
```
#### 방법2. Scipy를 활용하기
Scipy 라이브러리의 Stats 모듈은 Z-Score 계산을 자동화하는 함수를 제공하며, 마찬가지로 설정한 임계값을 넘는 데이터 포인트를 식별하고 제거할 수 있다.
```python
from scipy import stats

Z_scipy_train = X_train.copy()

# Train 데이터에 대해 Z-score 계산
Z_scipy_train['z_score_column'] = stats.zscore(Z_scipy_train['columnname'])

# 임계값 설정
threshold = 3

# 임계값을 기반으로 Train 데이터에서 이상치 제거
train_no_outliers = Z_scipy_train[Z_scipy_train['z_score_column'].abs() <= threshold]

# 임시 Z-score 컬럼 제거
train_no_outliers = train_no_outliers.drop('z_score_column', axis=1)
train_no_outliers.shape
```
### IQR(InterQuartile Range, 사분범위)
**IQR**은 데이터의 중앙값을 기준으로 하여 ‘정상 범위’를 벗어나는 데이터 포인트를 찾아낸다. Q1, Q3 (각각 제1사분위수와 제3사분위수)를 계산하고 이를 기반으로 IQR을 구한 후, 이상치를 탐지한다. 이때 IQR은 $Q3-Q1$으로 계산되며, 이는 데이터의 중간 범위에 대한 전반적 퍼짐 정도를 나타낸다.
이상치를 식별하기 위해 IQR을 사용하여 상하한 경계를 설정하는데, 하한 경계는 $Q1-1.5*IQR$로, 상한 경계는 $Q3+1.5*IQR$로 계산된다.
#### IQR의 장점

| 장점            | 단점         |
| ------------- | ---------- |
| 극단치에 대한 강한 내성 | 정보 손실의 가능성 |
| 직관적 이해        | 임의의 임계값 설정 |
| 비모수적 접근       |            |

#### 방법1. Quantile함수의 활용
pandas라이브러리의 quantile 함수를 사용하여 Q1과 Q3를 계산하고 IQR을 구한다.
```python
def out_iqr(data):
    Q1 = data.quantile(0.25)
    Q3 = data.quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return lower_bound, upper_bound

# 'columnname' 열의 이상치를 찾기 위한 조건
lower_bound, upper_bound = out_iqr(X_train['columnname'])

# 이상치를 각각의 조건으로 찾음
lower_outliers = X_train[X_train['columnname'] < lower_bound]
upper_outliers = X_train[X_train['columnname'] > upper_bound]

# 각각의 이상치 개수 계산
num_lower_outliers = len(lower_outliers)
num_upper_outliers = len(upper_outliers)

print("Number of lower outliers in 'columnname' column:", num_lower_outliers)
print("Number of upper outliers in 'columnname' column:", num_upper_outliers)

lower_bound, upper_bound = out_iqr(X_train['columnname'])
train_no_outliers_iqr = X_train[(X_train['columnname'] >= num_upper_outliers) & (X_train['columnname'] <= num_lower_outliers)]

print("Shape of train data after removing outliers using IQR:", train_no_outliers_iqr.shape)
```
#### 방법2. Percentile함수의 활용
NumPy라이브러리의 percentile 함수를 사용하여 동일한 백분위수를 계산하고, IQR을 구한다.
```python
Q1 = np.percentile(X_train['columnname'], 25)
Q3 = np.percentile(X_train['columnname'], 75)

IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

train_no_outliers_iqr_np = X_train[(X_train['columnname'] >= lower_bound) & (X_train['columnname'] <= upper_bound)]

print("Shape of train data after removing outliers using NumPy's percentile:", train_no_outliers_iqr.shape)
```

## 다변량 이상치
### DBSCAN(Density-Based Spatial Clustering of Applications with Noise)
**DBSCAN**은 데이터 포인트들을 그룹화해서 이상치를 식별하는데 사용되는 클러스터링 알고리즘이다. 데이터 포인트의 밀도를 기반으로 하며, 주변 데이터 포인트와의 관계를 고려해 이상치를 찾아낸다.

1. 핵심 포인트(Core Points)
**핵심 포인트**는 “주변지역(eps 거리 내)에 일정 수 (min\_samples) 이상의 이웃 포인트가 있는 데이터 포인트이다. 이 포인트들은 클러스터링 과정에서 클러스터의 ‘핵심’을 형성한다.
2. 경계 포인트(Border Points)
**경계 포인트**는 “핵심 포인트의 이웃이지만, 그 자체로는 핵심 포인트의 조건을 충족하지 않는 포인트”이다.
3. 노이즈 포인트(Noise Points)
노이즈 포인트는 “핵심/경계 포인트가 아닌 모든 포인트”로, 어떤 클러스터에도 속하지 않는다. 데이터 셋에서 이상치를 나타낸다.

DBSCAN은 데이터의 공간에서 각 데이터 포인트 주변에 **엡실론**반경의 원을 형성하고, 이를 기반으로 상술한 세가지 데이터 포인트로 분류한다.
이때 고려해야 하는 두 가지 주요 매개변수는 **eps(엡실론)**과 **minPoints(최소 데이터 포인트 수)**이다. 엡실론은 데이터 포인트 주변에 형성되는 원의 반경으로, 데이터 포인트 간의 밀도를 정의하며, minPoints는 해당 원 내부에 존재해야 하는 최소 데이터 포인트 수로, 해당 데이터 포인트를 핵심 포인트로 분류하기 위한 조건이다.

#### DBSCAN의 활용
1. 데이터 준비 
2. 데이터 표준화
3. DBSCAN 클러스터링

```python
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

# 데이터 준비
DBSCAN_train = X_train.copy()

numeric_columns = ['공복 혈당', '중성 지방']
data_numeric = DBSCAN_train[numeric_columns]

# 데이터 표준화
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data_numeric)

# DBSCAN 클러스터링 (eps와 min_samples는 상황에 따라 조정 필요)
db = DBSCAN(eps=0.5, min_samples=5).fit(data_scaled)  
labels = db.labels_

pd.Series(labels).value_counts()
```

이때 **-1**은 이상치를 나타내고, 나머지 양의 정수 값은 서로 다른 클러스터를 나타낸다.

#### 이상치 제거
데이터 프레임에 새로운 열(clusters)를 추가하고, 클러스터링 결과인 clusters\_sample의 값을 이 열에 할당한다. 이후 값이 -1이 아닌 데이터 포인트들만을 선택하여 새로운 데이터 프레임에 저장한다. 

```python
clusters_sample = db.fit_predict(data_scaled)

DBSCAN_train['clusters'] = clusters_sample
sample_no_outliers = DBSCAN_train[DBSCAN_train['clusters'] != -1]

display(sample_no_outliers.head(3))
display(f"이상치가 아닌 데이터 포인트들의 수: {len(sample_no_outliers)}")
```

#### 이상치 시각화
```python
plt.figure(figsize=(10, 6))
# 정상 데이터 포인트 시각화
# 정상 데이터 포인들을 scatter plot에 표시한다. c=DBSCAN_train['clusters']는 클러스터 레이블에 따라 색상을 달리하여 표시하고, cmap은 색상 맵을 지정한다.
plt.scatter(DBSCAN_train['공복 혈당'], DBSCAN_train['중성 지방'], c=DBSCAN_train['clusters'], cmap='viridis', label='Clusters')
# 이상치 시각화
# 이상치로 분류된 데이터 포인트들을 빨간색으로 scatter plot에 표시한다. 이상치는 DBSCAN_train['clusters'] == -1 조건을 사용하여 선택된다.
plt.scatter(DBSCAN_train[DBSCAN_train['clusters'] == -1]['공복 혈당'], 
            DBSCAN_train[DBSCAN_train['clusters'] == -1]['중성 지방'], 
            color='red', label='Outliers')

plt.title('공복 혈당과 중성 지방의 scatter plot')
plt.xlabel('공복 혈당')
plt.ylabel('중성 지방')
plt.legend()
plt.grid(True)
plt.show()
```

#### DBSCAN을 활용한 이상치 탐지의 장단점

| 장점             | 단점           |
| -------------- | ------------ |
| 모델 가정 불필요      | 파라미터 설정      |
| 클러스터 개수 설정 불필요 | 변수 스케일의 민감성  |
| 이상치에 강건        | 고차원 데이터의 어려움 |
| 노이즈와 클러스터 구분   | 밀도 변화에 민감    |
| 데이터 밀도에 따른 유연성 | 클러스터 크기의 다양성 |

### LOF(Local Outlier Factor)
**LOF**는 데이터 포인트의 ‘지역적 밀도’를 측정하고, 이를 주변 포인트의 밀도와 비교하여 이상치를 탐지한다. 주변 데이터 포인트와의 밀도 비율을 계산함으로써 이상치를 식별하며, 데이터의 지역적 밀도가 다를 때 효과적이다.

#### LOF 알고리즘의 작동 원리
- 이웃 개수 설정 : 고려할 각 데이터 포인트의 이웃 수(n\_neighbors)를 결정해야 한다. 이웃의 수는 알고리즘이 얼마나 지역적으로 데이터를 보는지 결정한다.
- 지역 밀도 계산 : 각 데이터 포인트의 지역 밀도를 계산한다. n\_neighbors개의 가장 가까운 이웃까지의 거리를 기반으로 하며, 이웃들 사이의 평균 거리로 표현할 수 있다.
- LOF 점수 계산 : 각 데이터 포인트의 LOF 점수가 1에 가까우면 해당 데이터 포인트는 이웃들과 비슷한 밀도를 가지고 있다고 볼 수 있다. 점수가 1보다 많이 높다면 밀도가 낮은 영역에 위치해 있으며, 이는 이상치일 가능성이 높음을 의미한다.
- 이상치 결정 : LOF 점수가 특정 임곗값 이상인 데이터 포인트를 이상치로 분류한다.
- 이상치 제거

#### LOF 알고리즘의 활용
```python
from sklearn.neighbors import LocalOutlierFactor

# 데이터 준비
LOF_train = X_train.copy()
numeric_columns = ['공복 혈당', '중성 지방']
data_numeric = LOF_train[numeric_columns].values  

# Local Outlier Factor 모델 생성
clf = LocalOutlierFactor(n_neighbors=50, contamination='auto')

# 이상치 탐지
labels = clf.fit_predict(data_numeric)
pd.Series(labels).value_counts()
```

values 함수를 통해 데이터를 numpy 배열로 변환한 후, 알고리즘을 데이터에 적용한다.
이때 정상 데이터 포인트는 1로, 이상치는 -1로 레이블된다.

#### LOF의 이상치 시각화
```python
plt.figure(figsize=(10, 6))
# '공복혈당'을 x, '중성 지방'을 y에 표시한다.
#c 값은 색상을 결정하는데, outliers_lof열의 값을 사용하여 이상치와 정상치를 구분한다.
plt.scatter(LOF_train['공복 혈당'], LOF_train['중성 지방'], c=LOF_train['outliers_lof'], cmap='viridis', label='Clusters')

# 이상치 데이터 포인트만 빨간색으로 표시한다.
plt.scatter(LOF_train[LOF_train['outliers_lof'] == -1]['공복 혈당'], 
            LOF_train[LOF_train['outliers_lof'] == -1]['중성 지방'], 
            color='red', label='Outliers')

plt.title('공복 혈당과 중성 지방의 scatter plot')
plt.xlabel('공복 혈당')
plt.ylabel('중성 지방')
plt.legend()
plt.grid(True)
plt.show()
```

#### LOF를 활용한 이상치 탐지의 장단점

| 장점              | 단점             |
| --------------- | -------------- |
| 지역적 밀도 차이 기반    | 파라미터 선택의 어려움   |
| 다양한 데이터셋에 적용 가능 | 고차원 데이터에 대한 한계 |
| 이상치의 순위화        | 계산 복잡성         |
| 파라미터 조정의 유연성    | 데이터 스케일에 민감    |
