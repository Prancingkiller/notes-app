<template>
    <div v-if="logged">
        <span style="color:white">Ciao {{ username }}, {{ company }} </span>
        <button class="btn btn-outline-success" type="button" @click.prevent="logout">Logout</button>
    </div>
    <div v-else>
        <BaseInput label="email" v-model="formData.email" />
        <BaseInput label="password" v-model="formData.password" type="password" />
        <button class="btn btn-outline-success" type="button" @click.prevent="login">Login</button>
    </div>
</template>
<script>
import BaseInput from '../components/BaseInput';
import { onMounted,ref } from 'vue';
import LogMethods from '../api/resources/LogMethods';
export default{
    name:"LoginForm",
    setup(){
        const formData = ref({
            email:'',
            password:''
        });
        const logged = ref(false);
        const username = ref(null);
        const company = ref(null);
        function CheckLogged(){
            if(localStorage.getItem("logged")){
                logged.value=true;
                username.value = localStorage.getItem("username")
                company.value = localStorage.getItem("company")
            }
        }
        onMounted(CheckLogged);

        async function login(){
            const data = JSON.stringify(formData.value)
            const response = await LogMethods.Login(data)
            if(response.login == "success"){
                localStorage.setItem('logged', true);
                localStorage.setItem('username', response.username);
                localStorage.setItem('email', response.email);
                localStorage.setItem('company', response.company_name);
                CheckLogged()
            }
            else{
                alert("error")
            }
        }
        async function logout(){
            const response = await LogMethods.Logout();
            if(response.logout == "success"){
                localStorage.clear();
                logged.value=false;
            }
            CheckLogged()
        }

        return{logged,formData,login,logout,username,company}
    },

    components:{
        BaseInput
    }
    
}
</script>