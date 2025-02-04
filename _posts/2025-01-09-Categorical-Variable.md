---
layout: post
title: Categorical Variable
date: 2024-10-09 20:24:00
description: 범주형 변수
tags: Categorical_Variable, Nominal_Variable, Ordinal_Variable
categories: ML
pretty_table: true
toc:
  beginning: true
---

# 범주형 변수란?
범주형 변수는 주로 ‘문자열 타입’으로 표현되며, 데이터 프레임에서 ‘object’, ‘category’로 분류된다. 또한 범주형 변수는 명목형과 순서형 변수로 나뉘며, 각각의 변수 유형은 데이터의 해석과 처리 방식에서 중요한 차이를 보인다. 이러한 범주형 변수들을 효과적으로 처리하기 위해서는 데이터 분석과 모델링 과정에서 이들을 수치형 데이터로 변환하는 ‘인코딩’ 과정을 필수적으로 거쳐야한다.

## 명목형(Nominal) 변수
> 순서, 크기의 의미가 없는 변수 (혈액형, 색상 등…)

명목형 변수는 서로 비교 가능한 등급이나 순서, 크기의 의미가 없는 독립적인 범주들로 구성된다. 이러한 변수들은 서로 간의 상위나 하위 관계를 가지지 않는다.

### One-Hot Encoding
원-핫 인코딩은 명목형 범주형 변수를 이진 특성으로 변환하는 방법이다. 그러나 각 변수가 다수의 고유 범주를 가지는 경우 문제를 일으킬 수 있다.
```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder  

# 원본 데이터 복사
train_ex1 = train_used_car.copy()

# OneHotEncoder 객체를 생성한다. 파라미터 sparse_outpu = False는 인코딩된 데이터를 밀집 배열 형태로 반환하도록 설정한다.
encoder = OneHotEncoder(sparse_output = False)
# Brand와 Model에 대해 원-핫 인코딩을 수행한다. 순서형 범주형 변수 인코딩 때와 마찬가지로 fit은 인코더를 데이터에 맞추고 transform은 데이터를 변환한다.
train_encoded = encoder.fit_transform(train_ex1[['Brand','Model']]) 

# 인코딩 된 데이터의 컬럼 이름을 가져온다.
encoded_columns = encoder.get_feature_names_out(['Brand', 'Model'])
# 인코딩 된 데이터를 데이터프레임으로 변환하고, 이때 앞 코드에서 추출한 컬럼 이름을 사용한다.
train_encoded_df = pd.DataFrame(train_encoded, columns=encoded_columns)

#원본 데이터프레임과 인코딩 된 데이터프레임을 합친다.
train_ex1 = pd.concat([train_ex1, train_encoded_df], axis=1).drop(['Brand', 'Model'], axis=1)

display(encoded_columns)
display(train_ex1.head())
```
위 코드는 Brand와 Model이라는 범주형 컬럼을 원-핫 인코딩하는 과정을 보여준다.

#### handle_unknown 파라미터
**handle\_unknow** 파라미터는 훈련 데이터에 없는 범주가 테스트 데이터에 나타날 때 이를 무시하도록 설정한다. 실시간 데이터를 다루거나, 데이터가 지속적으로 업데이트되는 상황에서 새로운 범주가 테스트 데이터셋에 나타났을때 오류를 발생시키지 않도록 하는 반면, 새로운 범주에 대해 학습하지 못한다는 것을 의미한다. 모델의 예측 정확도에 영향을 줄 수 있으며, 중요한 범주가 무시될 수 있다.

```python
encoder = OneHotEncoder(sparse_output = False, handle_unknown = 'ignore')
```

