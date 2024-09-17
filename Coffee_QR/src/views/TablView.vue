<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import Menu from '@/components/menu.vue'
import Burger from '@/components/burgerMenu.vue'
import Table from '@/components/Table.vue'
import btn from '@/components/btnTabl.vue'




const arrayInformation = ref()
const tablPost = () => {
  const userId = Number(localStorage.getItem('id'))
  const token = localStorage.getItem('token')

    axios
          .post(
            'http://cwbar.local/user/countDayWork',
            { token: token, user_id: userId, from: range.value.start.toLocaleDateString().replaceAll(".", '-').split('-').reverse().join('-') , to: range.value.end.toLocaleDateString().replaceAll(".", '-').split('-').reverse().join('-')},
            { headers: { Authorization: 'Bearer ' + token } }
          )
          .then(function (response) {
            arrayInformation.value = response.data.data
            
            let rubles = localStorage.getItem('rublesHour')
            arrayInformation.value = arrayInformation.value.map((item) => ({ ...item,
              rubles: rubles
            }));
            console.log(arrayInformation.value);
            
          })
          .catch(function (error) {
            console.log(error)
  })
  }
onMounted(() => {
 
  tablPost()
 
})
const btns = ref([
    {
        id:1,
        name:'Сегодня',
        isActive: true
    },
    {
        id:2,
        name:'Неделя',
        isActive: false
    },
    {
        id:3,
        name:'Месяц',
        isActive: false
    },
])

const calendar = ref(false)
const alternativ = () => {
  calendar.value = !calendar.value
}


const range = ref({
  start: new Date(),
  end: new Date(),
});
watch(range, () => {
  tablPost()
})
// @click="isActive2 = (isActive2 === index) ? null : index"
// :class="(isActive === index) ? 'active' : ''"
const isActive2 = ref(null)
</script>
<template>
      <Burger />
      <div class="container_mobil">
        <div class="qr_container qr_container-2">
           
           
            <h1 class="table_title">Таблица отработанного времени</h1>
            <div class="tabl_btns">
                <btn v-for="(btn, index) in btns" :key="btn.id"  :class="btn.isActive ? 'active' : ''" @click="btn.isActive = !btn.isActive">{{btn.name}}</btn>
            </div>
            <div class="cal_all-relative">
                <p class="date">{{ range.start.toLocaleDateString() }} - {{ range.end.toLocaleDateString() }}</p>
                <div class="cal_all" @click="alternativ">
                    <img src="../../public/cal.svg" class="cal" alt="">
                </div>
                <div class="calendar">
                <VDatePicker 
                color="gray"
                mode="dateTime"
                v-model.range="range" v-if="calendar" class="black"   />
            </div>
            </div>
           
            <Table :arrayInformation="arrayInformation">
                
            </Table>
        </div>
      </div>
       
      <Menu />

</template>
<style>
.cal_all-relative {
    width: 100%;
    height: 35px;
    display: flex;
    position: relative;
}
.table_title {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-bottom: 35px;
}
.date {
    color: white;
    padding-top: 4px;
    font-size: 14px;
    font-weight: 500;
}
.tabl_btns {
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--btn-color);
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

}
.cal_all {
    top: 0;
  position: absolute;
  right: 0%;
  cursor: pointer;
    border-radius: 3px;
    border: 1px solid #ffca05;
    width: 26px;
    height: 26px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}
@media(max-width:450px) {
.table_title {
    font-size: 16px;
    font-weight: 700;
    color: white;
}
.table th {
    font-size: 12px;
}
.table td {
    font-size: 12px;
}
}
</style>