---
layout: distill
title: GameEngine Team Assignment
description: Focusing on Unity's C# scripting
img: assets/img/GE_project/Thumbnail.jpeg
importance: 1
category: work
toc:
  - name: Team up
  - name: Before we start...
  - name: What we gonna do is...
  - name: What I developed is...
    subsections:
      - name: Camera.cs
      - name: DialogueUI.cs
      - name: MosaicEffectRT.shader
  - name:  What we created is...
    subsections:
      - name: J
      - name: M
      - name: L
      - name: Still shot
  - name: And after all...
---

# Team Up
'게임 엔진1' 과목의 기말 과제를 팀 프로젝트로 협업하여 게임으로 대체한다는 사실은 적지 않은 부담감이었다. 아무래도 졸업 이후 게임과는 관련 없는 진로를 희망하고 있었기에 전공 필수 과목이 아니었더라면 해당 과목을 수강하지 않았었을 가능성이 매우 컸었다. 아무래도 과 생활이란 것과 동떨어져 지내다 보니, 팀 프로젝트에서 팀을 구성하는게 프로젝트에서 제일 높은 난이도임을 다시 한 번 체감했다. 그렇게 마지막까지 어느 곳에도 끼지 못하고 낙동강 오리알 마냥 남은 8명을 반으로 나눠 팀이 구성되었다.

- 나 : 팀장, 스크립팅을 포함한 모든 기술적인 부분을 담당
- J : 군대 다녀온 이번 학기 복학생. 블렌더를 사용한 3D 기술을 갈고 닦아 왔기에 모델링과 맵 작업을 담당
- M : 시각디자인과 출신 복수전공생. 디자인과의 소임을 다하기 위해 2D를 도맡아 담당. 나에겐 구세주나 다름 없었다.
- L : 간호학과에 다니던 이번 년도 편입생. 딱히 특출난 부분이 없었기에 ComfyUI를 활용한 이미지 생성 과 UI 작업을 담당.

일면식도 없이 2024년 10월 31일자로 결성된 이 팀은 갖은 고군분투 속에서 최종평가 A의 성적을 부여받는다.

# Before we start...
프로젝트를 본격적으로 진행하기 위해 제일 먼저 진행한 것은 소통 창구를 열고 프로젝트의 진척도를 개개인이 반영하고 즉각적으로 시각화 할 수 있도록 노션HQ를 제작하여 공유하였다. 메인 작업 환경인 Unity에서의 작업물도 원활하게 공유할 수 있도록 unity version control 또한 세팅했는데, git과 유사하지만 생각보다 풀/푸시가 반영되는 시간이 느리고 무료 계정으로는 최대 3인까지 밖에 사용할 수 없어 지금 생각해보면 그냥 git hub를 이용했으면 어땠을까 싶다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Project_Roadmap.png" title="Project_Roadmap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    프로젝트 로드맵.
</div>

# What we gonna do is...
함께 모여 브레인 스토밍을 하며 여러가지 아이디어가 나왔고 다음과 같은 평가 기준을 통해 게임의 컨셉과 개발 방향을 정했다.

1. 기간 안에 구현 가능한가?
2. 스토리의 짜임세가 중간이 생략되거나 변경되어도 무방한가?
3. 레퍼런스가 이미 많이 존재하는가?

그렇게 좁혀진 개발 방향은 **쿼터뷰, 호러, 탈출**로 정해졌고, 레퍼런스가 다수 존재한다는 점에서 **'SCP-517'**(꽤나 오래된 마이너한 서브컬쳐)을 기본 스토리의 뼈대로 삼았다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Reference1.jpeg" title="ref1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Reference2.gif" title="ref2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Reference3.png" title="ref3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    수집했던 레퍼런스 일부.
</div>

