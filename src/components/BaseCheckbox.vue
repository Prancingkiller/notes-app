<template>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
        {{ label }}
      </label>
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
      type: Boolean,
      default: false
    }
  }
}
</script>
