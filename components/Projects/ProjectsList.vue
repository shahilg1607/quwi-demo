<template>
  <div class="projects-block">
    <div
      v-for="project in projects"
      :key="project.id"
      class="card projects-block__card spacing-bottom"
      @click="showModal(project.id)"
    >
      <div class="card__content projects-block__content">
        <div class="projects-block__project-name">
          <img
            :src="project.logo_url"
            class="projects-block__project-image"
            height="50"
            width="50"
          />
          <div class="spacing-left">{{ project.name }}</div>
        </div>
        <div class="text-success">
          {{ project.is_active ? 'Active' : 'In Active' }}
        </div>
        <div class="projects-block__project-time">
          <div class="row projects-block__project-time--spacing">
            <div class="column">time this week</div>
            <div class="column">
              <strong class="spacing-left">
                {{ project.weeklyTime || '00:00:00' }}
              </strong>
            </div>
          </div>
          <div class="row projects-block__project-time--spacing">
            <div class="column">this month</div>
            <div class="column">
              <strong class="spacing-left">
                {{ project.monthlyTime || '00:00:00' }}
              </strong>
            </div>
          </div>
          <div class="row projects-block__project-time--spacing">
            <div class="column">total</div>
            <div class="column">
              <strong class="spacing-left">
                {{ project.totalTime || '00:00:00' }}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProjectManageModal
      v-if="isModalVisible"
      :project-id="selectedProjectId"
      @close="closeModal"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectManageModal from './ProjectManageModal.vue'

export default {
  name: 'ProjectList',

  components: {
    ProjectManageModal,
  },

  data() {
    return {
      projects: [],
      isModalVisible: false,
      selectedProjectId: 0,
    }
  },

  computed: {
    ...mapGetters({
      getAllProjects: 'projects/getAllProjects',
    }),
  },

  mounted() {
    this.initialize()
  },

  methods: {
    ...mapActions({
      fetchProjects: 'projects/fetchProjects',
    }),

    async initialize() {
      await this.fetchProjects()
      this.projects = this.getAllProjects
    },

    showModal(id) {
      this.isModalVisible = true
      this.selectedProjectId = id
    },

    closeModal() {
      this.isModalVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.projects-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 800px;

  &__card {
    cursor: pointer;
    &:hover {
      background: #ececec;
    }
  }

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__project-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0.3;
  }

  &__project-time {
    flex: 0.3;

    &--spacing {
      margin: $spacing-xxs 0;
    }
  }

  &__project-image {
    border-radius: 50%;
  }
}
</style>