컨셉과 개발 방향을 정했으니 스토리를 짜야했다. 아무래도 기술적으로 구현해야 할 부분을 체크해야 하는 나와 예술적 감각이 충만한 M과 함께 구체적인 플롯을 작성해 나갔다. 그 동안 J는 SCP-517의 모델링을 진행하고 있었고, L은 딱히 할일이 없었으나 없다고 가만 냅두면 팀장으로서의 자질 부족이므로 어떻게든 할 일을 찾아 UI 배치를 맡겼다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Scenario_Roadmap.png" title="Scenario_Roadmap" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    시나리오 로드맵. 조건부로 분기를 나눠 멀티 엔딩을 구현하는 방향으로 진행...
</div>

# What I develpoed is...
개발을 시작하기에 앞서 나 뿐 아니라 팀원들도 개발된 스크립트의 수치 조정이 용이했어야 하므로 이를 염두에 두고 제작했다. 사실 C# 스크립팅은 처음이라 6할은 GPT가 제작했다고 해도 과언이 아니다. 아무튼, Camera Control과 Character Movement를 먼저 작업해 나가기 시작했다. Isometric 시점에서의 카메라의 위치 조절과 이에 상응하는 무브먼트를 제작했어야 하는데 다행히 수업 중 배웠던 내용으로 빠르게 커버할 수 있었다.

## Camera.cs
```csharp
//Camera.cs

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    public float rotationSpeed = 300f; // 회전 속도
    private Quaternion targetRotation; // 목표 회전값
    private bool isRotating = false;   // 회전 중 여부 체크

    [Header("Character Follow Settings")]
    public Transform character;

    [Tooltip("카메라 X축 오프셋을 조정")]
    [Range(-20f, 20f)]
    public float offsetX = 10f;

    [Tooltip("카메라 Y축 오프셋을 조정")]
    [Range(-20f, 20f)]
    public float offsetY = 10f;

    [Tooltip("카메라 Z축 오프셋을 조정")]
    [Range(-20f, 20f)]
    public float offsetZ = -10f;

    [Tooltip("카메라 Orthographic 사이즈를 조정")]
    [Range(1f, 20f)]
    public float orthographicSize = 5f;

    ...

    /// <summary>
    /// Q/E 키 입력을 받아 목표 회전값을 업데이트
    /// </summary>
    void HandleRotationInput()
    {
         if (isRotating) return; // 회전 중이면 입력 무시

        if (Input.GetKeyDown(KeyCode.Q))
        {
            Debug.Log("Q 키 입력 감지됨");
            targetRotation *= Quaternion.Euler(0, -90, 0); // 왼쪽으로 90도 회전
            isRotating = true;
        }
        else if (Input.GetKeyDown(KeyCode.E))
        {
            Debug.Log("E 키 입력 감지됨");
            targetRotation *= Quaternion.Euler(0, 90, 0); // 오른쪽으로 90도 회전
            isRotating = true;
    }
    }

    /// <summary>
    /// 부드러운 회전 처리
    /// </summary>
    void SmoothRotate()
    {
        if (!isRotating) return;

        transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);

        // 목표 회전값에 도달하면 회전 중 상태를 해제
        if (Quaternion.Angle(transform.rotation, targetRotation) < 0.1f)
        {
            transform.rotation = targetRotation; // 정확히 목표값으로 설정
            isRotating = false;
        }
    }
}
```


이런 식으로 스크립트를 하나하나 설명하다 보면 끝도 없으니 제작한 주요 스크립트 몇 개만 간략하게 알아보도록 하자.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Scripts.png" title="Scripts" class="img-fluid rounded z-depth-1" style="max-width: 300px; height: auto;" %}
    </div>
</div>
<div class="caption">
    제작했던 스크립트 목록.
</div>

## DialogueUI.cs

