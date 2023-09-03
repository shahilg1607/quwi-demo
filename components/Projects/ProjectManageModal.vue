<template>
  <QuwiModal title="Edit Project Detail" size="medium" @close="closeModal">
    <template #body>
      <div class="project-manage">
        <div class="row">
          <div class="column align-item-center">
            <img
              :src="selectedProject.logo_url"
              class="project-manage__project-image"
              height="80"
              width="80"
            />
          </div>
        </div>

        <div class="row">
          <ValidationProvider
            v-slot="{ errors }"
            class="column align-item-center"
            name="Password"
            rules="required"
          >
            <input
              v-model="selectedProject.name"
              type="text"
              :class="{
                'input--danger': errors[0],
                'input--secondary': !errors[0],
              }"
              class="w-80"
              placeholder="Project name"
              autocomplete="off"
            />
          </ValidationProvider>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="btn btn--primary spacing-left" type="submit" @click="save">
        Save
      </button>
    </template>
  </QuwiModal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QuwiModal from '../QuwiModal/QuwiModal.vue'

export default {
  name: 'ProjectManageModal',

  components: {
    QuwiModal,
  },

  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      selectedProject: {},
      toastMessage: null,
    }
  },

  computed: {
    ...mapGetters({
      getProjectDetail: 'projects/getProjectDetail',
    }),
  },

  created() {
    this.selectedProject = this.getProjectDetail(this.projectId)
  },

  methods: {
    ...mapActions({
      manageProject: 'projects/manageProject',
      addNotification: 'toaster/addNotification',
    }),

    async save() {
      try {
        await this.manageProject(this.selectedProject)
        this.addNotification({
          message: 'Project details is updated successfully.',
        })

        this.closeModal()
      } catch (err) {
        this.addNotification({
          message:
            'Something went wrong while editing project detail. Please try in some time.',
        })
      }
    },

    removeToastMessage() {
      this.toastMessage = null
    },

    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.project-manage {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__project-image {
    border-radius: 50%;
  }
}
</style>
