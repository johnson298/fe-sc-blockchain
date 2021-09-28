<template>
    <div>
        <el-upload 
            class="v-upload-media" 
            style="margin-top: -20px"
            action="" 
            ref="file"
            :accept="accept" 
            :auto-upload="false"
            :disabled="isDisable" 
            :show-file-list="false" 
            :on-change="handleAvatarSuccess">
            <div 
                slot="tip" class="v-upload"
                @dragover="dragover" @dragleave="dragleave" @drop="drop"
                v-loading="busy"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :style="{background: !previewUrl ? '#2F2640' : ''}">
                <template v-if="!previewUrl">
                    <h5>Drag & Drop</h5>
                    <h5>Or</h5>
                    <label @click="onChange"
                        for="assetsFieldHandle"
                        class="block cursor-pointer choose-file">Choose file
                    </label>
                    <h6 class="accept">{{ textAccept }}</h6>
                </template>
                <div v-if="previewUrl" class="image-upload">
                    <span class="close" @click.stop="removeImage"><img src="@/assets/images/icon/close.svg" alt=""></span>
                    <template v-if="type == 1">
                    <img :src="previewUrl" alt="">
                    </template>
                    <template v-else-if="type == 2">
                        <audio controls>
                            <source :src="previewUrl" type="audio/mpeg">
                        </audio>
                    </template>
                    <template v-else-if="type == 3">
                        <video width="auto" height="145px" controls>
                            <source :src="previewUrl" type="video/mp4">
                        </video>
                    </template>
                </div>
            </div>
        </el-upload>
        <p v-if="errorMessage" class="text-small text-left text-danger"
            style="margin-bottom: -20px;"
            :style="{'margin-top': previewUrl ? '-20px' : ''}">{{ errorMessage }}</p>
    </div>
  
</template>

<script>

const TYPE = {
  image: 1,
  audio: 2,
  video: 3
}

export default {
    props: {
        value: {
            type: [Uint8Array],
            default: ''
        },
        useImageDefault: {
            type: Boolean,
            default: false
        },
        maxSize: {
            type: Number,
            default: 100
        },
        width: {
            type: Number,
            default: 150
        },
        height: {
            type: Number,
            default: 150
        },
        isDisable: {
            type: Boolean,
            default: false
        },
        isImage: {
            type: Boolean,
            default: false
        },
        textAccept: {
            type: String,
            default: ''
        },
        accept: {
            type: String,
            default: 'image/png, image/jpeg'
        },
        messError: {
            type: String,
            default: ''
        },
        customErrorMess: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            type: null,
            previewUrl: typeof this.value === 'string' ? this.value : '',
            errorMessage: '',
            busy: false
        }
    },
    
    mounted() {},

    methods: {
        onChange() {
            this.$refs.file.$el.getElementsByTagName('input')[0].click();
        },

        addImageProcess(src){
            return new Promise((resolve, reject) => {
                let _URL = window.URL
                let objectUrl = _URL.createObjectURL(src.raw)
                let img = new Image()
                img.onload = () => {
                    resolve(img)
                    _URL.revokeObjectURL(objectUrl);
                }
                img.onerror = reject
                img.src = objectUrl
            })
        },
        
        async handleAvatarSuccess(file) {
            this.busy = true
            // Check site image upload
            this.errorMessage = '';
            
            const isLt2M = file.raw.size / 1024 / 1024 < this.maxSize
            if (!isLt2M) {
                this.errorMessage = this.messError;
            }

            await this.handleAwait().then(() => {
                this.previewUrl = URL.createObjectURL(file.raw)
                this.busy = false
            })

            // Check file image upload
            const isType = file.raw.type

            if (this.isImage && isType != 'image/png') {
                this.errorMessage = this.messError;
            }

            if (!['image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mpeg'].includes(isType)) {
                this.errorMessage = this.messError;
                this.busy = false
            }

            /*image*/
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

            if (this.isImage && !validImageTypes.includes(isType)) {
                this.errorMessage = this.messError;
            }
            
            if(validImageTypes.includes(isType)){
                // Validate Dimension
                await this.addImageProcess(file).then((img) => {
                    if (img.width < 400 || img.height < 400) {
                        this.errorMessage = this.messError;
                    }
                })
                this.type = TYPE.image
            }

            if (this.isAudioType(file.raw.name)) {
                this.type = TYPE.audio
            }

            if (this.isVideoType(file.raw.name)) {
                this.type = TYPE.video
            }

            if (!this.errorMessage) {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file.raw)
                reader.onload = () => {
                    const buffer = Buffer(reader.result)
                    this.$emit('input', buffer);
                }
            } else {
                this.$emit('onReject', null)
            }
        },

        removeImage() {
            this.type = null
            this.previewUrl = null
            this.$emit('input', null);
            this.$emit('onReject', null)
            this.errorMessage = '';
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
            console.log('event', event.dataTransfer.files);
            event.preventDefault();
            const file = {
                raw: event.dataTransfer.files[0]
            }
            this.handleAvatarSuccess(file); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        }
    },

    watch: {
        customErrorMess(val) {
            if(val){
                this.errorMessage = val;
            }
        },

        value(val) {
            if (!val) this.previewUrl = null
        }
    }
}

</script>

<style>
</style>
