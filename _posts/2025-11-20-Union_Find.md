---
layout: post
title: '[Algorithm] Union-Find'
date: 2025-11-19 11:38:00
description: Union-Find Algorithm
tags: Algorithm, Tree, Hash
categories: Algorithm
pretty_table: true
---
# Parent array
## How it works
1. parent\[i]는 원소 i의 직접적인 부모를 저장
2. 어떤 원소의 부모가 자기 자신(parent\[i] == i)이라면, 그 원소는 **Root**가 됨
3. 여러 원소가 하나의 대표를 향해 포인터를 따라가는 **트리** 구조

## Initialization
아무 관계가 정립되지 않은 초기 상태에서는 모든 원소가 독립적인 그룹이므로, 모든 원소는 자기 자신이 그룹의 대표가 된다.

| ID          | 0    | 1    | 2    | ... | n    |
| ----------- | ---- | ---- | ---- | --- | ---- |
| Parent\[ID] | 0    | 1    | 2    | ... | n    |
| Status      | Root | Root | Root | ... | Root |

## string to ID
Union-Find는 정수 ID로 작동해야 하는데 입력이 문자열인 경우에는 어떻게 처리해야할까? 가장 효율적인 방법은 **카운터와 해시맵(Dictionary)**을 사용하는 것이다.

### Structure
1. name_to_id (Dictionary / Hash Map) : 이름(key) -> ID(Value)를 저장
2. current_id(counter) : 새로 부여할 ID추적

### Logic
1. name_to_id에 이름을 추가하고 현재 current_id 값을 할당
2. current_id 값을 1 증가
3. Union-Find의 parent 배열에도 새로운 ID에 대한 초기값 설정(자기 자신 i)

# Find(i)
어떤 원소 A가 속한 그룹의 Root를 찾는 연산을 Find라 정의한다.
## Basic 'Find' Operation

```python 
def find_root(i, parent):
    if parent[i] == i:
        return i
    # Recursive
    return find_root(parent[i], parent)
```

Find(i) 연산은 원소 i의 부모를 계속 따라 올라가면서, 부모가 자기 자신인 원소를 만날 때 까지 반복하는 재귀 함수로 구현한다.

그렇지만 1부터 100까지 일렬로 연결되어 있다면, 1번 원소의 대표를 찾기 위해 100번의 연산을 수행해야 하는 효율성 문제가 발생한다.

## Path Compression
효율성 문제를 해결하기 **경로 압축**을 사용한다. 경로 압축은 find(i) 함수 안에서 재귀적으로 부모를 따라 올라간 후, 대표를 찾았을 때 parent\[i]에 대표의 ID를 저장하여 $O(n^2) \rightarrow O(n)$의 시간복잡도 개선을 만들 수 있다.

```python
def find_root(i, parent):
    if parent[i] == i:
        return i
    
    # Recursive
    # 경로 압축: 찾은 대표(Root)를 현재 노드의 새로운 부모로 설정한다.
    parent[i] = find_root(parent[i], parent)
    
    return parent[i]
```

# Union(a,b)
Union연산은 a,b가 속한 그룹의 대표 $R_A, R_B$를 찾은 다음, 둘 중 하나를 다른 하나의 자식으로 만들면 끝난다.

그렇지만 기준 없이 무작정 한쪽을 다른 쪽의 자식으로 만들면 위에서 제시했던 효율성 문제가 또 발생할 수 있다. 이를 해결하기 위해 아래 두 가지 최적화 기법을 사용한다. 다음 최적화 기법을 통해 트리의 높이를 항상 $\log N$에 가깝게 유지해 효율을 높일 수 있다.

## Union by Size
원소의 개수가 더 많은 그룹에 원소의 개수가 적은 그룹을 합친다.

