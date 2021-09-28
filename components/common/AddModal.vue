<template>
  <el-dialog
    custom-class="modal-add-attr radius-10"
    :close-on-click-modal="false"
    class="modal-add"
    :title="title"
    :visible.sync="isShown"
    width="638px"
    :before-close="onClose"
    @close="onClose"
    centered>
    <template v-if="type === 'properties'">
      <p>E.g: Trait describes the degree to which a character or other entity in a role-playing game possesses a specific innate characteristic common to all characters in the game.</p>
      <table>
        <tr class="tr-title">
          <td></td>
          <td>Type</td>
          <td>Name</td>
        </tr>
        <tr v-for="(props, index) in properties" :key="`p_${index}`" class="tr-item">
          <td class="remove" @click="remove(index)">x</td>
          <td>
            <el-input v-model="props.type"></el-input>
          </td>
          <td>
            <el-input v-model="props.name"></el-input>
          </td>
        </tr>
      </table>
      <el-button class="btn-add" @click="add()">Add more</el-button>
    </template>
    <template v-if="type === 'levels'">
      <p>E.g: The stage or rank of a player character in a role-playing game or video game</p>
      <table>
        <tr class="tr-title">
          <td></td>
          <td>Name</td>
          <td>Value</td>
          <td>MaxValue</td>
        </tr>
        <tr v-for="(level, index) in levels" :key="`l_${index}`" class="tr-item">
          <td class="remove" @click="remove(index)">x</td>
          <td>
            <el-input v-model="level.name"></el-input>
          </td>
          <td>
            <el-input
              type="number"
              v-model="level.value"
              @onValid="level.value = $event"
              v-valid-number />
          </td>
          <td>
            <el-input
              type="number"
              v-model="level.maxValue"
              v-valid-number />
          </td>
        </tr>
      </table>
      <el-button class="btn-add" @click="add()">Add more</el-button>
    </template>
    <template v-if="type === 'stats'">
      <p>E.g: Number describing an aspect of a game entity. A game entity might be a monster, character, weapon or spell.</p>
      <table>
        <tr class="tr-title">
          <td></td>
          <td>Name</td>
          <td>Value</td>
          <td>MaxValue</td>
        </tr>
        <tr v-for="(stat, index) in stats" :key="`t_${index}`" class="tr-item">
          <td class="remove" @click="remove(index)">x</td>
          <td>
            <el-input v-model="stat.name"></el-input>
          </td>
          <td>
            <el-input
              type="number"
              v-model="stat.value"
              v-valid-number />
          </td>
          <td>
            <el-input
              type="number"
              v-model="stat.maxValue"
              v-valid-number />
          </td>
        </tr>
      </table>
      <el-button class="btn-add" @click="add()">Add more</el-button>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" class="text-16 lh-24 fw-600" @click="onSubmit">Save</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  name: "AddModal.vue",
  props: {
    type: {
      type: String, // properties, levels, stats
      default: null
    },
    isShown: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: [Array, Object],
      default: null
    }
  },
  data() {
    return {
      xx: 1332,
      properties: [
        {
          type: '',
          name: ''
        }
      ],
      levels: [
        {
          name: '',
          value: '',
          maxValue: ''
        }
      ],
      stats: [
        {
          name: '',
          value: '',
          maxValue: ''
        }
      ]
    }
  },

  created() {
    if(this.data && this.data.length)
      this[this.type] = _.cloneDeep(this.data);
  },

  methods: {
    onClose() {
      this.$emit('close', false);
    },

    onSubmit() {
      if (this.type == 'levels') {
        let tmp = true
        _.forEach(this.levels, item => {
          if (item.value == 0 || item.maxValue == 0 ||
            parseInt(item.value) > parseInt(item.maxValue)) {
            tmp = false
            return
          }
        })
        if (!tmp) return
      }
      if (this.type == 'stats') {
        let tmpStat = true
        _.forEach(this.stats, item => {
          if (item.value == 0 || item.maxValue == 0 ||
            parseInt(item.value) > parseInt(item.maxValue)) {
            tmpStat = false
            return
          }
        })
        if (!tmpStat) return
      }
      this.$emit('onSubmit', this[this.type]);
      this.$emit('close', false);
    },

    add() {
      const type = this.type;
      switch (type){
        case 'properties':
          this.properties.push({
            name: '',
            value: ''
          })
          break;
        case 'levels':
          this.levels.push({
            name: '',
            value: '',
            maxValue: ''
          })
          break;
        case 'stats':
          this.stats.push({
            name: '',
            value: '',
            maxValue: ''
          })
          break;
        default:
          break;
      }
    },

    remove(index) {
      this[this.type].splice(index, 1);
    }
  }
}
</script>

<style scoped>
/deep/ input[type=number]::-webkit-outer-spin-button,
/deep/ input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
