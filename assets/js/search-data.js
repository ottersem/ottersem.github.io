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