#### 더미 변수의 함정
원-핫 인코딩을 적용해 3개 이상의 컬럼을 변환하면 **‘굳이 컬럼을 세 개 까지 사용하지 않아도 괜찮지 않은가?’라는 의문이 들 수도 있다.** 만약 어떤 하나의 컬럼이 0의 값을 가지면 자동적으로 나머지 두 개의 컬럼값이 1이 될 가능성이 높기 때문이다. 이렇게 컬럼 간 상호 의존적인 관계가 형성되는 것을 **‘다중공선성’**이라고 한다.
scikit-learn의 OneHotEncoder 클래스의 drop 파라미터를 활용해 이런 문제를 효과적이게 해결할 수 있다.
```python
encoder = OneHotEncoder(sparse_output = False, drop = 'first', handle_unknow = 'ignore')
```
drop파라미터를 통해 각 범주형 변수에서 특정한 범주를 제거하여 더미 변수의 함정을 방지할 수 있다.
### Binary Encoding
바이너리 인코딩은 원핫인코딩의 문제를 해결하는데 적합한 대안이다. 범주형 정보를 보존하면서도 변수의 수를 효과적으로 관리한다.
 바이너리 인코딩은 각 범주를 레이블 인코딩으로 변환한 후, 이진수로 표현하여 범주의 수에 비례하지 않는 고정된 길이의 열을 생성한다.

```python
import category_encoders as ce

...
encoder = ce.BinaryEncoder(cols=['columnname'])
...
```


## 순서형(Ordinal) 변수
> 순서, 크기의 의미가 내포된 변수 (만족도, 교육수준)

순서형 변수는 범주 사이에 명확한 순서가 있어 등급을 나타낼 수 있다.

### Label Encoding
Label Encoding은 scikit-learn 라이브러리의 preprocessing 모듈에 있는 Label Encoder 클래스로 구현할 수 있다. 이 클래스는 범주형 변수에 나타나는 각 범주를 알파벳 순/ 또는 데이터에 처음 나타나는 순서에 따라 정렬한 후, 0부터 시작하는 연속적인 정수 값으로 변환한다. 이때, 할당되는 정수의 범위는 범주의 총 개수에 따라 결정되며, 모델은 이렇게 변환된 숫자형 표현을 사용하여 데이터를 분석한다.

### 학습 데이터셋과 테스트 데이터셋의 인코딩
#### 학습 데이터셋 : fit\_transform
fit\_transform 함수는 fit과 transform을 동시에 수행한다.
- fit : 각 범주를 고유한 정수 값에 매핑하는 방법을 **학습**한다. 주어진 ‘column’의 각 교유한 값에 하나씩 정수 값을 할당한다.
- transform : 학습된 매핑을 사용하여 실제 대이터의 범주들을 해당 정수 값으로 변환한다.

학습 데이터셋에서는 처음으로 인코딩을 수행하므로, LabelEncoder에 범주를 어떻게 정수로 변환할지 학습시키고, 실제 데이터에 이 매핑을 적용한다.

```python
from sklearn.preprocessing import LabelEncoder
import numpy as np
categories = ['Brand', 'Model', '정비 이력등급']

label_encoders = {}

for col in categories:
    le = LabelEncoder()
    train_used_car[col] = le.fit_transform(train_used_car[col])
    label_encoders[col] = le
    
display(train_used_car.head())

for col in categories:
    display(f"{col} :")
    for i in range(len(label_encoders[col].classes_)):
        display(f"{label_encoders[col].classes_[i]} : {i}")
        
##다시 실행하면 f"{label_encoders[col].classes_[i]}가 i로 변환됨... 왜?
##처음 실행했을때 인코딩 되었고, 인코딩 되기 전의 label들을 label_encoders에 저장해두는데, 두 번째 실행하면 인코딩 된 label을 다시 label_encoders에 덮어써서 그렇다
```

#### 테스트 데이터셋 : transform
- transform : 학습시에 이루어진 fit 단계를 통해 학습된 매핑을 사용하여 데이터의 범주를 정수 값으로 변환한다.
이 때 fit을 다시 사용하면, 테스트 데이터셋의 범주에 대해 새로운 매핑을 학습하게 되어 학습 데이터셋에서 사용된 매핑과 일치하지 않게된다.

