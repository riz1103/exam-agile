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
      <b-row v-for="(values, index) in valuesList" :key="index" class="rowfull">
        <b-col cols="8" class="rowdata">
          <div v-if="enableEdit != values.id">
            {{ index + 1 }}. {{ values.title }}
          </div>
          <b-input v-else v-model="valuesList[index].title"></b-input>
        </b-col>
        <b-col class="row-container mt-2">
          <b-button
            class="action-button"
            @click="edit(values)"
            variant="success"
            >{{ enableEdit != values.id ? "Edit" : "Save" }}</b-button
          >
          <b-button
            class="action-button"
            @click="deleteValues(values.id)"
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
            placeholder="Add Values"
            required
          ></b-form-input>
          <b-button
            class="add-button"
            @click="addValues"
            variant="primary"
            :disabled="!form.title"
            >Add Values</b-button
          >
        </b-col>
      </b-row>
    </b-overlay>
  </Layout>
</template>
<script>
import {
  getValues,
  postValues,
  deleteValues,
  updateValues,
} from "@/api/values";
export default {
  name: "values",
  data() {
    return {
      valuesList: [],
      form: {
        title: "",
        type: "values",
      },
      titleRules: [(v) => !!v || "Title is required"],
      isLoading: false,
      enableEdit: null,
    };
  },
  mounted() {
    this.fetchvalues();
  },
  methods: {
    fetchvalues() {
      this.isLoading = true;
      getValues()
        .then((resp) => {
          this.valuesList = resp;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
    },
    addValues() {
      this.isLoading = true;
      postValues(this.form)
        .then((resp) => {
          this.valuesList = resp;
          this.form.title = "";
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
    },
    deleteValues(id) {
      this.isLoading = true;
      deleteValues(id)
        .then((resp) => {
          this.valuesList = resp;
          this.form.title = "";
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err);
        });
    },
    updateValues(data) {
      this.isLoading = true;
      updateValues(data)
        .then((resp) => {
          this.valuesList = resp;
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
        this.updateValues(data);
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
