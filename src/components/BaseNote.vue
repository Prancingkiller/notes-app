<template>
    <div class="col">
    <div class="card h-100">
      <img src="" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{note.title}}</h5>
        <p class="card-text">{{note.text}}</p>
      </div>
      <div class="card-footer">
        <small v-if="note.temp==true" class="text-muted">Not Synced...</small>
        <small v-else class="text-muted">Online</small>
      </div>
    </div>
  </div>
</template>
<script>
export default{
    name:"BaseNote",
    props:{
        note:{
            type:Object
        }
    }
}
</script>