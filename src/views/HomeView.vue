<template>
  <div class="container">
    <div class="row" style="max-width:500px;margin:auto">
      <div class="col-6">
        <font-awesome-icon icon="note-sticky" class="fa-10x" @click="goNotes" />
      </div>
      <div class="col-6">
        <font-awesome-icon icon="calendar" class="fa-10x" @click="goCalendar" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import indexedMethods from "../api/resources/indexedMethods"
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'HomeView',

  setup() {
    const router = useRouter()
    const db = indexedMethods.initiate();

    function goNotes() {
      router.push({
        name: 'notes'
      })
    }
    function goCalendar() {
      router.push({
        name: 'calendar'
      })
    }
    return { db, goCalendar, goNotes }
  }
}
</script>