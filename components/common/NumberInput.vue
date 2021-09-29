<template>
    <div class="el-input-number-custom is-controls-right">
        <div class="el-input-number-custom__icon">
            <span role="button" class="el-input-number-custom__decrease" @click="decreaseValue"><i class="el-icon-caret-bottom"></i></span>
            <span role="button" class="el-input-number-custom__increase" @click="increaseValue"><i class="el-icon-caret-top"></i></span>
        </div>
        <div class="el-input">
            <input
                ref="number"
                class="el-input__inner"
                type="text" :value="value"
                :placeholder="placeholder"
                :disabled="isDisable"
                @keyup.enter="$emit('enter')">
            <small v-if="erorrMessage" class="text-danger">{{ erorrMessage }}</small>
        </div>
    </div>

</template>

<script>
import Cleave from 'cleave.js'

export default {
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        placeholder: {
            type: String,
            default: ''
        },
        erorrMessage: {
            type: String,
            default: ''
        },
        isDisable: {
            type: Boolean,
            default: false
        },
        maxValue: {
            type: Number
        }
    },
    data() {
        return {
            cleave: null
        }
    },
    mounted() {
        // eslint-disable-next-line no-new
        this.cleave = new Cleave(this.$refs.number, {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            // blocks: [3, 3, 3, 3, 3],
            onValueChanged: e => {
                const { value } = e.target
                this.$nextTick(() => {
                    this.$emit('input', value)
                })
            }
        })
    },

    watch: {
        value(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        decreaseValue() {
            if (!this.value) return
            if (this.parseNumber(this.value) - 1 > this.maxValue) {
                this.$emit('input', this.formatMoney(this.parseNumber(this.maxValue)))
                return
            }
            this.$emit('input', this.formatMoney(this.parseNumber(this.value) - 1))
        },
        increaseValue() {
            if (this.parseNumber(this.value) >= this.maxValue) {
                this.$emit('input', this.formatMoney(this.parseNumber(this.maxValue)))
                return
            }
            if ((this.parseNumber(this.value) + 1) > this.maxValue) return
            this.$emit('input', this.formatMoney(this.parseNumber(this.value) + 1))
        }
    },

    beforeDestroy() {
        this.cleave.destroy()
    },
}

</script>

<style></style>
