<template>
    <div class="example" :class="color">{{ msg }}</div>
</template>
<script>
    export default {
        props:['color'],
        data () {
            return {
                msg: 'Hello Webpack!'
            }
        }
    }
</script>
<style>
    .example {
        color: green;
    }
    .example.red {
        color:red;
    }
</style>