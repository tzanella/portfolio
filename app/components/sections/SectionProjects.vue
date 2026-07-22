<template>
  <section id="projects" class="py-24 relative bg-space-dark/30">
    <div class="container mx-auto px-6 lg:px-12">
      <h2
        class="text-3xl md:text-5xl font-bold mb-16 text-center font-poppins text-white"
      >
        {{ t("projects.title") }}
      </h2>

      <div v-if="pending" class="flex justify-center py-12">
        <Icon
          name="lucide:loader-2"
          class="w-12 h-12 text-accent-blue animate-spin"
        />
      </div>

      <div
        v-else-if="error"
        class="text-center text-red-400 p-8 glass max-w-lg mx-auto"
      >
        {{ t("projects.error_message") }}
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { t } = useI18n();

const projects = ref([]);
const pending = ref(true);
const error = ref(null);

const fetchProjects = async () => {
  try {
    const fetched = await Promise.all(
      profileData.projects.map(async (project) => {
        if (project.type === "manual") {
          return {
            id: project.title,
            type: "manual",
            title: project.title,
            description: project.description,
            image:
              project.image ||
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
            tags: project.tags || [],
            link: project.link,
            stars: 0,
          };
        } else if (project.type === "github" && project.url) {
          const match = project.url.match(/github\.com\/([^/]+)\/([^/]+)/);
          if (match) {
            const [_, owner, repo] = match;
            try {
              const data = await $fetch(
                `https://api.github.com/repos/${owner}/${repo}`,
              );
              return {
                id: data.id,
                type: "github",
                title: data.name,
                description: data.description,
                image:
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
                tags: data.language
                  ? [data.language, ...(data.topics?.slice(0, 2) || [])]
                  : data.topics?.slice(0, 3) || [],
                link: data.html_url,
                stars: data.stargazers_count,
              };
            } catch (e) {
              return {
                id: repo,
                type: "github",
                title: repo,
                description: "Failed to load GitHub repository details.",
                image:
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
                tags: ["GitHub"],
                link: project.url,
                stars: 0,
              };
            }
          }
        }
        return null;
      }),
    );
    projects.value = fetched.filter(Boolean);
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchProjects();
});
</script>
