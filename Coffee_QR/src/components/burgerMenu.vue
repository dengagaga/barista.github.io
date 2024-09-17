
<script setup>
import { onMounted, ref } from 'vue'

const name = ref('')
const baristaName = ref(localStorage.getItem('baristaName'))
const id = ref('')
if (localStorage.getItem('name')) {
  id.value = localStorage.getItem('id')
  name.value = localStorage.getItem('name')
}
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
const btn = ref(false)
const funcBtn = () => {
  btn.value = !btn.value
}
</script>
<template>
    <div class="burger_menu" :class="btn ? 'open' : ''">
      <div class="burger_menu-left">
        <img class="burger_menu-img" src="/public/profile.svg" alt="">
        <h2 class="burger_menu-title">{{ baristaName }}</h2>
      </div>
      <div class="header_burger-btn" @click="funcBtn">
        <span></span>
        <span></span>
      </div>
        
    </div>
</template>
<style>
    .burger_menu {
        display: flex;
        border-radius: 0 0 18px 18px ;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background: var(--bgc-color);
        width: 100%;
    }
    .burger_menu-img {
        width: 30px;
    }
    .burger_menu-title {
        font-size: 14px;
        color: white;
    }
    .burger_menu-left {
      display: flex;
      align-items: center;
        gap: 10px;
    }



.header_burger-btn {
	position: relative;
	border: none;
	width: 30px;
	height: 40px;
	z-index: 10;
	top: 5px;
	cursor: pointer;
	z-index: 22!important;

}

.header_burger-btn span {
	position: absolute;
	width: 30px;
	top: 20px;
	height: 2px;
	background-color: white;
	transition: all 0.5s;
	z-index: 22!important;
	
}

.header_burger-btn span:nth-child(1) {
	transform: translateY(-12px);
}
/* ///////////NAV//////////// */

.header_burger-btn span:nth-child(1) {
	transform: translateY(-10px);
}
.header_burger-btn span:nth-child(3) {
	transform: translateY(10px);
}
.burger_menu.open .header_burger-btn span:nth-child(1) {
	transform: rotate(45deg);
}
.burger_menu.open .header_burger-btn span:nth-child(2) {
	transform: rotate(-45deg);
}
.burger_menu.open .header_burger-btn span {
  top: 16px;
}
</style>