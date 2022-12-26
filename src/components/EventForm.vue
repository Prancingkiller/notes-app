<template>
    <div class="table">
        <div class="tr">
            <span class="td">(cell data)</span>
            <span class="td">(cell data)</span>
        </div>
        <form class="tr" method="post" action="blah.html">
            <span class="td"><input type="text"/></span>
            <span class="td"><input type="text"/></span>
        </form>
    </div>
</template>
<script>
export default{
    name:EventForm,
    props:{
        events:{
            type:Array
        }
    }
}
</script>
<style scoped>
DIV.table 
{
    display:table;
}
FORM.tr, DIV.tr
{
    display:table-row;
}
SPAN.td
{
    display:table-cell;
}
</style>