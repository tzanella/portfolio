<template>
  <section id="projects" class="py-24 relative">
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

      <div v-if="profileData.clientProjects && profileData.clientProjects.length" class="mt-24 pt-16 border-t border-white/5">
        <h3 class="text-2xl md:text-4xl font-bold mb-16 text-center font-poppins text-white">
          {{ t("projects.client_projects_title") }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div
            v-for="clientProject in profileData.clientProjects"
            :key="clientProject.name"
            class="glass flex flex-col rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_35px_rgba(139,92,246,0.2)] transition-all duration-300 group"
          >
            <div class="h-48 overflow-hidden relative border-b border-white/5 bg-slate-950">
              <img
                :src="clientProject.imageUrl"
                :alt="clientProject.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-6 flex-grow flex flex-col gap-4">
              <h4 class="text-xl font-bold text-white font-poppins group-hover:text-accent-blue transition-colors">
                {{ clientProject.name }}
              </h4>
              <p class="text-slate-300 text-sm leading-relaxed line-clamp-3">
                {{
                  te(`projects.descriptions.${clientProject.name}`)
                    ? t(`projects.descriptions.${clientProject.name}`)
                    : clientProject.description
                }}
              </p>
              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="tool in clientProject.tools"
                  :key="tool"
                  class="px-3 py-1 bg-white/5 text-xs font-medium rounded-full text-slate-300"
                >
                  {{ tool }}
                </span>
              </div>
              <div class="mt-4 pt-4 border-t border-white/5">
                <a
                  v-if="clientProject.type !== 'none'"
                  :href="clientProject.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-xs font-bold text-center text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
                  {{ clientProject.linkText || t("projects.visit_project") }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { t, te } = useI18n();

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
