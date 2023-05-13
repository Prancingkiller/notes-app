<template>
    <draggable
    class="dragArea"
    tag="ul"
    :list="shifts"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <template #item="{ element }">
      <li>
        <p>shift</p>
        <nested-draggable :shifts="element" />
      </li>
    </template>
  </draggable>
</template>
<script>
import { VueDraggableNext } from 'vue-draggable-next'
export default{
		name:"BaseNestedShift",
		props:{
				shifts:{
						type:Object
				}
		},
        components: {
		draggable: VueDraggableNext
        }
}        
</script>