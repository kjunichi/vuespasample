<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useCounterStore } from '../stores/counter'
import { useUserStore } from '../stores/user'

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const username = ref('')
const password = ref('')

const counter = useCounterStore()
const user = useUserStore()

const doLogin = () => {
    console.log("doLogin start")
    counter.increment()
    axios.post('http://localhost:8080/api/login', {
                username: username.value,
                password: password.value
            })
            .then( res => {
                console.dir(res.headers)
                const token = res.headers['x-auth-token']
                console.log(token)
                user.saveToken(token)

            })
            .catch( e => {
                alert("ログインに失敗しました")
                console.log(e)
            })
    console.log(`doLogin end ${counter.count}`)
}

</script>

<template>
  <div class="login">
    <h1>Login page</h1>
    <form>
    <label>User ID</label>
    <input v-model="username" type="text" placeholder="cstomer id"/>
    <label>Password</label>
    <input v-model="password" type="password"/>
    <button type="submit" @click.prevent="doLogin">Sign In</button>
    </form>
    <p>Count:{{ counter.count }}</p>
  </div>
</template>