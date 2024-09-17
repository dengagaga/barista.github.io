<template>
        <div class="menu">
            <router-link to="/main" class="menu-link">
                <i class="las la-home menu-link-img"></i>
                Главная
            </router-link>
            <router-link to="/qr" class="menu-link">
                <i class="las la-qrcode menu-link-img"></i>
                Qr-код
            </router-link>
            <router-link to="/finance" class="menu-link">
                <i class="las la-ruble-sign menu-link-img"></i>
                Финансы
            </router-link>
        </div>
</template>
<style>
.menu {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  z-index: 22;
  /* background-color: var(--btn-color); */
}

.menu-link {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
  padding: 7px;
  gap: 3px;
  font-size: 13px;
  font-weight: 600;
  background-color: var(--btn-color);
}

.menu-link-img {
  font-size: 24px;
}
</style>