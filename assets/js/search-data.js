// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-people",
          title: "people",
          description: "members of the lab or group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "post-performance-measurement-of-regression-model",
      
        title: "Performance measurement of Regression Model",
      
      description: "RMSE와 MAE를 활용한 회귀 모델의 성능 측정",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/RMSE-And-MAE/";
        
      },
    },{id: "post-data-scaling-for-regression-modeling",
      
        title: "Data Scaling for Regression Modeling",
      
      description: "회귀 모델링을 위한 데이터 표준화",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Data-Scaling-for-Regression-Modeling/";
        
      },
    },{id: "post-classification",
      
        title: "Classification",
      
      description: "분류 문제의 정의와 종류",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Classification/";
        
      },
    },{id: "post-regression",
      
        title: "Regression",
      
      description: "회귀분석",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Regression/";
        
      },
    },{id: "post-logistic-regression",
      
        title: "Logistic Regression",
      
      description: "로지스틱 회귀분석",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Logistic-Regression/";
        
      },
    },{id: "post-categorical-variable",
      
        title: "Categorical Variable",
      
      description: "범주형 변수",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Categorical-Variable/";
        
      },
    },{id: "post-initial-value-of-weight",
      
        title: "Initial value of weight",
      
      description: "가중치의 초기값",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Initial-value-of-weight/";
        
      },
    },{id: "post-batch-normalization",
      
        title: "Batch Normalization",
      
      description: "배치 정규화",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Batch-Normalization/";
        
      },
    },{id: "post-parameter-renewal",
      
        title: "Parameter Renewal",
      
      description: "파라미터 갱신",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Parameter-Renewal/";
        
      },
    },{id: "post-backpropagation",
      
        title: "Backpropagation",
      
      description: "오차역전파법",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Backpropagation/";
        
      },
    },{id: "post-class",
      
        title: "Class",
      
      description: "클래스",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Class/";
        
      },
    },{id: "post-gradient-method",
      
        title: "Gradient Method",
      
      description: "뉴럴 네트워크에서의 경사법(Gradient Method)",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Gradient-Method/";
        
      },
    },{id: "post-nn-derivative",
      
        title: "NN Derivative",
      
      description: "뉴럴 네트워크에서의 미분",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/NN-Derivative/";
        
      },
    },{id: "post-method-overriding-and-polymorphism",
      
        title: "Method Overriding and Polymorphism",
      
      description: "메서드 오버라이딩과 다형성(Polymorphism)",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Method-Overriding-and-polymorphism/";
        
      },
    },{id: "post-nn-learning",
      
        title: "NN Learning",
      
      description: "뉴럴 네트워크에서의 학습",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/NN-Learning/";
        
      },
    },{id: "post-object-oriented-programming",
      
        title: "Object Oriented Programming",
      
      description: "객체 지향 프로그래밍",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Object-Oriented-Programming/";
        
      },
    },{id: "post-procedural-programming",
      
        title: "Procedural Programming",
      
      description: "절차 지향 프로그래밍",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Procedural-Programming/";
        
      },
    },{id: "post-perceptron",
      
        title: "Perceptron",
      
      description: "퍼셉트론",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Perceptron/";
        
      },
    },{id: "post-neural-network",
      
        title: "Neural Network",
      
      description: "뉴럴 네트워크",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Neural-Network/";
        
      },
    },{id: "post-argument",
      
        title: "Argument",
      
      description: "인자",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Argument/";
        
      },
    },{id: "post-variable",
      
        title: "Variable",
      
      description: "변수",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Variable/";
        
      },
    },{id: "post-string",
      
        title: "String",
      
      description: "문자열의 표현",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/String/";
        
      },
    },{id: "post-real-number",
      
        title: "Real Number",
      
      description: "실수의 표현",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Real-Number/";
        
      },
    },{id: "post-integer",
      
        title: "Integer",
      
      description: "양,음의 정수와 표현",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Integer/";
        
      },
    },{id: "post-numeral-system",
      
        title: "Numeral System",
      
      description: "기수법(수를 표현하는 방법)",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Numeral-system/";
        
      },
    },{id: "post-bits-and-variables",
      
        title: "Bits and Variables",
      
      description: "비트와 변수에 대한 간략한 설명",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/bits-and-variables/";
        
      },
    },{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
