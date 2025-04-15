---
layout: distill
title: Car Insurance Fraud Detection
description: Car Insurance Fraud Detection
img: assets/img/GE_project/Thumbnail.jpeg
importance: 1
category: work
toc:
  - name: Introduction
    subsections:
    - name: Problem Statement
    - name: Dataset
    - name: Process
  - name: EDA
  - name: Feature Engineering
  - name: Modeling strategy
  - name: Fitting and Tuning
  - name: Evaluation and Analysis
---

# Introduction
## Problem Statement
본 프로젝트는 DACON에서 주최한 차량 보험 사기 예측 해커톤의 일환으로 수행되었다. 주요 목표는 기존 보험 청구 데이터를 기반으로 사기 가능성이 높은 사례를 분류하는 것이며, 이진 분류 문제로 접근하였다. 특히, 사기 탐지(fraud detection) 문제의 특성 상 **특이도(Specificity)** 즉, 정상인 데이터를 얼마나 정확히 판별하는지가 중요하며, 이 지표를 최적화하는 방향으로 모델을 설계하였다.

## Dataset
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/DataInfo.png" title="DataInfo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

본 해커톤에서 제공한 학습 데이터 셋은 약 1만 3천개의 보험 청구 기록 데이터와 25개의 피처가 포함되었다. 이 중 수치형, 범주형 피처가 혼합되어 있으며. 일부 피처는 불균형 분포와 결측치를 포함하고 있다.

## Process
본 프로젝트의 전체 수행 프로세스는 다음과 같다.
1. EDA : 데이터의 구조, 분포, 이상치 및 결측치 파악
2. Feature Engineering: 의미 있는 변수 생성, 범주형 인코딩, 스케일링 등
3. Modeling Strategy: XGBoost, CatBoost, LightGBM 등 앙상블 기반 모델 적용
4. Fitting & Tuning: Optuna 기반 하이퍼파라미터 튜닝, Soft Voting 앙상블 구성
5. Evaluation & Analysis: Specificity 중심의 평가 지표 분석 및 중요 변수 해석

# EDA
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/outlier.png" title="outlier" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Outliers
</div>

IQR, VIF를 포함해 Z-score 기반 정규화 후 분포를 확인한 결과 다수의 변수에서 극단적 이상치가 존재함이 확인되었다. 다만 이상치라고 판단하기보다는 좌/우로 편향된 값으로 판단하는게 옳다고 생각하여 이상치에 대한 직접적인 스케일링 보다는 피처 엔지니어링을 통해 해결하고자 하였다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/EDA1.png" title="EDA1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Distribution of Numerical Features
</div>

age\_of\_driver, annual\_income, claim\_est\_payout 등 주요 연속형 변수들은 전반적으로 비대칭적 분포를 나타내며 liab\_prct는 0%, 50%, 100%와 같이 특정 값에 급격히 몰리는 경향이 있으며, age\_of\_vehicle 역시 5~7년 사이에 밀집되어 있다.
이상치 및 왜도를 고려하여 스케일링과 변환이 필요한 변수들이 존재하며, 분포 기반 정규화 전처리 작업이 필요하다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/EDA2.png" title="EDA2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Ratio of Categorical Features
</div>

Target 피처인 fraud 레이블은 85:15의 불균형한 이진 분포를 보이며 일부 피처들은 특정 수치에 치우쳐져있음을 알 수 있다. year나 day같은 날짜 관련 변수는 비교적 균등하게 분포해있다.
클래스 불균형으로 인해 SMOTE나 threshold 조정등의 방법이 필요하다. 다만 트리 모델을 사용하여 앙상블을 적용할 예정이므로 SMOTE대신 threshold 조정으로 이를 극복하고자 한다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/EDA3.png" title="EDA3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    수치형 변수별 Fraud 여부에 따른 분포 차이
</div>

age\_of\_driver, annual\_income, claim\_est\_payout에서 사기 건수는 약간 오른쪽으로 치우친 경향을 보인다. 플롯을 통해 일부 피처는 fraud와의 상관관계를 보이며, 특히나 보험료 추정액과 책임 비율이 타겟 변수와 강한 연관을 가진다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/EDA4.png" title="EDA4" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    주요 범주형 변수의 비율 시각화
</div>

대부분의 범주형 변수들이 대체로 2~3개 수준의 고유값을 가지며 비교적 균형 잡힌 분포를 보여주지만, witness\_present\_ind, channel 등은 한 두 개의 값에 매우 치중된 분포를 갖는다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Car_Insurance/EDA/EDA6.png" title="EDA6" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fraud 비율에 따른 범주형 변수별 차이
</div>

marital\_status, address\_change\_ind, accident\_site, channel 등의 변수는 사기 비율 차이가 뚜렷하다. 따라서 범주형 변수는 단순 빈도보다 사기율 차이에 초점을 맞춰 파생 변수를 설계할 필요가 있다.