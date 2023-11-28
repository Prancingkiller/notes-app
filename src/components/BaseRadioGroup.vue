<template>
  <div class="field">
    <div class="control">
      <BaseRadio
        v-for="option in options"
        :key="option.label"
        :label="option.label"
        :value="option.value"
        :name="name"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script>
import BaseRadio from "./BaseRadio";

export default {
  components: {BaseRadio},
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