```csharp
// DialogueUI.cs

using UnityEngine;
using TMPro;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.Events;

public class DialogueUI : MonoBehaviour
{
    [Header("UI Components")]
    public GameObject dialoguePanel;
    public TMP_Text characterNameText;
    public TMP_Text dialogueText;
    public float typingSpeed = 0.05f;

    [Header("Main UI")]
    public GameObject mainUI;

    [Header("Character Images")]
    public Image leftCharacterImage;
    public Image rightCharacterImage;
    public Sprite protagonistSprite;
    public Sprite npcSprite;

    [Header("Player Movement Control")]
    public MonoBehaviour playerMovementScript;

    [Header("Dialogue Events")]
    public UnityEvent onDialogueStart;       // 다이얼로그 시작 시 호출할 이벤트
    public UnityEvent onDialogueProgress;    // 다이얼로그 중간 이벤트
    public UnityEvent onDialogueEnd;         // 다이얼로그 종료 시 호출할 이벤트

    private bool isTyping = false;
    private string fullText;

    public bool IsDialogueActive { get; private set; } = false;

    void Start()
    {
        if (dialoguePanel != null)
            dialoguePanel.SetActive(false);

        if (leftCharacterImage != null)
            leftCharacterImage.sprite = protagonistSprite;

        if (rightCharacterImage != null)
            rightCharacterImage.sprite = npcSprite;
    }

    /// <summary>
    /// 다이얼로그 시작
    /// </summary>
    public void StartDialogue(string characterName, string dialogue, bool isProtagonistSpeaking)
    {
        onDialogueStart?.Invoke();
        dialoguePanel.SetActive(true);

        if (mainUI != null)
            mainUI.SetActive(false);

        if (playerMovementScript != null)
            playerMovementScript.enabled = false;

        IsDialogueActive = true;
        characterNameText.text = characterName;
        dialogueText.text = "";
        fullText = dialogue;

        UpdateCharacterImages(isProtagonistSpeaking);
        StartCoroutine(TypeText());
    }

    IEnumerator TypeText()
    {
        isTyping = true;
        foreach (char c in fullText.ToCharArray())
        {
            dialogueText.text += c;
            yield return new WaitForSeconds(typingSpeed);
        }
        isTyping = false;
        onDialogueProgress?.Invoke();
    }

    /// <summary>
    /// 다이얼로그 종료
    /// </summary>
    public void EndDialogue()
    {
        dialoguePanel.SetActive(false);

        if (mainUI != null)
            mainUI.SetActive(true);

        if (playerMovementScript != null)
            playerMovementScript.enabled = true;

        onDialogueEnd?.Invoke();

        StopAllCoroutines();
        dialogueText.text = "";
        IsDialogueActive = false;
    }

    /// <summary>
    /// 추가 텍스트를 다이얼로그에 표시
    /// </summary>
    public void AppendDialogueText(string additionalText)
    {
        dialogueText.text += additionalText;
    }

    private void UpdateCharacterImages(bool isProtagonistSpeaking)
    {
        if (isProtagonistSpeaking)
        {
            leftCharacterImage.color = Color.white;
            rightCharacterImage.color = Color.gray;
        }
        else
        {
            leftCharacterImage.color = Color.gray;
            rightCharacterImage.color = Color.white;
        }
    }
}
```

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Dialogue_Sample.png" title="Dialogue Sample" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    대화문 UI
</div>

제일 고생했던 스크립트 중 하나인 대화문 스크립트다. Unity 엔진 작업환경 내부에서 대화문, 분기점 그리고 아이템 습득에 대해서 조절 할 수 있어야 했고 기타 여러 UI 요소들과 동시에 상호작용이 가능해야만 했다.

거기에 알파로 타자기 같은 스타일링을 원했는데, 이전 대화문이 끝나기 전에 다음 대화문으로 강제로 넘어가게 되면 두 대화문이 겹쳐서 나오는 문제가 발생해서 해결하는데 꽤나 애먹었다. 

## MosaicEffectRT.shader
스크립트는 아니지만 죽은 시체의 표현을 시간 내에 구현하기 어려워 모자이크로 땜빵치자는 의견이 나와 쉐이더까지 건드리게 되었다. 

