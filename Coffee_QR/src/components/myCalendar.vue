<template>
    <div class="calendar">
        <div class="month">
            <a href="#" class="nav" @click="prev">
                <svg width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#ffca05" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </a>
        <div>{{ monthName }}<span class="year">{{ localYear }}</span></div>
            <a href="#" @click="next" class="nav">
                <svg width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#ffca05" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </a>
        </div>
        <div class="days">
            <span v-for="d in day" :key="d.id">{{ d.title }}</span>
        </div>
        <div class="dates"> 
            <button v-for="i in days" :key="i.id" :data-set="i" class="btn-dates" :class="i == localDay ? 'btn-dates--active' : ''">
                <time>{{ i }}</time>
            </button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';


const localDate = ref('')
const localMonth = ref('')
const localYear = ref('')
const localDay = ref('')
const data = ref('')
const monthName = ref('')


const days = ref([])
localDate.value = new Date()

localMonth.value = localDate.value.getMonth() + 1

localYear.value = localDate.value.getFullYear()

localDay.value = localDate.value.getDate()


const month = [
    
    {
        id:1,
        titleMonth:'январь',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    },
    {
        id:2,
        titleMonth:'февраль',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
    },
    {
        id:3,
        titleMonth:'март',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    },
    {
        id:4,
        titleMonth:'апрель',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    {
        id:5,
        titleMonth:'май',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    },
    {
        id:6,
        titleMonth:'июнь',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        activeDate: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].filter(el => el == localDay.value)

    },
    {
        id:7,
        titleMonth:'июль',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        activeDate: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].filter(el => el == localDay.value)

    },
    {
        id:8,
        titleMonth:'август',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        activeDate: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].filter(el => el == localDay.value)
    },
    {
        id:9,
        titleMonth:'сентябрь',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        activeDate: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].filter(el => el == localDay.value)

    },
    {
        id:10,
        titleMonth:'октябрь',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    },
    {
        id:11,
        titleMonth:'ноябрь',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    {
        id:12,
        titleMonth:'декабрь',
        date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    },
]
const day = [
    {
        id:1,
        title:'Пн'
    },
    {
        id:2,
        title:'Вт'
    },
    {
        id:3,
        title:'Ср'
    },
    {
        id:4,
        title:'Чт'
    },
    {
        id:5,
        title:'Пт'
    },
    {
        id:6,
        title:'Сб'
    },
    {
        id:7,
        title:'Вс'
    },
]



data.value = localYear.value + '-' + localMonth.value + '-' + localDay.value
data.value = new Date(data.value)
console.log(month);


onMounted(() => {
    if (monthName.value) {
        const filter = month.filter(el => el.titleMonth == monthName.value)
        days.value = filter[0].date
    }
}) 














monthName.value = data.value.toLocaleString('default', { month: 'long' });

const next = () => {
    if ( localMonth.value == 12 ) {
        localMonth.value = 1;
        console.log(localMonth.value);
        localYear.value = localYear.value + 1;
    }
    else {
        localMonth.value = localMonth.value + 1;
    }
    showcurr();
}
const prev = () => {
    if ( localMonth.value == 1 ) {
        localMonth.value = 12;
        localYear.value = localYear.value - 1;
    }
    else {
        localMonth.value = localMonth.value - 1;
    }
    showcurr();
}
const showcurr = function() {
    data.value = localYear.value + '-' + localMonth.value + '-' + localDay.value
    
    data.value = new Date(data.value)
    monthName.value = data.value.toLocaleString('default', { month: 'long' });

    const filter = month.filter(el => el.titleMonth == monthName.value)
    days.value = filter[0].date
};

watch(data, () => {
    if( localMonth.value == 2) {
        monthName.value = 'февраль'
        console.log(monthName.value);
        const filter = month.filter(el => el.titleMonth == monthName.value)
        days.value = filter[0].date
    }
})
</script>
<!-- <style>
.calendar{
  display:inline-grid;
  justify-content:center;
  align-items:center;
  background:#2b2a31;
  padding: 0px 5px 15px;
  max-width: 280px;
  width: 100%;
  position: absolute;
  z-index: 22;
  top: 49px;
  right: 20px;
  border-radius:5px;
  border: 1px solid var(--btn-color);
  box-shadow:0px 40px 30px -20px rgba(41, 41, 41, 0.3);
}
.month{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size: 16px;
    margin-bottom: 10px;
    font-weight:300;
    color: #fff;
}
    .year{
      font-weight:600;
      margin-left:10px;
    }
    
    .nav{
      display:flex;
      justify-content:center;
      align-items:center;
      text-decoration:none;
      color:var(--btn-color);
      width:40px;
      height:40px;
      border-radius:40px;
      transition-duration:.2s;
      position:relative;
    }

.days{
    display: grid;
    justify-content:center;
    align-items:center;
    grid-template-columns: repeat(7, 1fr);
    color:#999;
    font-weight:600;
    margin-bottom:10px;
    font-size: 12px;
    max-width: 320px;
    width: 100%;
    
    span{
      width:35px;
      justify-self:center;
      align-self:center;
      text-align:center;
    }
  }
  .dates{
    max-width: 320px;
    width: 100%;
    display:grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .btn-dates {
      cursor:pointer;
      outline:0;
      color: #fff;
      border:0;
      background:transparent;
      font-family: 'Montserrat', sans-serif;
      font-size:12px;
      justify-self:center;
      align-self:center;
      width: 30px;
      height: 30px;
      border-radius:50px;
      margin:2px;
      transition-duration:.2s;
      
  }
 
  /* .dates .btn-dates{
        box-shadow:inset 0px 0px 0px 2px #0a3d62;
      } */
      
      .btn-dates:first-child{
        grid-column:3;
      }
      
      .btn-dates:hover{
        background:var(--btn-color);
      }
      
      .btn-dates:focus{
        background:var(--btn-color);
        color:#000;
        font-weight:600;
      }
      .btn-dates--active {
        background:var(--btn-color);
        color:#000;
      }

</style> -->