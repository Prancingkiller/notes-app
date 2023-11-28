<template>
  <div class="field">
    <label class="label" :for="label">{{ label }}</label>
    <div class="control">
      <div class="select">
        <select
          :name="label"
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
        >
          <option
            v-for="option in options"
            :key="option"
            :value="option"
            :selected="option === modelValue"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
