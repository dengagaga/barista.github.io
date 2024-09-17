<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import topMain from '@/components/TopMain.vue'
import Menu from '@/components/menu.vue'
import topMainInfo from '@/components/TopMainInfo.vue'
const name = ref('')
const id = ref('')
const time = ref('')
const timeTrue = ref(false)
const arrayInformationTime = ref()

const result = new Date().toLocaleTimeString();


const clear = () => {
  localStorage.clear()
}
if (localStorage.getItem('name')) {
  id.value = localStorage.getItem('id')
  name.value = localStorage.getItem('name')
}

  const baristaName = ref(localStorage.getItem('baristaName'))
  const catName = ref(localStorage.getItem('catName'))
  const cityName = ref(localStorage.getItem('cityName'))
  const dateCreate = ref(localStorage.getItem('dateCreate'))
  const placeName = ref(localStorage.getItem('placeName'))


onMounted(() => {
  if (localStorage.getItem('workToken')) {
  timeTrue.value = true
}
  if (localStorage.getItem('time')) {
    time.value = localStorage.getItem('time')
    
}
if (localStorage.getItem('workToken')) {
  const information = () => {
  const token = localStorage.getItem('token')
  const workToken = localStorage.getItem('workToken')
  const userId = Number(localStorage.getItem('id'))
  axios
          .post(
            'http://cwbar.local/user/userListData',
            { user_id: userId, token:workToken },
            { headers: { Authorization: 'Bearer ' + token } }
          )
          .then(function (response) {
            arrayInformationTime.value = response.data.data[0].timestart
            function timeJs() {
              const timeGet = arrayInformationTime.value
              let firstDate = timeGet;
              let secondDate = result;        
              let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]); //получение даты из строки (подставляются часы и минуты
              let different = (getDate(secondDate) - getDate(firstDate));

              let hours = Math.floor((different % 86400000) / 3600000);
              let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
              let result2 = hours + 'ч' + ' ' + minutes + 'м'
              arrayInformationTime.value = result2
            }
            timeJs()
          })
          .catch(function (error) {
            console.log(error)
  })
}
  information()
  const tablPost = () => {
  const userId = Number(localStorage.getItem('id'))
  const token = localStorage.getItem('token')

    axios
          .post(
            'http://cwbar.local/user/countDayWork',
            { token: token, user_id: userId, from: "2024-09-11" , to:"2024-09-13"},
            { headers: { Authorization: 'Bearer ' + token } }
          )
          .then(function (response) {
            placeName.value = response.data.data[0].place_name
            
          })
          .catch(function (error) {
            console.log(error)
  })
  }
  tablPost()
}

})
</script>
<template>
  <div class="main_container">
    <topMain class="main_top-dop">
      <img class="main_top-img" src="../../public/profile.svg" alt="" />
      <div class="avtorizirovan" v-if="timeTrue"><span></span> Авторизирован ({{  arrayInformationTime }})</div>
      <div class="avtorizirovan avtorizirovan-3" v-else><span></span>Не авторизирован</div>
      <h2 class="main_top-title">{{ baristaName }}</h2>
      <!-- <div class="avtorizirovan-2">Категория Баристы: Первая</div> -->
      <div class="main_top-bottom">
        <router-link to="/qr" class="main_top-btn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M3 9h6V3H3zm1-5h4v4H4zm1 1h2v2H5zm10 4h6V3h-6zm1-5h4v4h-4zm1 1h2v2h-2zM3 21h6v-6H3zm1-5h4v4H4zm1 1h2v2H5zm15 2h1v2h-2v-3h1zm0-3h1v1h-1zm0-1v1h-1v-1zm-10 2h1v4h-1v-4zm-4-7v2H4v-1H3v-1h3zm4-3h1v1h-1zm3-3v2h-1V3h2v1zm-3 0h1v1h-1zm10 8h1v2h-2v-1h1zm-1-2v1h-2v2h-2v-1h1v-2h3zm-7 4h-1v-1h-1v-1h2v2zm6 2h1v1h-1zm2-5v1h-1v-1zm-9 3v1h-1v-1zm6 5h1v2h-2v-2zm-3 0h1v1h-1v1h-2v-1h1v-1zm0-1v-1h2v1zm0-5h1v3h-1v1h-1v1h-1v-2h-1v-1h3v-1h-1v-1zm-9 0v1H4v-1zm12 4h-1v-1h1zm1-2h-2v-1h2zM8 10h1v1H8v1h1v2H8v-1H7v1H6v-2h1v-2zm3 0V8h3v3h-2v-1h1V9h-1v1zm0-4h1v1h-1zm-1 4h1v1h-1zm3-3V6h1v1z"
              ></path>
              <path fill="none" d="M0 0h24v24H0z"></path>
            </g>
          </svg>
        </router-link>
        <router-link to="/finance" class="main_top-btn">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <circle cx="16" cy="16" fill="#fff" r="16"></circle> <path d="M10.5 15.238h1.764V7h4.547c.844 0 1.614.099 2.31.297.696.198 1.292.5 1.789.904s.886.917 1.168 1.536c.281.62.422 1.36.422 2.221s-.15 1.61-.447 2.247a4.478 4.478 0 01-1.218 1.588 5.113 5.113 0 01-1.813.943 7.91 7.91 0 01-2.261.31h-2.51v2.608h4v1.705h-4V25h-1.987v-3.641H10.5v-1.705h1.764v-2.608H10.5zm6.31 0c1.143 0 2.042-.271 2.696-.813.654-.543.982-1.365.982-2.467 0-1.101-.328-1.902-.982-2.401-.654-.5-1.553-.75-2.695-.75h-2.56v6.431z" fill="#000"></path> </g> </g></svg>
        </router-link>
        <router-link @click="clear()" class="main_top-btn" to="/">
          <svg height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.49975 16.7917C7.49975 16.9795 7.42074 17.1597 7.28009 17.2925C7.13944 17.4254 6.94868 17.5 6.74978 17.5H1.49995C1.10214 17.5 0.720621 17.3507 0.439325 17.0851C0.15803 16.8194 0 16.4591 0 16.0833V1.91667C0 1.54094 0.15803 1.18061 0.439325 0.914932C0.720621 0.649255 1.10214 0.5 1.49995 0.5H6.74978C6.94868 0.5 7.13944 0.574628 7.28009 0.707466C7.42074 0.840304 7.49975 1.02047 7.49975 1.20833C7.49975 1.39619 7.42074 1.57636 7.28009 1.7092C7.13944 1.84204 6.94868 1.91667 6.74978 1.91667H1.49995V16.0833H6.74978C6.94868 16.0833 7.13944 16.158 7.28009 16.2908C7.42074 16.4236 7.49975 16.6038 7.49975 16.7917ZM17.78 8.49885L14.0302 4.95719C13.8894 4.82428 13.6986 4.74961 13.4996 4.74961C13.3005 4.74961 13.1097 4.82428 12.969 4.95719C12.8282 5.0901 12.7492 5.27037 12.7492 5.45833C12.7492 5.6463 12.8282 5.82657 12.969 5.95948L15.4392 8.29167H6.74978C6.55087 8.29167 6.36011 8.36629 6.21947 8.49913C6.07882 8.63197 5.9998 8.81214 5.9998 9C5.9998 9.18786 6.07882 9.36803 6.21947 9.50087C6.36011 9.63371 6.55087 9.70833 6.74978 9.70833H15.4392L12.969 12.0405C12.8282 12.1734 12.7492 12.3537 12.7492 12.5417C12.7492 12.7296 12.8282 12.9099 12.969 13.0428C13.1097 13.1757 13.3005 13.2504 13.4996 13.2504C13.6986 13.2504 13.8894 13.1757 14.0302 13.0428L17.78 9.50115C17.8498 9.43536 17.9051 9.35724 17.9428 9.27125C17.9806 9.18526 18 9.09309 18 9C18 8.90691 17.9806 8.81474 17.9428 8.72875C17.9051 8.64276 17.8498 8.56464 17.78 8.49885Z"
              fill="#000"
            ></path>
          </svg>
        </router-link>
      </div>
    </topMain>

    <topMain>
      <h2 class="main_top-title-2">Информация:</h2>
      <topMainInfo title="Категория баристы" >
        <p>{{ catName }}</p>
      </topMainInfo>
      <topMainInfo title="Дата приема на работу" >
        <p>{{ dateCreate }}</p>
      </topMainInfo>
      <topMainInfo title="Город" >
        <p>{{ cityName }}</p>
      </topMainInfo>
      <topMainInfo title="Точка" >
        <p>{{ placeName }}</p>
      </topMainInfo>
    </topMain>
    
  </div>
  <Menu />
