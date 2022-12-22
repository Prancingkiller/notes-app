<template>
    <div class="col">
    <div class="card h-100">
      <img src="" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text">{{text}}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
</template>
<script>
export default{
    name:"BaseNote",
    props:{
        title:{
            type:String
        },
        text:{
            type:String
        }
    }
}
</script>