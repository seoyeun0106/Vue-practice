<template>
    <div>
        <h1>Seo yeun Mun</h1>
        <router-link to="/about">
        <h2>
            About
        </h2>
        </router-link>
        <router-link to="/todo">
        <h2>
            Todo
        </h2>
        </router-link>
    </div>
</template>
<script>
export default{
    name:"Main-page",
}

</script>
<style scoped lang="scss">
div{
    text-align: center;
 h1,h2{
 color: white;
 margin: 2rem;
 }
 a{
    text-decoration:none;
 }
}
</style>