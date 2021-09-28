<template>
  <div>
    <div class="v-upload-media"
         v-loading="busy"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div
        class="v-upload"
        :style="{background: !file.src ? '#2F2640' : ''}"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop">
        <input
          type="file"
          name="fields"
          id="assetsFieldHandle"
          class="file-input"
          @change="onChange"
          ref="file"
          :accept="accept" />
        <template v-if="!file.src">
          <h5>Drag & Drop</h5>
          <h5>Or</h5>
          <label
            for="assetsFieldHandle"
            class="block cursor-pointer choose-file">Choose file</label>
          <h6 class="accept">{{text}}</h6>
        </template>
        <div v-if="file.src" class="image-upload">
          <span class="close" @click="removeImage"><img src="@/assets/images/icon/close.svg" alt=""></span>
          <template v-if="file.type === 1">
            <img :src="file.src" alt="">
          </template>
          <template v-else-if="file.type === 2">
            <audio controls>
              <source :src="file.src" type="audio/mpeg">
            </audio>
          </template>
          <template v-else-if="file.type === 3">
            <video width="auto" height="145px" controls>
              <source :src="file.src" type="video/mp4">
            </video>
          </template>
        </div>
      </div>
    </div>
    <p v-show="errorMessage"
       class="text-small text-danger"
       style="margin-bottom: -25px">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { isAudioType, isVideoType } from '@/utils/helpers';

const TYPE = {
  image: 1,
  audio: 2,
  video: 3
}
export default {
  name: "VUpload",

  props:  {
    messError: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number
    },
    onlyImage: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '*'
    },
    value: {
      default: null
    },
    customErrorMess: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      file: {
        type: null,
        src: null
      },
      busy: false,
      errorMessage: ''
    }
  },

  methods: {
    onChange(e) {
      this.busy = true
      this.errorMessage = ''
      const src = e.target.files[0];

      const {type: typeMedia, name: nameMedia, size} = src;
      const sizeMedia = size/(1024*1024) // convert bytes -> Mb

      if(this.maxSize){
        if(sizeMedia > this.maxSize){
          this.errorMessage = this.messError;
          return false;
        }
      }

      let file = null;

      /*image*/
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/bmp'];
      if(validImageTypes.includes(typeMedia)){
        // Validate Dimension
        let _URL = window.URL
        const img = new Image();
        let objectUrl = _URL.createObjectURL(src);
        img.onload = () => {
          // alert(img.width + " " + img.height);
          if (img.width < 400 || img.height < 400) {
            this.errorMessage = this.messError;
          }
          _URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl

        file = {
          type: TYPE.image,
          src: URL.createObjectURL(src)
        };
      } else {
        if(this.onlyImage){
          this.errorMessage = this.messError;
        }
      }

      if(!this.onlyImage){
        /*audio: mp3*/
        if(isAudioType(nameMedia)) {
          file = {
            type: TYPE.audio,
            src: URL.createObjectURL(src)
          };
        }

        /*video: mp4*/
        if(isVideoType(nameMedia)){
          file = {
            type: TYPE.video,
            src: URL.createObjectURL(src)
          };
        }
      } else {
        this.file = {
          type: null,
          src: null
        };
        this.$refs.file.value = "";
      }

      console.log('file', file);

      if(file) {
        this.file = file;
        this.errorMessage = '';
        const reader = new FileReader()
        reader.readAsArrayBuffer(src)
        reader.onload = () => {
          const buffer = Buffer(reader.result)
          this.$emit('input', buffer);
        }
      }

      setTimeout(() => this.busy = false, 500)
    },

    removeImage() {
      this.file = {
        type: null,
        src: null
      };
      this.$emit('input', null);
      this.errorMessage = '';
      this.$refs.file.value = "";
    },

    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },

    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },

    drop(event) {
      event.preventDefault();
      event.target.files = event.dataTransfer.files;
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(event); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }
  },

  watch: {
    value(val) {
      if(!val)
        this.file = {
          type: null,
          src: null
        };
        this.$refs.file.value = "";
    },

    errorMessage() {
      this.$emit('onError', !!this.errorMessage);
    },

      customErrorMess(val) {
      if(val){
        this.errorMessage = val;
      }
    }
  }
}
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}
</style>
