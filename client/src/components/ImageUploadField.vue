<!-- ImageUpload.vue -->

<template>
  <div>
    <div class="image-upload-container">
      <Field
        name="productPicture"
        id="productPicture"
        type="file"
        :rules="schema?.picture"
        @change="handleImageUpload"
        ref="fileInput"
      />
      <img
        v-if="selectedPicture"
        :src="selectedPictureUrl"
        alt="Uploaded Product"
      />
      <div class="upload-icon" v-else>+</div>
    </div>
  </div>
</template>

<script>
import { Field } from "vee-validate";
import { IMAGE_REQ } from "../utils/constant";
import { ref } from "vue";

export default {
  props: {
    schema: Object, // Pass the schema as a prop
    pictureName: String,
  },
  components: { Field },
  data() {
    return {
      IMAGE_REQ,
    };
  },
  setup(props) {
    const selectedPictureUrl = ref(`${IMAGE_REQ}${props?.pictureName}` || null);
    let selectedPicture = ref(false);
    if (props?.pictureName) selectedPicture.value = true;
    return { selectedPictureUrl, selectedPicture };
  },
  methods: {
    handleImageUpload() {
      const input = this.$refs.fileInput.$el;
      const file = input.files[0];

      if (file) {
        this.selectedPicture = file;
        this.selectedPictureUrl = URL.createObjectURL(file);
        console.log(this.selectedPictureUrl);
      }
    },
  },
};
</script>

<style scoped>
.upload-label {
  display: block;
  margin: 10px 0px;
}

.image-upload-container {
  position: relative;
  width: 100px; /* Set the desired width for the square container */
  height: 100px; /* Set the desired height for the square container */
  background-color: #f0f0f0b2; /* Gray background color */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(245, 245, 245);
  border-radius: 15px;
  margin-top: 10px;
}

input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the entire container */
  border-radius: 4px; /* Optional: Add border-radius for rounded corners */
}

.upload-icon {
  font-size: 36px;
  color: #888; /* Color for the plus sign */
}
</style>
