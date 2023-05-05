<template>
    <draggable
      class="dragArea"
      tag="ul"
      :list="tasks"
      :group="{ name: 'g1' }"
      item-key="name"
    >
      <div v-for="(element,i) in tasks" :key="i">
        <li>
          <p>{{ element.name }}</p>
          <nested-draggable :tasks="element.Lun" />
          <nested-draggable :tasks="element.Mar" />
          <nested-draggable :tasks="element.Mer" />
          <nested-draggable :tasks="element.Gio" />
          <nested-draggable :tasks="element.Ven" />
          <nested-draggable :tasks="element.Sab" />
          <nested-draggable :tasks="element.Dom" />
        </li>
      </div>
    </draggable>
  </template>
  <script>
  import { VueDraggableNext } from 'vue-draggable-next'
  export default {
    props: {
      tasks: {
        required: true,
        type: Array
      }
    },
    components: {
        draggable: VueDraggableNext
    },
    name: "nested-draggable"
  };
  </script>
  <style scoped>
  .dragArea {
    min-height: 50px;
    outline: 1px dashed;
  }
  </style>