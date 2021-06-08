<template>
  <Layout>
    <b-overlay
      :show="isLoading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-inline-block"
    >
      <b-row
        v-for="(principle, index) in principleList"
        :key="index"
        class="rowfull"
      >
        <b-col cols="8" class="rowdata">
          <div v-if="enableEdit != principleList[index].id">
            {{ index + 1 }}. {{ principle.title }}
          </div>
          <b-input v-else v-model="principleList[index].title"></b-input>
        </b-col>
        <b-col class="row-container">
          <b-button
            class="action-button"
            @click="edit(principle)"
            variant="success"
            >{{ enableEdit != principle.id ? "Edit" : "Save" }}</b-button
          >
          <b-button
            class="action-button"
            @click="deletePrinciple(principle.id)"
            variant="danger"
            >Delete</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col class="addnew">
          <b-form-input
            id="input-title"
            v-model="form.title"
            placeholder="Add Principle"
            required
          ></b-form-input>
          <b-button
            class="add-button"
            @click="addPrinciple"
            variant="primary"
            :disabled="!form.title"
            >Add Principle</b-button
          >
        </b-col>
      </b-row>
    </b-overlay>
  </Layout>
</template>
<script>
import {
  getPrinciples,
  postPrinciples,
  deletePrinciples,
  updatePrinciples,
} from "@/api/principles";
export default {
  name: "principles",
  data() {
    return {
      principleList: [],
      form: {
        title: "",
        type: "principles",
      },
      titleRules: [(v) => !!v || "Title is required"],
      isLoading: false,
      enableEdit: null,
    };
  },
  mounted() {
    this.fetchPrinciples();
  },
  methods: {
    fetchPrinciples() {
      this.isLoading = true;
      getPrinciples()
        .then((resp) => {
          this.principleList = resp;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
    },
    addPrinciple() {
      this.isLoading = true;
      postPrinciples(this.form)
        .then((resp) => {
          this.principleList = resp;
          this.form.title = "";
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
    },
    deletePrinciple(id) {
      this.isLoading = true;
      deletePrinciples(id)
        .then((resp) => {
          this.principleList = resp;
          this.form.title = "";
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
    },
    updatePrinciple(data) {
      this.isLoading = true;
      updatePrinciples(data)
        .then((resp) => {
          this.principleList = resp;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
      this.enableEdit = null;
    },

    edit(data) {
      debugger;
      if (this.enableEdit) {
        this.updatePrinciple(data);
      } else {
        this.enableEdit = data.id;
      }
    },
  },
};
</script>
<style scoped>
.addnew {
  margin: 10px;
  display: -webkit-inline-box;
}
.rowdata {
  margin: 10px;
  font-size: large;
}
.row-container {
  position: relative;
}
.action-button {
  margin: 10px;
}
.add-button {
  margin-left: 10px;
}
.rowfull:hover {
  background-color: antiquewhite;
}
</style>
