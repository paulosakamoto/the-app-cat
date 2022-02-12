<template>
  <div class="hello">
    <div>
      Per page:
      <b-form-select v-model="pagination.perPage" :options="pagination.perPageOptions"></b-form-select>
    </div>
    <b-pagination
        v-model="pagination.currentPage"
        :total-rows="pagination.totalRows"
        :per-page="pagination.perPage"
        aria-controls="table-index"
    ></b-pagination>
    <b-table
        id="table-index"
        ref="table"
        striped
        hover
        :items="fetchApi"
        :fields="headers"
        :busy.sync="isBusy"
        :current-page="pagination.currentPage"
        :per-page="pagination.perPage"
    >
      <template #cell(code)="data">
        <a href="javascript:;" @click="openModal(data.item)">
          {{data.item.id}}
        </a>
      </template>
      <template #cell(image)="data">
        <a href="javascript:;" @click="openModal(data.item)">
          <img :src="data.item.url" width="100px" height="auto">
        </a>
      </template>
    </b-table>
    <b-pagination
        v-model="pagination.currentPage"
        :total-rows="pagination.totalRows"
        :per-page="pagination.perPage"
        aria-controls="table-index"
    ></b-pagination>
    <modal ref="modal"></modal>
  </div>
</template>

<script>
import api from '../services/catapi';
import modal from './Modal';
export default {
  name: 'Index',
  components: {
    modal
  },
  data() {
    return {
      isBusy: false,
      pagination: {
        currentPage: 1,
        perPage: 3,
        totalRows: 0,
        perPageOptions: [
          {value: 3, text: '3'},
          {value: 10, text: '10'},
          {value: 50, text: '50'},
          {value: 100, text: '100'},
        ]
      },
      collection: [],
      headers: [
        {key: 'code', label: '#'},
        'image'
      ]
    }
  },
  methods: {
    provider(ctx) {
      let {perPage, currentPage} = ctx;
      currentPage = currentPage || 1;
      perPage = perPage || 10;
      perPage = 3;
      this.pagination.perPage = perPage;
      this.pagination.currentPage = currentPage;
      return this.fetchApi();
    },
    fetchApi() {
      this.isBusy = true;
      let {perPage, currentPage} = this.pagination;
      const params = `?limit=${perPage}&page=${currentPage}&order=Desc`;
      const url = `/v1/images/search${params}`;
      return api.get(url)
          .then(({data, headers}) => {
            this.pagination.totalRows = headers['pagination-count'];
            this.isBusy = false;
            return data;
          })
          .catch(() => {
            return [];
          }
      );
    },
    openModal(item){
      this.$refs.modal.setItem(item);
      this.$refs.modal.show();
    }
  }
}
</script>