</template>

<style>
.main_container {
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}
.main_top {
  border-radius: 30px;
  background: var(--bgc-color);
  padding: 20px;
  box-shadow: 0px 4px 12px 0px rgba(13, 35, 67, 0.08);
  /* height: 300px; */
  color: #fff;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.main_top-dop {
  padding: 20px;
  align-items: center;
  justify-content: center;
}
.main_top-btn {
  width: 50px;
  margin-top: 20px;
  border-radius: 12px;
  border: 1px solid #fff;
  display: flex;
  background: #fff;
  box-shadow: 0px 4px 12px 0px rgba(13, 35, 67, 0.08);
  justify-content: center;
  align-items: center;
  padding: 3px;
}
.main_top-bottom {
  display: flex;
  gap: 20px;
}
.main_top-title {
  font-size: 18px;
  color: white;
  margin-top: 10px;
  text-transform: uppercase;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--btn-color);
  width: 100%;
  text-align: center;
}
.avtorizirovan-2 {
  font-size: 14px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--btn-color);
  width: 100%;
  font-weight: 500;
  text-align: center;
}
.avtorizirovan {
  margin-top: 5px;
  padding-left: 10px;
  position: relative;
  font-size: 14px;
}
.main_top-title-2 {
  font-size: 18px;
  padding-bottom: 10px;
  color: #fff;
  border-bottom: 2px solid var(--btn-color);
}

.main_top-img {
  max-width: 100px;
}
.avtorizirovan span {
  width: 8px;
  height: 8px;
  background-color: #4bb34b;
  position: absolute;
  top: 4.5px;
  left: -5px;
  border-radius: 50%;
}
.avtorizirovan-3 span{
  background-color: #ff0000;

}
</style>
