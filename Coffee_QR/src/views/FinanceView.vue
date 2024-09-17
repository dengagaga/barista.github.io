<script setup>
import { onMounted, ref } from 'vue'

import topMain from '@/components/TopMain.vue'
// import myCalendar from '@/components/myCalendar.vue'
import Menu from '@/components/menu.vue'
import Burger from '@/components/burgerMenu.vue'

import topMainInfo from '@/components/TopMainInfo.vue'
const name = ref('')
const date = ref('')
const id = ref('')

if (localStorage.getItem('name')) {
  id.value = localStorage.getItem('id')
  name.value = localStorage.getItem('name')
}

const rublesHour = localStorage.getItem('rublesHour')


const array = [
  {
    id: id.value,
    name: name.value,
    cat: 1,
    place: 'Липецк',
    data: '20.08.2024',
    place2: 'Доватора 1а',
    zp: 50000,
    zpch: 120,
    time: 1
  }
]
</script>
<template>
  <Burger />

  <div class="container_mobil">
    <div class="qr_container qr_container-2">
       
    <topMain class="main_top-2">
      <h2 class="main_top-title-2">Доход:</h2>
     
      <!-- <myCalendar v-show="calendar"/> -->
      <topMainInfo title="Ставка в час" :array="array">
        <p>{{ rublesHour }} руб.</p>
      </topMainInfo>
    </topMain>
    <topMain class="main_top-2">
      <h2 class="main_top-title-2">Информация о доходе:</h2>
      <topMainInfo title="Аванс" :array="array">
        <p>с 20-23 каждого месяца</p>
      </topMainInfo>
      <topMainInfo title="Зарплата" :array="array">
        <p>с 5-10 каждого месяца</p>
      </topMainInfo>
      <topMainInfo title="Часы работы кассы" :array="array">
        <p>с 14:00 до 16:00</p>
      </topMainInfo>
      <topMainInfo title="Касса" :array="array">
        <p>г.Липецк, Первомайская д.2</p>
      </topMainInfo>
    </topMain>
    <router-link to="/Tabl" class="form_btn more">Подробнее</router-link>


     <!-- <VDatePicker v-model="date"  v-show="calendar" /> -->
      <Menu />
    </div>
  </div>
</template>

<style>
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
  position: relative;
}
.main_top-2 {
    width: 100%;
    background-color: var(--main-color)!important;
}
.qr_container-2 {
  gap: 0;
}
.main_top-title-2 {
  font-size: 18px;
  padding-bottom: 10px;
  color: #fff;
  border-bottom: 2px solid var(--btn-color);
}
.cal {
  cursor: pointer;
    height: 15px;
    width: 15px;
}

.calendar {
  position: absolute;
  z-index: 22;
  top: 30px;
  right: 0px;
  border-radius:5px;
}
.black {
  background:#2b2a31!important;
  padding: 0px 5px 15px!important;
  max-width: 280px!important;
  width: 100%!important;
  border-radius:5px!important;
  border: 1px solid var(--btn-color)!important;
  padding-bottom: 0!important;
  box-shadow:0px 40px 30px -20px rgba(41, 41, 41, 0.3)!important;
}
.vc-day-content {
  color: #fff;
}
.vc-weekday {
  color:#6c6c6c !important ;
}
.vc-header .vc-title{
  color: #fff!important;

}
.vc-container .vc-weekday-1, .vc-container .vc-weekday-7 {
  color: var(--btn-color)!important;
}
.vc-time-picker {
  display: none!important;
}
.vc-sky-yelow {
  --vc-accent-50: #ffca05;
  --vc-accent-100: #ffca05;
  --vc-accent-200: #ffca05;
  --vc-accent-300: #ffca05;
  --vc-accent-400: #ffca05;
  --vc-accent-500: #ffca05;
  --vc-accent-600: #ffca05;
  --vc-accent-700: #ffca05;
  --vc-accent-800: #ffca05;
  --vc-accent-900: #ffca05;
}
.vc-highlight-content-outline, .vc-highlight-content-none {
  color: black!important;
}
.vc-light.vc-attr, .vc-light .vc-attr {
  --vc-highlight-light-bg:rgba(255, 202, 5, .7)!important;
  --vc-highlight-solid-bg:white!important;
  --vc-highlight-solid-content-color: #000!important;
  --vc-highlight-outline-bg: #ffca05!important;
  --vc-content-color: #ffca05!important;
  --vc-dot-bg: #ffca05!important;
  --vc-bar-bg: #ffca05!important;
  --vc-highlight-outline-border: #ffca05!important;
  --vc-highlight-outline-content-color: #ffca05!important;
}
.more {
  max-width: 150px;
    width: 100%;
    font-weight: 600;
    height: 38px;
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
}
</style>
