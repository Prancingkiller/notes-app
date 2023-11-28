<template>
  <div class="field">
    <label class="label" :for="label">{{ label }}</label>
    <div class="control">
      <input
        v-bind="$attrs"
        class="input"
        :name="label"
        :id="label"
        :value="modelValue"
        :placeholder="label"
        @input="$emit('update:modelValue', $event.target.value)"
        :aria-describedby="error ? `${label}-error` : null"
        :aria-invalid="error ? true : null"
      >
    </div>
    <p v-if="error" :id="`${label}-error`" aria-live="assertive">{{ error }}</p>
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
    error: {
      type: String,
      default: ''
    }
  }
}
</script>