#### 학습 데이터에 없는 범주 처리하기
테스트 데이터셋에 학습 데이터셋에는 없던 새로운 범주가 포함되어 있을 수 있다. 이런 경우 모델은 이를 어떻게 처리해야 할지 모르고 “학습 데이터에 없는 범주”라고 한다.
```python
test_ex2 = test_used_car.copy()

# train_used_car 데이터셋의 라벨 인코더 클래스에 '기타' 범주를 다시 추가
for le in label_encoders.values():
    le.classes_ = np.append(le.classes_, 'Other')

# 새로운 범주값을 '기타'로 매핑하고 라벨 인코더를 적용하는 과정을 하나의 루프로 합치기
for col in categorical_var:
    # 새로운 값들을 '기타'로 매핑
    test_ex2[col] = test_ex2[col].apply(lambda x: x if x in label_encoders[col].classes_ else 'Other')
    # 라벨 인코더 적용
    test_ex2[col] = label_encoders[col].transform(test_ex2[col])

# 변환된 test_used_car 데이터셋 보여주기
display(test_ex2.head())
```

```python
# pandas category type을 활용한 인코딩
# 순서, 등급의 의미를 담아 인코딩 하는 방법
train_ex3 = train_income.copy()
train_ex3["education"] = train_ex3["education"].astype('category')
train_ex3["education"] = train_ex3["education"].cat.set_categories(['val1', 'val2', 'val3', 'val4'], ordered = True)

train_ex3['education'] train_ex3['education'].cat.codes
train_ex3.head()
display(train_ex3.info())
```

### Label Encoding의 문제점
#### 명목형 변수
고유 범주값에 순서나 등급의 의미가 없는 명목형 변수에 임의의 숫자를 할당하면, 실제로 데이터에 없는 숫자간의 순서나 중요도를 부여하는 문제를 일으킬 수 있다.
#### 순서형 변수
만약 ‘없음’, ‘보통’, ‘정기적’의 세가지를 수동으로 인코딩하면 각각 1,2,3의 값을 가질것이다. 그러나 LabelEncoder를 사용하면 1,0,2로 인코딩 되어버리는데, 결과적으로 ‘없음’이 ‘보통’보다 높은 등급을 의미하는 것처럼 잘못 해석될 수 있다.

#### 해결법 1 : 직접 매핑
범주의 순서를 고려하여 딕셔너리를 활용해 직접 매핑할 수 있다.
```python
order_map = {'low' : 1, 'mid' : 2, 'high' : 3}
data['varname'] = data['varname'].map(order_map)
#or
data['varname'] = data['varname'].replace(order_map)
```

#### 해결법 2 : OrdinalEncoder
OrdinalEncoder는 순서가 있는 범주형 데이터를 숫자로 매핑하는 데 사용되는 scikit-learn의 클래스다.
```python
from sklearn.preprocessing import OrdianlEncoder

encoder_train = OrdinalEncoder(categories =[['first', 'second', 'third', ... , 'last']])
train_ex['varname'] = encoder_train.fit_trainsform(train_ex[['varname']]).astype(int)
```

### 주의해야 할 것들
순서형 범주형 변수는 고유한 범주가 많기 때문에, 이들을 어떻게 효과적으로 인코딩하는지는 모델의 성능에 결정적인 영향을 미칠 수 있다. 따라서 다음과 같은 요소들을 고려하는 것이 좋다.
1. 고유 범주의 수 축소
> 첫 단계는 가능하다면 범주의 수를 줄이는 것이다. 이는 통계적 분석이나 도메인 지식을 활용하여 유사한 범주를 통합함으로써 이루어질 수 있다. 예를 들자면 빈도수가 낮은 범주들을 더 큰 범주로 통합하거나, 의미론적으로 유사한 범주들을 하나로 합치는 것 등이 있다.

2.  의미 있는 수동 인코딩
> 단순한 Label Encoding보다는 변수의 순서나 등급을 반영할 수 있는 Direct Mapping이나 Ordinal Encoder를 사용하는 것이 좋다. 특히나 선형 모델에서는 이러한 순서 정보를 잘 반영하지 않으면 변수 간 관계를 파악하지 못해 모델의 성능이 왜곡될 수 있다.