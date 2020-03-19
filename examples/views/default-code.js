const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: '我和我的祖国'
            }
        },
        methods: {
          hello(){
            console.log('hello')
          }
        }
    }
</script>`;

export default code;