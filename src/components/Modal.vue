<template>
  <div class="hello">
    <b-modal :id="id" :title="item.id" size="lg">
      <p class="my-4">
        Id: {{ item.id }}
      </p>
      <p class="my-4">
        Size: {{ item.width }}x{{ item.height }}px
      </p>
      <p class="my-4">
        Url:
        <a :href="item.url" target="_blank" rel="nofollow">
          {{ item.url }}
        </a>
      </p>
      <p class="my-4">
        Image: <br>
        <img :src="item.url" width="80%" height="auto">
      </p>
      <template #modal-footer>
        <div class="w-100 text-end">
          <b-button
              variant="secondary"
              size="md"
              @click="hide"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      id: 'modal-detail',
      item: {}
    }
  },
  methods: {
    setItem(item) {
      this.item = item;
    },
    show() {
      this.$bvModal.show(this.id)
    },
    hide() {
      this.$bvModal.hide(this.id)
    }
  }
}
</script>
