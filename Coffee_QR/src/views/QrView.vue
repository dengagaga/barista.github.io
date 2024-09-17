<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import axios from 'axios'
import Menu from '@/components/menu.vue'
import Burger from '@/components/burgerMenu.vue'
import Timer2 from '@/components/Timer2.vue'


const png = ref('')
const pngClose = ref('')
const pngExit = ref('')
const noneCode = ref(true)
const time = ref('')
onMounted(() => {
  if (localStorage.getItem('token')) {
    // startTimer()
    const token = localStorage.getItem('token')

    axios 
      .post(
        'http://cwbar.local/QRCode/get',
        { token: token },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      .then(function (response) {
        if (localStorage.getItem('QR')) {
          png.value = localStorage.getItem('QR')
          pngClose.value = localStorage.getItem('QRClose')
        } else {
          pngClose.value =  response.data.data.code
          png.value = 'data:image/png;base64,' + response.data.data.qrCode
          localStorage.setItem('QR', png.value)
          localStorage.setItem('QRClose', pngClose.value)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    loadTimeLeft()
    timer = setInterval(countdown, 1000)
  }

  if (!localStorage.getItem('time')) {
    const min = new Date().getMinutes()
    time.value = new Date().getHours() + ':' + (min < 10 ? '0' + min : min)
    localStorage.setItem('time', time.value)
  } else {
  time.value = ''
  }
  if (localStorage.getItem('QrExit')) {
    pngExit.value = localStorage.getItem('QrExit')
  }
})
const timeLeft = ref(0)
let timer

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const loadTimeLeft = () => {
  const savedTime = localStorage.getItem('timeLeft')
  if (savedTime) {
    const now = new Date().getTime()
    const savedTimestamp = parseInt(localStorage.getItem('timestamp'), 10)
    const elapsedTime = Math.floor((now - savedTimestamp) / 1000)
    timeLeft.value = Math.max(0, parseInt(savedTime, 10) - elapsedTime)
  } else {
    timeLeft.value = 5 * 60 // 5 минут в секундах
  }
}

const saveTimeLeft = () => {
  localStorage.setItem('timeLeft', timeLeft.value.toString())
  localStorage.setItem('timestamp', new Date().getTime().toString())
}

const countdown = () => {
  if (timeLeft.value > 0) {
    timeLeft.value--
    saveTimeLeft()
  } else if (timeLeft.value == 0) {
    timeLeft.value = 300
    const token = localStorage.getItem('token')
    axios
      .post(
        'http://cwbar.local/QRCode/get',
        { token: token },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      .then(function (response) {
       
        
        png.value = 'data:image/png;base64,' + response.data.data.qrCode
        localStorage.setItem('QR', png.value)
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    clearInterval(timer)
    console.log('Время вышло!')
  }
}

onBeforeUnmount(() => {
  clearInterval(timer)
})

const postWorkToken = () => {
  const token = localStorage.getItem('token')
  const userId = Number(localStorage.getItem('id'))
        axios
          .post(
            'http://cwbar.local/user/getCode',
            { token: token, user_id: userId },
            { headers: { Authorization: 'Bearer ' + token } }
          )
          .then(function (response) {
            console.log(response);
            
            const workToken = response.data.data[0].work_token
            localStorage.setItem('workToken', workToken)
            endShift()
            setTimeout(() => window.location.reload(), 1000)
          })
          .catch(function (error) {
            console.log(error)
  })
  
}
if (localStorage.getItem('workToken')) {
  noneCode.value = false
  
}

const endShift = () => {
  const token = localStorage.getItem('token')
  const Qr = localStorage.getItem('QRClose')

  axios
          .post(
            'http://cwbar.local/QRCode/getClose',
            { token: token, code: Qr},
            { headers: { Authorization: 'Bearer ' + token } }
          )
          .then(function (response) {
            console.log(response);
            
             if (localStorage.getItem('QrExit')) {
              pngExit.value = localStorage.getItem('QrExit')
            } else {
              pngExit.value = 'data:image/png;base64,' + response.data.data.qrCode
              localStorage.setItem('QrExit', pngExit.value)
            }
            
          })
          .catch(function (error) {
            console.log(error)
  })
}
const finishSmen = () => {
  localStorage.clear()
}
</script>
<template>
  <Burger />
  <div class="container_mobil">
    <div class="qr_container qr_container-3">
      <img class="img_mb" v-if="noneCode" @click="postWorkToken" :src="png" alt="" />
      <img class="img_mb img_mb-2" @click="finishSmen" :src="pngExit" v-if="!noneCode" alt="">
      <div id="time" v-if="noneCode" class="timer">
        <Timer2 :formattedTime="formattedTime"></Timer2>
      </div>
      <p v-if="noneCode" class="text_white">1. Отсканируйте Qr-код для авторизации.</p>
      <p v-if="!noneCode" class="text_white">1. Отсканируйте новый Qr-код для завершения смены.</p>
      <div class="btns">
      </div>
    </div>
  <Menu />
  </div>
</template>
<style>
.qr_container {
  background: var(--bgc-color) no-repeat 0 0;
  padding: 20px 20px;
  border-radius: 18px 18px 0 0;
  position: fixed;
  bottom: 0;
  height: 85vh;
  max-width: 600px;
  width: 100%;
  align-items: center;
  display: flex;

  flex-direction: column;
  gap: 35px;
}
.qr_container-3 {
  gap: 22px;
}
.text_white {
  color: white;
  font-size: 14px;
}
.timer {
  margin-top: -40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
  text-align: center;
}
.btn_back {
  display: flex;
  align-items: center;
  width: auto;
  height: 38px;
  gap: 10px;
  font-weight: 600;
}
.img_mb {
  max-width: 280px;
  margin-bottom: 30px;
}
.img_mb-2 {
  margin-bottom: 0;
}
.qr_btn {
  max-width: 200px;
  width: 100%;
  font-weight: 600;
  /* margin: 0 auto; */
  height: 38px;

  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
}
.btn_back svg {
  width: 20px;
}
.null {
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  color: white;
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.btn_back {
  max-width: auto;

  /* margin: 0 auto; */
}


</style>