### size arrray
 크기를 기반으로 합치려면 Union-Find 구조에 추가적으로 그룹의 크기를 추적해야 한다. 크기 정보를 모든 노드에 저장할 필요는 없고, 그룹의 Root 노드에만 저장하는 것이 효율적이다.
 
 1. 별도의 size array 또는 size dictionary 생성
 2. size\[i]는 노드 i가 Root일 때만 그룹의 총 원소 개수를 저장
 3. 초기 상태에서는 모든 원소가 독립적인 Root이므로 size\[i]는 모두 1
 4. 작은 그룹을 큰 그룹에 합쳐야 트리의 깊이가 깊어지는 것을 방지할 수 있음!!

```python
def union_by_size(a, b, parent, size):
    root_a = find_root(a)
    root_b = find_root(b)
    
    if root_a != root_b:
        # 그룹 크기 비교: 작은 그룹을 큰 그룹에 합칩니다.
        if size[root_a] < size[root_b]:
            root_a, root_b = root_b, root_a # root_a가 항상 큰 그룹이 되도록 스왑
            
        # 1. 부모 업데이트: root_b를 root_a의 자식으로 만듭니다.
        parent[root_b] = root_a
        
        # 2. 크기 업데이트: root_a의 크기를 두 그룹의 합으로 갱신합니다.
        size[root_a] += size[root_b]
        
        return size[root_a]
        
    else:
        return size[root_a]  
```

## Union by Rank
트리의 깊이(Rank)가 더 깊은 쪽에 얕은 쪽을 합친다.

```python
def union_by_rank(a, b, parent, rank):
    root_a = find_root(a, parent)
    root_b = find_root(b, parent)
    
    if root_a != root_b:
        # 1. 랭크가 다를 때: A의 랭크가 B의 랭크보다 작을 경우
        if rank[root_a] < rank[root_b]:
            parent[root_a] = root_b
            
        # 2. 랭크가 다를 때: A의 랭크가 B의 랭크보다 클 경우
        elif rank[root_a] > rank[root_b]:
            parent[root_b] = root_a
            
        # 3. 랭크가 같을 때
        else:
            parent[root_b] = root_a
            rank[root_a] += 1
            
        return True 
    
    return False # 이미 같은 그룹
```

### rank array
크기 기반 합치기와 유사하게 rank배열을 사용하여 root노드의 랭크를 저장한다. 초기 랭크는 보통 0으로 설정한다.

1. 두 root $R_A,R_B$의 랭크를 비교한다.
2. 랭크가 **다를때** : 랭크가 낮은 트리를 랭크가 높은 트리에 연결한다. 이때 새 root의 랭크는 변하지 않는다
3. 랭크가 **같을때** : 어느 쪽을 Root로 삼든 상관없으며, 연결 후 새 Root의 랭크는 **1** 증가한다.

# Example
[친구 네트워크(4195)](https://www.acmicpc.net/problem/4195)

```python
import sys
input = sys.stdin.readline

def find(i, parent):
    if parent[i] == i:
        return i
    parent[i] = find(parent[i], parent)
    return parent [i]

def union(a,b,parent,size):
    root_a = find(a,parent)
    root_b = find(b,parent)

    if root_a != root_b:
        if size[root_a] < size[root_b]:
            root_a, root_b = root_b, root_a
        
        parent[root_b] = root_a

        size[root_a] += size[root_b]
        return size[root_a]
    else:
        return size[root_a]
    
def get_id_and_init(name, name2id, parent, size):
    if name not in name2id:
        new = len(name2id)
        name2id[name] = new

        parent.append(new)
        size[new] = 1

        return new
    else:
        return name2id[name]
    
def answer(t):
    name2id = dict()
    parent = []
    size = {}
    
    for _ in range(t):
        a,b = map(str, input().split())

        id_a = get_id_and_init(a, name2id, parent, size)
        id_b = get_id_and_init(b, name2id, parent, size)

        print(union(id_a, id_b, parent, size))

for _ in range(int(input())):
    answer(int(input()))
```