```
Shader "Custom/URP_MosaicEffect"
{
    Properties
    {
        _MainTex ("Render Texture", 2D) = "white" {} // Render Texture 슬롯 선언
        _BlockSize ("Block Size", Float) = 50.0     // 모자이크 블록 크기
    }

    SubShader
    {
        Tags { "RenderPipeline"="UniversalPipeline" "Queue"="Transparent" }
        LOD 100

        Pass
        {
            Name "MosaicEffectPass"
            Blend SrcAlpha OneMinusSrcAlpha  // 투명도 블렌딩
            ZWrite Off                       // 깊이 쓰기 비활성화
            Cull Off                         // 양면 렌더링

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            struct appdata
            {
                float4 position : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
            };

            sampler2D _MainTex;   // Render Texture 연결
            float _BlockSize;     // 모자이크 블록 크기

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = TransformObjectToHClip(v.position);
                o.uv = v.uv; // UV 좌표 전달
                return o;
            }

            half4 frag (v2f i) : SV_Target
            {
                // UV를 블록 단위로 나눠서 모자이크 효과 적용
                float2 blockUV = floor(i.uv * _BlockSize) / _BlockSize;

                // MainTex에서 블록 단위로 색상 샘플링
                half4 col = tex2D(_MainTex, blockUV);
                return col;
            }
            ENDHLSL
        }
    }
}
```

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/Mosaic.png" title="Mosaic Shader" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    모자이크 쉐이더
</div>

유니티에는 내장된 모자이크 쉐이더가 없었기에 직접 만들었는데, 자랑하고 싶은 부분은 카메라를 통해 모자이크의 방향을 수정하거나 모자이크의 정도를 엔진 내부에서 자체적으로 계산하고 즉각적으로 반영할 수 있도록 했다는 점이다.

# What we created is...
## J
J는 일관된 태도로 묵묵히 3D만 작업했다. 아니, 작업할 수밖에 없었다. 팀 내에서 유일하게 모델링과 리깅을 능숙하게 할 수 있었고, 만만치 않은 다른 과목 조별과제들까지 맡고있었기에 내가 무언가 더 맡기기가 미안했다. 내가 스크립팅에서 삽질하는 동안 J는 매일 쪽잠을 자가며 모델링과 맵 작업을 해왔고, 어쨌거나 저쨌거나 이번 과제가 그에게 꽤나 괜찮은 성장의 기회가 된거같아 안심이었다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/J1.png" title="J1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/J2.png" title="J2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/J3.png" title="J3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    J의 작업물 중 일부
</div>

## M
이번 프로젝트에서 나의 구세주 M. 확실히 디자인과 답게 그림 실력도 출중했으나, Midjourny와 같은 생성형 인공지능의 사용에도 능숙했다. 따로 주문하지 않아도 알아서 잘 딱 깔끔하고 센스있게 작업해오는 그녀의 능력을 보며 '저 친구는 어디가서 먹고 살 걱정은 안해도 되겠다.'는 생각이 오랜만에 들었다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/M1.png" title="M1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/M2.jpeg" title="M2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/M3.jpeg" title="M3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    M의 작업물 중 일부
</div>

## L
L에게는 미안하지만, 그녀의 의지와는 별개로 막 편입했다 보니 실력은... 그럼에도 불구하고 본인의 자리에서 묵묵히 요청사항들을 수행해준 그녀에게 감사의 마음을 가져본다.

<div class="row text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/L1.png" title="L1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/L2.jpeg" title="L2" class="img-fluid rounded z-depth-1" width="50%" %}
    </div>
</div>
<div class="caption">
    L의 작업물 중 일부
</div>

## Still shot

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/SShot1.png" title="still shot1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/SShot2.png" title="still shot2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GE_project/SShot3.png" title="still shot3" class="img-fluid rounded z-depth-1"  %}
    </div>
</div>
<div class="caption">
    작업물 스틸 샷
</div>

# And after all...
과제 마지막 이틀은 그 주에 시험에 4개나 더 몰려있었음에도 불구하고 잠을 안잤던걸로 기억한다. 어쨌든 고난과 역경을 딛고 이 팀은 결과물을 완성했고, 팀원 모두가 만족할 만한 점수, 개개인의 발전과 성취를 이루었다는데에 있다는데에 의의를 두고 보람을 느낀다.

그렇지만, 다시 게임 만들라면 절대 안만든다.