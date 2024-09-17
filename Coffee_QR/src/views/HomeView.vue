<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
onMounted(() => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    console.log(token)
  }
})
// login=pirat&password=QWERTy1!
function sendDataToApi() {
  const url = `http://cwbar.local/auth/?login=${login.value}&password=${password.value}`
  axios
    .get(url)
    .then((response) => {
      console.log(response)

      if (response.data.status == 200) {
        setTimeout(() => router.push('/main'), 1000)
        
        eror.value = false
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('login', login.value)
        localStorage.setItem('password', password.value)
        localStorage.setItem('name', response.data.data.name)
        localStorage.setItem('id', response.data.data.id)
        axios
          .post(
            'http://cwbar.local/QRCode/get',
            { token: response.data.data.token },
            { headers: { Authorization: 'Bearer ' + response.data.data.token } }
          )
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
          sendDataToApi2()
      } else {
        if (login.value == null) {
          loginClass.value = false
        } else {
          loginClass.value = true
        }
        if (password.value == null) {
          passwordClass.value = false
        } else {
          passwordClass.value = true
        }
        router.push('/')
        console.log('Неверный логин или пароль')
        loginClass.value = false
        passwordClass.value = false
        eror.value = true
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
function sendDataToApi2() {
        const token = localStorage.getItem('token')
        axios
          .post(
            'http://cwbar.local/user/get',
            { token: token },
            { headers: { Authorization: 'Bearer ' + token } }
          )
          .then(function (response) {
          
            const baristaName = response.data.data[0].barista_name
            const catName = response.data.data[0].category_name
            const cityName = response.data.data[0].city_name
            const dateCreate = response.data.data[0].date_create
            const rublesHour = response.data.data[0].rubles_hour
            localStorage.setItem('baristaName', baristaName)
            localStorage.setItem('catName', catName)
            localStorage.setItem('cityName', cityName)
            localStorage.setItem('dateCreate', dateCreate)
            localStorage.setItem('rublesHour', rublesHour)
          })
          .catch(function (error) {
            console.log(error)
  })
}
const login = ref(null)
const password = ref(null)
const router = useRouter()
const eye = ref(true)
const loginClass = ref(true)
const passwordClass = ref(true)
const eror = ref(false)
</script>

<template>
  <div class="container_mobil">
    <form class="form">
      <svg
        class="form_img"
        width="220"
        height="52"
        viewBox="0 0 250 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_65_2562)">
          <path
            d="M15.2272 42.752C13.8251 43.3121 12.3189 43.5685 10.8091 43.5044C3.93184 43.5044 0 37.9129 0 28.6835C0 17.1898 6.12009 13.0617 11.476 13.0617C12.8411 12.9853 14.2039 13.2462 15.4427 13.8211L14.5465 17.8594C13.6676 17.4029 12.6818 17.1884 11.6914 17.2381C8.43335 17.2381 5.08502 20.2064 5.08502 28.3728C5.08502 36.408 8.12075 39.2866 11.7331 39.2866C12.7404 39.2775 13.7389 39.0977 14.6854 38.7551L15.2272 42.752Z"
            fill="white"
          />
          <path
            d="M27.3288 43.5941C21.3475 43.5941 18.3535 37.2915 18.3535 28.2416C18.3535 19.1917 21.7505 12.9789 27.8219 12.9789C34.1158 12.9789 36.6165 19.813 36.6165 27.8827C36.6165 39.1554 32.643 43.5941 27.3704 43.5941H27.3288ZM27.5996 39.4522C30.677 39.4522 31.6635 34.0817 31.6635 28.0966C31.6635 22.6778 30.7674 17.0931 27.551 17.0931C24.3347 17.0931 23.2649 22.6157 23.3067 28.1795C23.2649 34.0817 24.3833 39.4522 27.551 39.4522H27.5996Z"
            fill="white"
          />
          <path
            d="M42.2847 13.3309H54.6568V17.4729H47.064V26.3916H54.1636V30.3402H47.064V43.2559H42.2847V13.3309Z"
            fill="white"
          />
          <path
            d="M60.6382 13.3309H73.0035V17.4729H65.4177V26.3916H72.5172V30.3402H65.4177V43.2559H60.6382V13.3309Z"
            fill="white"
          />
          <path
            d="M90.9121 29.6153H83.7639V39.1141H91.8914V43.2559H78.9844V13.3309H91.3565V17.4729H83.7639V25.6805H90.9121V29.6153Z"
            fill="white"
          />
          <path
            d="M109.481 29.6153H102.34V39.1141H110.468V43.2559H97.5674V13.3309H109.919V17.4729H102.326V25.6805H109.467L109.481 29.6153Z"
            fill="white"
          />
          <path
            d="M127.521 43.2421L122.075 13.3309H127.035L128.953 26.3778C129.487 29.9742 129.842 32.5147 130.203 36.1526H130.335C130.738 32.4249 131.405 30.0571 132.079 26.3295L134.538 13.3309H138.463L140.783 26.1983C141.408 29.6153 141.992 32.1143 142.394 36.1526H142.485C142.929 32.0728 143.374 29.705 143.819 26.288L145.743 13.3309H150.433L144.875 43.2421H140.012L137.733 31.3481C137.198 28.3728 136.705 25.8738 136.309 22.3741H136.219C135.726 25.8808 135.232 28.2969 134.566 31.3964L132.148 43.2421H127.521Z"
            fill="white"
          />
          <path
            d="M158.602 35.4761L156.989 43.2421H152.349L159.046 13.3309H164.603L170.807 43.2421H166.187L164.576 35.4761H158.602ZM164.103 31.7691L162.853 24.8661C162.45 22.9193 162.046 20.165 161.735 18.0802H161.602C161.29 20.1512 160.838 23.0505 160.483 24.9144L159.144 31.7483L164.103 31.7691Z"
            fill="white"
          />
          <path
            d="M178.247 43.2422V31.2584L171.641 13.3103H176.684L179.004 20.5861C179.699 22.5881 180.344 24.8938 180.88 27.1578H180.97C181.462 24.9351 182.088 22.6708 182.756 20.455L184.84 13.3103H189.807L183.027 31.0789V43.2422H178.247Z"
            fill="white"
          />
          <path
            d="M221.178 18.1011C222.272 18.1011 223.322 17.669 224.096 16.9C224.87 16.131 225.304 15.088 225.304 14.0006C225.304 12.9131 224.87 11.8701 224.096 11.1011C223.322 10.3321 222.272 9.90015 221.178 9.90015C220.084 9.90015 219.034 10.3321 218.26 11.1011C217.486 11.8701 217.051 12.9131 217.051 14.0006C217.051 15.088 217.486 16.131 218.26 16.9C219.034 17.669 220.084 18.1011 221.178 18.1011Z"
            fill="#FFCA05"
          />
          <path
            d="M229.355 42.2895C227.576 41.3092 225.811 39.9562 225.638 36.0767C225.629 35.1651 225.516 34.2574 225.304 33.3706C224.295 35.1624 222.774 36.6176 220.934 37.5539C221.576 38.6912 222.34 39.7559 223.213 40.7293C225.006 42.7105 227.346 43.7598 228.951 43.7598C229.305 43.7529 229.66 42.4552 229.355 42.2895Z"
            fill="#FFCA05"
          />
          <path
            d="M224.79 30.8027C224.79 30.7336 224.79 30.6647 224.79 30.5956C224.79 30.5265 224.79 30.3747 224.79 30.3747V25.5425C226.825 26.7644 227.5 29.8777 228.034 31.2859C228.076 31.3964 228.361 31.4653 228.603 31.4653C228.847 31.4653 229.076 31.3894 229.118 31.272C229.813 29.0493 228.979 20.8484 222.733 19.737C221.986 19.6291 221.229 19.6013 220.476 19.6542C217.822 19.8958 217.127 21.663 217.106 22.8365V30.3885C217.106 30.6006 217.134 30.8121 217.19 31.0166C215.621 32.3935 214.359 34.0818 213.488 35.9731C212.654 37.7955 212.612 42.7865 213.328 44.0842C213.432 44.2844 213.765 44.3052 214.085 44.312C214.404 44.319 214.89 44.2361 214.904 44.0981C215.135 41.9167 215.28 38.8103 219.676 36.7601C223.846 34.834 224.638 31.8934 224.79 30.8027Z"
            fill="#FFCA05"
          />
          <path
            d="M213.106 16.1751C213.353 16.1751 213.591 16.0778 213.767 15.9046C213.942 15.7314 214.042 15.496 214.043 15.2501C214.043 15.0029 213.945 14.7659 213.77 14.5911C213.593 14.4163 213.355 14.3181 213.106 14.3181H207.006C206.883 14.3172 206.761 14.3407 206.647 14.3872C206.533 14.4337 206.428 14.5023 206.341 14.589C206.255 14.6758 206.186 14.7789 206.138 14.8924C206.091 15.0059 206.067 15.1274 206.069 15.2501C206.069 15.3721 206.093 15.4929 206.141 15.6057C206.187 15.7183 206.256 15.8206 206.344 15.9067C206.431 15.9925 206.534 16.0606 206.648 16.1066C206.762 16.1527 206.883 16.176 207.006 16.1751H213.106Z"
            fill="#FFCA05"
          />
          <path
            d="M215.961 23.0781C214.763 23.4528 213.537 23.7231 212.293 23.8858L213.439 17.4935C213.454 17.4265 213.454 17.357 213.437 17.2903C213.421 17.2235 213.389 17.1614 213.344 17.1088C213.301 17.0561 213.244 17.0144 213.181 16.9864C213.118 16.9586 213.049 16.9454 212.981 16.9481H207.132C207.063 16.9454 206.994 16.9586 206.931 16.9864C206.867 17.0144 206.811 17.0561 206.768 17.1088C206.723 17.1614 206.692 17.2235 206.675 17.2903C206.659 17.357 206.659 17.4265 206.674 17.4935L207.882 24.2309V24.2862H207.124C206.951 24.2862 206.874 24.6105 206.874 24.942C206.874 25.2733 206.964 25.5287 207.124 25.5978C209.105 26.5158 215.94 26.0603 215.94 26.0603L215.961 23.0781Z"
            fill="#FFCA05"
          />
          <path
            d="M243.296 21.2765C241.464 15.2224 237.29 10.1375 231.69 7.1377C226.09 4.13787 219.521 3.468 213.425 5.27509C207.325 7.09509 202.202 11.2481 199.183 16.8209C196.162 22.3938 195.494 28.9302 197.323 34.9929C199.156 41.0555 203.337 46.1466 208.946 49.1472C214.555 52.1477 221.133 52.8121 227.235 50.9944C233.331 49.1689 238.446 45.0127 241.458 39.44C244.47 33.8671 245.13 27.3338 243.296 21.2765ZM225.088 47.177C219.846 48.7337 214.196 48.1611 209.379 45.5847C204.56 43.0082 200.967 38.6383 199.386 33.4328C197.817 28.2233 198.392 22.6082 200.985 17.8197C203.578 13.0311 207.978 9.46053 213.217 7.89138C218.46 6.33097 224.112 6.90277 228.933 9.48115C233.752 12.0595 237.344 16.4335 238.919 21.6423C240.491 26.85 239.916 32.4644 237.325 37.2521C234.732 42.0398 230.334 45.6094 225.096 47.177H225.088Z"
            fill="#FFCA05"
          />
          <path
            d="M250 4.23959C250.003 4.80918 249.892 5.37378 249.674 5.90005C249.454 6.42634 249.132 6.90364 248.723 7.30383C248.316 7.70402 247.831 8.01898 247.298 8.23014C246.766 8.44131 246.196 8.54439 245.623 8.53332C245.049 8.54247 244.481 8.43822 243.948 8.22664C243.415 8.01504 242.93 7.70031 242.521 7.30077C242.111 6.90125 241.786 6.42487 241.564 5.89934C241.341 5.37381 241.228 4.80963 241.226 4.23959C241.232 3.67368 241.352 3.11461 241.576 2.59462C241.801 2.07465 242.127 1.6041 242.536 1.21005C242.945 0.816005 243.428 0.506287 243.958 0.298791C244.488 0.0912952 245.054 -0.00987196 245.623 0.001099C246.193 -0.0117555 246.758 0.0882654 247.287 0.295336C247.817 0.502406 248.299 0.81235 248.708 1.20703C249.115 1.60172 249.439 2.07323 249.662 2.59394C249.883 3.11464 249.999 3.67411 250 4.23959ZM242.323 4.23959C242.31 4.68149 242.386 5.12164 242.546 5.53371C242.708 5.94578 242.951 6.3213 243.262 6.63777C243.572 6.95423 243.945 7.20514 244.355 7.37546C244.765 7.54578 245.207 7.63203 245.651 7.62901C246.088 7.62745 246.522 7.53844 246.924 7.36729C247.326 7.19612 247.69 6.94629 247.994 6.63267C248.296 6.31904 248.533 5.94801 248.69 5.54166C248.846 5.13528 248.918 4.70188 248.903 4.26721C248.925 3.82405 248.859 3.38074 248.705 2.96418C248.551 2.54761 248.313 2.16644 248.006 1.84373C247.701 1.52103 247.331 1.26352 246.921 1.08681C246.512 0.910092 246.07 0.817847 245.623 0.81566C245.178 0.817164 244.738 0.907855 244.328 1.0823C243.919 1.25674 243.549 1.51137 243.241 1.83096C242.934 2.15056 242.693 2.52858 242.536 2.94241C242.379 3.35626 242.305 3.79743 242.323 4.23959ZM244.949 6.46238H243.991V2.22389C244.53 2.12909 245.076 2.08517 245.623 2.09273C246.139 2.05133 246.656 2.1592 247.111 2.40337C247.246 2.5172 247.355 2.66025 247.427 2.82168C247.499 2.98312 247.533 3.15873 247.527 3.33528C247.508 3.57181 247.41 3.79549 247.252 3.9724C247.091 4.1493 246.879 4.26978 246.645 4.31554V4.37075C246.856 4.45658 247.039 4.59747 247.177 4.77853C247.313 4.9596 247.398 5.17409 247.422 5.39931C247.466 5.76879 247.57 6.12835 247.735 6.46238H246.666C246.503 6.1357 246.391 5.78668 246.332 5.42693C246.249 4.96441 245.991 4.73662 245.443 4.73662H244.978L244.949 6.46238ZM244.949 4.0601H245.415C245.964 4.0601 246.401 3.87372 246.401 3.43883C246.401 3.00394 246.117 2.78993 245.491 2.78993C245.31 2.786 245.127 2.80455 244.949 2.84517V4.0601Z"
            fill="#FFCA05"
          />
        </g>
        <defs>
          <clipPath id="clip0_65_2562">
            <rect width="250" height="52" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div class="inp_all">
        <div class="inp_all-div">
          <img src="../../public/bgc.svg" alt="" />
          <input
            type="text"
            class="form_inp"
            placeholder="Логин"
            v-model="login"
            :class="!loginClass ? 'red' : ''"
          />
        </div>
        <div class="inp_all-div">
          <img src="../../public/password.svg" alt="" />

          <input
            :type="eye ? 'password' : 'text'"
            class="form_inp"
            v-model="password"
            :class="!passwordClass ? 'red' : ''"
            placeholder="Пароль"
          />
          <i class="las la-eye eye" @click="eye = !eye" v-if="eye"></i>
          <i class="las la-eye-slash eye" @click="eye = !eye" v-else></i>
        </div>
        <p class="eror" v-if="eror">Неверный логин или пароль</p>
      </div>
      <!-- <RouterLink class="form_btn" @click="func2" to="">Войти</RouterLink> -->
      <a @click="sendDataToApi()"class="form_btn">Войти</a>
    </form>
    
  </div>
</template>
<style>
.container_mobil {
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
body {
  background-color: var(--main-color);
}
.form {
  padding: 20px 20px;
  border-radius: 18px;
  max-width: 600px;
  width: 100%;
  /* background-color: var(--bgc-color); */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 35px;
  background: var(--bgc-color) no-repeat 0 0;
}

.form_inp {
  width: 100%;
  padding: 10px;
  padding-left: 40px;
  color: white;
  border-bottom: 1px solid var(--btn-color);
}
.eror {
  color: white;
  margin-bottom: -20px;
  text-align: center;
}
.red {
  border-bottom: 1px solid red;
}
.inp_all-div {
  position: relative;
}
.inp_all-div img {
  position: absolute;
  bottom: 8px;
  width: 25px;
  height: 25px;
  left: 5px;
  opacity: 0.4;
}
.inp_all {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.form_btn {
  background-color: var(--btn-color);
  font-size: 14px;
  line-height: 14px;
  color: #000;
  text-align: center;
  border-radius: 7px;
  padding: 10px 12px 10px 12px;
  width: 100%;
}
.eye {
  font-size: 25px;
  position: absolute;
  right: 0;
  top: 10px;
  color: rgb(173, 173, 173);
  cursor: pointer;
}
</style>
