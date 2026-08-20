---
layout: post
title: "[Paper] Adaptive Compensation for Robotic Joint Failures Using Partially Observable  Reinforcement Learning"
date: 2026-08-19 12:00:00
description: Review of paper 'Adaptive Compensation for Robotic Joint Failures Using Partially Observable  Reinforcement Learning'
tags: Paper, Robotics, RL
categories: Paper
pretty_table: true
---

[Multitask Active Learning for Graph Anomaly Detection](https://arxiv.org/abs/2409.14435)

# First pass
## Words
**DRL(Deep Reinforcement Learning)**
**FTC(Fault-Tolerant Control)** : Fault-tolerant control aims at a gradual shutdown response in automated systems when faults occur
**FDI(Fault detection and isolation)**
**POMDP(Partially Observed Markov Decision Process)**
**PPO(Proximal Policy Optimization) Algorithm**
**GAE(Generalized Advantage Estimation)**
**Denavit-Hartenberg Convention(DH convention)**
## 5C
1. **Category** : DRL을 적용한 FTC RL embodied AI 시스템 개발
2. **Context**  
	1. FTC : [[Diagnosis and Fault-Tolerant Control]]
	2. Innovative FTC : [[Fault-tolerant scheme for robotic manipulator—Nonlinear robust back-stepping control with friction compensation]]
	3. Fault Detection w/ NN: [[Fault detection on robot manipulators using artificial neural networks]]
3. **Correctness** : **Not evaluated yet**
4. **Contributions** 
	1. Unified Approach : Fault detection, diagnosis, control을 하나의 시스템으로 묶어서 반응 시간에 이점을 가져가고 잠재적으로 복잡도를 줄임
	2. Adaptability : DRL 에이전트는 훈련 단계에서 모델링 되지 않은 결함을 포함한 넓은 범위의 fault에 대응하는 방법을 배워 시스템의 강건성을 높임
	3. Efficiency : Raw sensory data를 직접적으로 처리하여 복잡한 feature 엔지니어링이나 intermediate representations에 대한 필요를 제거함
	4. Scalability : 로봇 시스템의 복잡도가 높아짐에 따라 DRL적 접근은 전통적인 방법보다 잠재적으로 scale에 좀 덜 영향을 받음
	5. Continuous Learning : 시스템은 real time으로 policy를 업데이트 하도록 설계되어 새로운 시나리오나 작동 환경이 바뀌어도 실시간으로 적응 가능
5. **Clarity** : **Not evaluated yet**

# Second pass
## Methodology
### Problem Formulation
Real-world 시나리오에서 에이전트가 주변의 모든 환경을 관측할수는 없고, joint malfunction 상황에서도 robotic manipulator가 task를 완료할 수 있도록 **POMDP**를 활용하여 문제를 정의함. 또한 모든 task Franka Robot으로 서랍을 여는것으로 정의됨.

**Observation Space**
시간 $t$에서의 obseravtion $s_t$는 로봇과 서랍 모두의 현재 관절의 각도와 속도를 나타낸다.

$$
s_t = [\theta_1,\theta_2,\ldots,\theta_9,\dot{\theta_1},\dot{\theta_2},\ldots,\dot{\theta_9},\delta_d,\dot{\delta_d},\bar{x}_b,\bar{y}_b,\bar{z}_b]
\tag{1}$$

$\theta_i, \dot{\theta}_i$는 각각 로봇의 $i$ 번째 관절의 각도와 속도를, $\delta_d,\dot{\delta}_d$는 서랍의 위치와 속도를, $x,y,z$는 로봇 그리퍼와 서랍 사이의 $x,y,z$ 거리를 나타낸다.

**Action Space**
시간 t에서의 action $a_t$는 로봇 관절의 control 입력과 end-effector position을 나타낸다.
$$
a_t = [\theta_1,\theta_2,\ldots,\theta_9]
\tag{2}$$

관절에 arbitrary angle과 속도를 적용할 수 없으므로 각 관절의 upper/lower limit으로 각도를 다듬어야 한다.

**Reward Function**

**Distance reward**는 로봇의 그리퍼와 서랍의 손잡이의 거리가 최소화 하도록 설계되었으며 Euclidean distance를 이용해 계산한다.

**Rotation reward**는 로봇의 그리퍼 방향을 서랍 손잡이와 일치시키도록 설계되었다.

**Around handle reward**는 로봇의 손가락이 서랍 손잡이에 올바르게 위치하도록 설계되었다.

**Open reward** 는 로봇이 서랍을 많이 열수록 reward를 더 주도록 설계되었다.

$$
r=w_\text{dist}\cdot r_\text{dist}+w_\text{rot}\cdot r_\text{rot}+w_\text{handle}\cdot r_\text{handle}+w_\text{open}\cdot r_\text{open}
$$

각 $w$는 distance, rotation, around handle, open reward에 대한 scaling factor이다.
### Reinforcement Learning Framework

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/paper_review/AdaptiveCompensation/framework.png" title="Overall Framework" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overall Framework
</div>


**PPO Algorithm**은 구현의 용이성과 뛰어난 실증적 성능의 균형을 맞춘 on-policy RL 알고리즘이다.

PPO 활용을 위해서 actor networks와 critic networks 두 개의 신경망을 적용하였다. Actor 네트워크는 로봇의 action $(a_t)$를 출력하고, critic 네트워크는 해당 상태에서 예상되는 출력을 측정한다. 두 네트워크 모두 동일한  3층 신경망을 사용한다.

신경망의 첫 두 레이어는 ReLU activation을 활용해 output dimension을 512에서 256으로 줄이고, 마지막 레이어는 네트워크에 따라 Tanh activation을 활용한다.

**Agent Training**은 다음 세 단계를 순차적으로 따른다.

**Initialization** : Policy Network $\pi_\mathcal{v}$를 파라미터 $\mathcal{v}$로 초기화한다. Value Netowrk $V_\phi$는 파라미터 $\phi$로 초기화한다. 추가로 discount factor $\gamma$, clipping parameter $\epsilon$도 설정한다.

**Collecting Trajectories** : 지금 상태의 궤적 $s_t$, 액션 $a_t$, 리워드 $r_t$를 수집하기 위해 주변 환경과 상호작용한다. 이 상호작용은 policy network에서 샘플링된 동작을 실행하고 그 결과로 나타나는 상태와 보상을 관찰하는 것을 포함한다.

**Computing Returns and Advantages** : 매 타임스텝 $t$마다 discounted return $R_t$를 계산한다.

$$
R_t = \sum^{T-t}_{k=0} \gamma^k r_{t+k}
\tag{12}$$

$R_t$는 타임스템 $t$에서 반환되는 값이고 $\gamma$는 discount factor, $r_{t+k}$는 타임스텝 $t+k$에서의 리워드이다.

Advantage 추정치 $A_t$는 GAE를 통해 계산한다.

$$
A_t = \delta_t+(\gamma\lambda)\delta_{t+1}+\ldots+(\gamma\lambda)^{T-t+1}\delta_T,
\tag{13}$$

이때

$$
\delta_t = r_t + \gamma V_\phi(s_{t+1})-V_\phi(s_t)
\tag{14}$$
$\lambda$는 GE smoothing parameter, $\delta_t$는 temporal difference error, $V_\phi(s_t)$는 $s_t$에서의 value 측정값, $r_t$는 타임스텝 t에서의 reward이다.

이후의 과정은 표준적인 PPO 학습 과정이다.

### Simulation and Experiment Setup
RL 프레임워크의 강건성을 측정하기 위해 두 종류의 joint malfunction을 시뮬레이션 하였다.
- **Permanently Broken Joint** : 로봇 관절 중 하나가 task 수행 처음부터 끝까지 작동하지 않음
- **Intermittently functioning joint** : 로봇 관절 중 하나가 랜덤하게 작동하거나 작동하지 않음.

측정을 위한 primary metric은 다음과 같다
- Success rate of completing the task.
- Time taken to complete the task.
## Inverse Kinematics
### Denavit-Hartenberg Parameters and Inverse Kinematics Solving
**Forward Kinematics**

Manipulator의 **Forward Kinematics**는 DH parameter로부터 도출된 각 링크의 homogeneous transformation 행렬을 곱하여 얻는다. 이때 $i$번째 joint의 transformation matrix $A_i$는 다음과 같다.

$$
A_i=
\begin{bmatrix}
\cos\theta_i & -\sin\theta_i\cos\alpha_i & \sin\theta_i\sin\alpha_i & a_i\cos\theta_i \\
\sin\theta_i & \cos\theta_i\cos\alpha_i & -\cos\theta_i\sin\alpha_i & a_i\sin\theta_i \\
0 & \sin\alpha_i &  \cos\alpha_i & d_i \\
0 & 0 & 0 & 1
\end{bmatrix}
\tag{21}$$

Base frame 부터 end-effector frame 까지의 전체 transformation은 다음과 같이 정의한다.

$$
T_0^7=\prod_{i=1}^7 A_i
\tag{22}$$

**Inverse Kinematics(IK)**
IK는 end-effector의 가 최종적으로 도달할 위치와 방향이 주어졌을 때 joint angle $\theta_i$를 찾는다. 

저자는 Jacobian pseudo-inverse를 기반으로한 반복적 접근으로 IK를 찾았다. IK를 찾는다는 것의 최종 목표는 end-effector의 현재 방향/위치와 최종 방향/위치 사이의 에러를 최소화 하는데 있으며, joint angle의 업데이트 규칙은 다음처럼 정의한다.

$$
\Delta\theta = J^+(x_d-x)
\tag{23}$$

$\Delta\theta$는 joint angle의 변화량을, $J^+$는 Jacobian Matrix의 pseudo-inverse를, $x_d, x$는 목표 위치와 방향과 현재의 위치와 방향을 의미한다.
