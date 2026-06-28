<template>
  <div class="app-wrapper">
    <div class="main-layout">
      <Sidebar />
      <main class="main-content">
        <Header
          :HandAndName="HandAndName"
          @login-click="handleLoginClick"
        />
        <div class="content-area">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
    <MusicPlayer />
    <LoginDialog
      v-model="loginShow"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import LoginDialog from './components/LoginDialog.vue'

defineOptions({
  name: 'SiYeMusicView'
})

const showHandAndName = ref(localStorage.getItem('showHandAndName') || 1)
const storedHandAndName = localStorage.getItem('HandAndName')
const HandAndName = ref(
  storedHandAndName
    ? JSON.parse(storedHandAndName)
    : {
        avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        nickname: '点击登录'
      }
)
const loginShow = ref(false)

// 监听值的变化并保存到 localStorage
watch(showHandAndName, (newVal) => {
  localStorage.setItem('showHandAndName', newVal)
})

// 监听变化并保存到 localStorage
watch(HandAndName, (newVal) => {
  localStorage.setItem('HandAndName', JSON.stringify(newVal))
}, { deep: true })

const handleLoginClick = () => {
  loginShow.value = true
}

const handleLoginSuccess = (userData) => {
  HandAndName.value.avatarUrl = userData.avatarUrl
  HandAndName.value.nickname = userData.nickname
  showHandAndName.value = 2
}

onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped>
/* 全局布局样式 */
.app-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  max-height: calc(100vh - 77px);
  overflow: hidden;
  width: 100%;
  max-width: 100vw;
}

.main-layout {
  display: flex;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  overflow: hidden;
}

.main-content {
  flex: 1;
  background-color: white;
  border-radius: 3px;
  overflow: hidden;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.content-area {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

