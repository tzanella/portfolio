export const profileData = {
  personal: {
    name: "Túlio Zanella",
    nickname: "XDuke",
    age: 18, //Old, but keep this in memory ;)
    bornYear: 2008,
    location: "São Paulo, Brazil",
    role: "Developer & Student",
  },
  contact: {
    email: "tulio.czanella@gmail.com",
    phone: "+55 11 92601-5363",
    location: "São Paulo, Brazil",
  },
  socials: {
    instagram: "https://instagram.com/tulio_zanella",
    github: "https://github.com/tzanella",
    wakatime: "https://wakatime.com/@XDuke",
    discord: "https://discordapp.com/users/816775306115285073",
  },
  skills: [
    {
      category: "Backend",
      items: [
        {
          name: "Node.js",
          icon: "logos:nodejs-icon",
          level: 70,
          description:
            "Proficient in building scalable backend services, REST APIs, and microservices.",
        },
        {
          name: "TypeScript",
          icon: "logos:typescript-icon",
          level: 65,
          description:
            "Strong typing expertise, design patterns, and application architecture.",
        },
        {
          name: "GoLang",
          icon: "logos:go",
          level: 40,
          description:
            "I'm new on GoLang, but I've loved it so far!"
        },
      ],
    },
    {
      category: "Frontend",
      items: [
        {
          name: "Vue.js / Nuxt 3",
          icon: "logos:vue",
          level: 35,
          description:
            "I'm new on Vue and Nuxt, but I'm learning fast. I'm very familiar with React and Next.js, and I'm confident I can learn Vue and Nuxt quickly.",
        },
        {
          name: "React / Next.js",
          icon: "logos:nextjs-icon",
          level: 65,
          description:
            "I have some experience with React and Next.js, but I'm not an expert.",
        },
        {
          name: "JavaScript",
          icon: "logos:javascript",
          level: 60,
          description:
            "I can work well with vanilla JS, but I prefer to use TypeScript.",
        },
        {
          name: "Tailwind CSS",
          icon: "logos:tailwindcss-icon",
          level: 60,
          description:
            "I can work well with Tailwind CSS, but sometimes I forget the class names."
        },
      ],
    },
    {
      category: "Database",
      items: [
        {
          name: "PostgreSQL",
          icon: "logos:postgresql",
          level: 50,
          description:
            "I've used PostgreSQL for a few projects, but I'm not an expert.",
        },
        {
          name: "MySQL",
          icon: "logos:mysql",
          level: 60,
          description:
            "I can work well with MySQL",
        },
        {
          name: "MongoDB",
          icon: "logos:mongodb-icon",
          level: 75,
          description:
            "My main database experience is with MongoDB, I have a lot of experience with it."
        }
      ],
    },
    {
      category: "Infrastructure",
      items: [
        {
          name: "Docker",
          icon: "logos:docker-icon",
          level: 55,
          description:
            "Containerization, environment configuration, and container deployment workflows.",
        },
        {
          name: "Git & GitHub",
          icon: "logos:github-icon",
          level: 60,
          description:
            "Version control, branch management, collaborative workflows, and CI/CD pipelines.",
        },
        {
          name: "Linux",
          icon: "logos:linux-tux",
          level: 65,
          description:
            "Server administration, shell scripting, hosting, and command line tools.",
        },
      ],
    },
    {
      category: "Languages",
      items: [
        {
          name: "Portuguese",
          icon: "circle-flags:br",
          level: 100,
          description: "Native language fluency.",
        },
        {
          name: "English",
          icon: "circle-flags:uk",
          level: 45,
          description: "Conversational working proficiency.",
        },
        {
          name: "Spanish",
          icon: "circle-flags:es",
          level: 35,
          description: "Basic knowledge.",
        },
        {
          name: "Italian",
          icon: "circle-flags:it",
          level: 5,
          description: "New language I'm learning :)",
        },
      ],
    },
  ],
  projects: [
    { type: "github", url: "https://github.com/tzanella/zen-sounds-mod" },
    { type: "github", url: "https://github.com/tzanella/nubank-api-pix" },
    { type: "github", url: "https://github.com/tzanella/swc-library-website" },
    { type: "github", url: "https://github.com/tzanella/ghost-app" },
    { type: "github", url: "https://github.com/tzanella/nex-server" },
    { type: "github", url: "https://github.com/tzanella/dropgit" },
    { type: "github", url: "https://github.com/tzanella/NexViewer" },
    { type: "github", url: "https://github.com/tzanella/swc-library-telegram" },
  ],

  clientProjects: [
    //Just the structure for now

    {
      type: "url | github | none",
      url: "if it's type=url | github ",
      name: "title of the project",
      description: "Description of the project",
      imageUrl: "path/to/image",
      tools: ["tool1", "tool2", "tool3"],
      linkText: "Link text"
    }

  ], //ToDo: Add my client's projects
  certificates: [
    {
      title: "Logic Programming",
      institution: "Senac - Registro-SP",
      hours: 40,
      imageUrl: "/certs/logic.jpg",
    },
    {
      title: "Data Center Administration",
      institution: "Senac - Registro-SP",
      hours: 60,
      imageUrl: "/certs/datacenter.jpg",
    },
  ],
};
