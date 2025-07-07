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
          title: "Projects",
          description: "Collection of my work",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
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
        },{id: "post-cs231n-exercise1-3-softmax",
      
        title: "[CS231n]Exercise1.3 - Softmax",
      
      description: "Softmax exercise.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/softmax/";
        
      },
    },{id: "post-cs231n-exercise1-2-support-vector-machine",
      
        title: "[CS231n]Exercise1.2 - Support Vector Machine",
      
      description: "SVM Exercise",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/svm/";
        
      },
    },{id: "post-cs231n-exercise1-1-knn",
      
        title: "[CS231n]Exercise1.1 - kNN",
      
      description: "kNN Exercise",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/knn/";
        
      },
    },{id: "post-deep-neural-networks",
      
        title: "Deep Neural Networks",
      
      description: "Deep neural networks from CVAA ch.5 Deep Learning",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Deep-Neural-Networks/";
        
      },
    },{id: "post-implementation-batch-normalization",
      
        title: "IMPLEMENTATION - Batch Normalization",
      
      description: "Implementation of &#39;Batch Normalization(2015)&#39;",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Batch-Normalization-Implementation/";
        
      },
    },{id: "post-review-batch-normalization",
      
        title: "REVIEW - Batch Normalization",
      
      description: "Review of &#39;Batch Normalization(2015)&#39;",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Batch-Normalization-review/";
        
      },
    },{id: "post-unsupervised-learning",
      
        title: "Unsupervised Learning",
      
      description: "Unsupervised Learning from CVAA ch.5 Deep Learning",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Unsupervised-Learning/";
        
      },
    },{id: "post-supervised-learning",
      
        title: "Supervised Learning",
      
      description: "Supervised Learning from CVAA ch.5 Deep Learning",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Supervised-Learning/";
        
      },
    },{id: "post-digital-camera",
      
        title: "Digital Camera",
      
      description: "Digital Camera from CVAA ch.2",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Digital-Camera/";
        
      },
    },{id: "post-analytic-geomatry",
      
        title: "Analytic Geomatry",
      
      description: "Analytic Geomatry from MML",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/analytic-geomatry/";
        
      },
    },{id: "post-geometric-primitives-and-transformations",
      
        title: "Geometric primitives and transformations",
      
      description: "Geometric primitives and transformations from CVAA",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/GPaT/";
        
      },
    },{id: "post-linear-algebra",
      
        title: "Linear Algebra",
      
      description: "Linear Algebra from MML",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Linear-Algebra/";
        
      },
    },{id: "post-ensemble-1",
      
        title: "Ensemble-1",
      
      description: "앙상블 모델 - 보팅과 스태킹을 중심으로",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Ensemble1/";
        
      },
    },{id: "post-lightgbm",
      
        title: "LightGBM",
      
      description: "LightGBM과 그 설명",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/LightGBM/";
        
      },
    },{id: "post-polynomial-features",
      
        title: "Polynomial Features",
      
      description: "PolynomialFeatures를 활용한 피처의 다항식 조합 생성",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Polynomial-Features/";
        
      },
    },{id: "post-feature-importances-and-feature-selection",
      
        title: "Feature Importances and Feature Selection",
      
      description: "피처 중요도와 피처 선택",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Feature-Importacnes-and-Selection/";
        
      },
    },{id: "post-binning",
      
        title: "Binning",
      
      description: "Binning을 통한 데이터 범주화",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Binning/";
        
      },
    },{id: "post-model-optimization",
      
        title: "Model Optimization",
      
      description: "하이퍼 파라미터 튜닝과 모델 최적화",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Model-Optimization/";
        
      },
    },{id: "post-dimensionality-reduction",
      
        title: "Dimensionality Reduction",
      
      description: "PCA와 LDA를 활용한 차원축소",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Dimensionality-Reduction/";
        
      },
    },{id: "post-imbalanced-data",
      
        title: "Imbalanced Data",
      
      description: "데이터 불균형",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Imbalanced-Data/";
        
      },
    },{id: "post-feature-engineering-1",
      
        title: "Feature Engineering(1)",
      
      description: "피처 엔지니어링",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Feature-Engineering(1)/";
        
      },
    },{id: "post-difference-between-removing-outliers-before-vs-after-splitting-the-data",
      
        title: "Difference Between Removing Outliers Before vs. After Splitting the Data",
      
      description: "이상치 제거와 데이터 분할 순서에 따르는 차이점",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Difference-Between-Removing-Outliers-Timing/";
        
      },
    },{id: "post-outlier-scan",
      
        title: "Outlier Scan",
      
      description: "이상치의 탐지",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Outlier-Scan/";
        
      },
    },{id: "post-performance-measurement-of-regression-model",
      
        title: "Performance measurement of Regression Model",
      
      description: "RMSE와 MAE를 활용한 회귀 모델의 성능 측정",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/RMSE-And-MAE/";
        
      },
    },{id: "post-data-scaling-for-regression-modeling",
      
        title: "Data Scaling for Regression Modeling",
      
      description: "회귀 모델링을 위한 데이터 표준화",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Data-Scaling-for-Regression-Modeling/";
        
      },
    },{id: "post-classification",
      
        title: "Classification",
      
      description: "분류 문제의 정의와 종류",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Classification/";
        
      },
    },{id: "post-regression",
      
        title: "Regression",
      
      description: "회귀분석",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Regression/";
        
      },
    },{id: "post-logistic-regression",
      
        title: "Logistic Regression",
      
      description: "로지스틱 회귀분석",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Logistic-Regression/";
        
      },
    },{id: "post-categorical-variable",
      
        title: "Categorical Variable",
      
      description: "범주형 변수",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Categorical-Variable/";
        
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
          section: "News",},{id: "projects-cs231n-exercise",
          title: 'CS231n Exercise',
          description: "Solved exercise from CS231n",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CS231n/";
            },},{id: "projects-computer-vision-algorithms-and-applications",
          title: 'Computer Vision Algorithms and Applications',
          description: "Summerize CVAA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CVAA/";
            },},{id: "projects-car-insurance-fraud-detection",
          title: 'Car Insurance Fraud Detection',
          description: "Ensemble-based approach to detect fraudulent car insurance claims with high specificity.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Car_Insurance_Fraud_Detection/";
            },},{id: "projects-gameengine-team-assignment",
          title: 'GameEngine Team Assignment',
          description: "Focusing on Unity&#39;s C# scripting",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Game_Engine_Assignment/";
            },},{id: "projects-mathmatics-for-machine-learning",
          title: 'Mathmatics for Machine Learning',
          description: "Summerize MML",
          section: "Projects",handler: () => {
              window.location.href = "/projects/MML/";
            },},{id: "projects-reviews",
          title: 'Reviews',
          description: "All sort of reviewed papers and its implementations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Reviews/";
            },},{
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
