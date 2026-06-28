<template>
  <aside class="sidebar">
    <div class="logo-section">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#31c27c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13" stroke="#31c27c" fill="rgba(49, 194, 124, 0.1)"/>
        <circle cx="6" cy="18" r="3" stroke="#31c27c" fill="#ffffff"/>
        <circle cx="18" cy="16" r="3" stroke="#31c27c" fill="#ffffff"/>
      </svg>
      <span class="logo-text">音悦</span>
    </div>
    <div class="sidebar-content">
      <!-- 主导航 -->
      <div class="section-header">在线音乐</div>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/Recommend') }" @click.prevent="navigateTo('/SiYeMusicView/Recommend')">
          <i class="icon icon-podcast">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-HomeAlt1"><path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9v-6z"/></svg>
          </i>推荐
        </a>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/MusicHall') }" @click.prevent="navigateTo('/SiYeMusicView/MusicHall')">
          <i class="icon icon-podcast">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Sparkles"><path d="M5 2l.19.94a4 4 0 0 0 2.57 2.974L8 6l-.24.086A4 4 0 0 0 5.19 9.06L5 10l-.19-.94a4 4 0 0 0-2.57-2.974L2 6l.24-.086A4 4 0 0 0 4.81 2.94L5 2z"/><path d="M8 16l.23 1.276a2 2 0 0 0 1.219 1.501L10 19l-.551.223a2 2 0 0 0-1.22 1.5L8 22l-.23-1.276a2 2 0 0 0-1.219-1.501L6 19l.551-.223a2 2 0 0 0 1.22-1.5L8 16z"/><path d="M16 3l.556 2.654a8 8 0 0 0 5.213 5.92L23 12l-1.231.426a8 8 0 0 0-5.213 5.92L16 21l-.556-2.654a8 8 0 0 0-5.213-5.92L9 12l1.231-.426a8 8 0 0 0 5.213-5.92L16 3z"/></svg>
          </i>乐馆
        </a>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/Video') }" @click.prevent="navigateTo('/SiYeMusicView/Video')">
          <i class="icon icon-video">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Video"><rect x="2" y="4" width="20" height="16" rx="4"/><path d="M15 12l-5-3v6l5-3z"/></svg>
          </i>视频
        </a>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/RadarView') }" @click.prevent="navigateTo('/SiYeMusicView/RadarView')">
          <i class="icon icon-friends">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-AirplayAudio"><path d="M12 16l6 5H6l6-5z"/><path d="M4 18a9.956 9.956 0 0 1-2-6C2 6.477 6.477 2 12 2s10 4.477 10 10a9.956 9.956 0 0 1-2 6"/><path d="M17.123 15.125a6 6 0 1 0-10.247-.002"/><path d="M14 12a2 2 0 1 0-4 0"/></svg>
          </i>雷达
        </a>
      </nav>

      <!-- 我的音乐 -->
      <div class="sidebar-section">
        <div class="section-header">我的音乐</div>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/LikeView') }" @click.prevent="navigateTo('/SiYeMusicView/LikeView')">
          <i class="icon icon-liked">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Heart"><path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"/></svg>
          </i>喜欢
        </a>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/DownLoadAndLocal') }" @click.prevent="navigateTo('/SiYeMusicView/DownLoadAndLocal')">
          <i class="icon icon-local">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Download"><path d="M12 15V3m0 12l-4-4m4 4l4-4"/><path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21H19.439a2 2 0 0 0 1.94-1.515L22 17"/></svg>
          </i>本地和下载
        </a>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/RecentlyPlayed') }" @click.prevent="navigateTo('/SiYeMusicView/RecentlyPlayed')">
          <i class="icon icon-history">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Clock"><circle cx="12" cy="12" r="10"/><path d="M15 16l-2.414-2.414A2 2 0 0 1 12 12.172V6"/></svg>
          </i>最近播放
        </a>
        <a href="#" class="nav-item" :class="{ active: isActive('/SiYeMusicView/PlayList') }" @click.prevent="navigateTo('/SiYeMusicView/PlayList')">
          <i class="icon icon-history">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-TextAlignLeft"><path d="M3 6h18M3 12h10M3 18h15"/></svg>
          </i>播放列表
        </a>
      </div>

      <!-- 创建的歌单 -->
      <div class="sidebar-section">
        <div class="section-header">
          <span>创建的歌单</span>
          <button class="btn-create">+</button>
        </div>
        <a href="#" class="nav-item playlist"><i class="icon icon-list"></i>默认歌单</a>
        <div class="section-header">收藏的歌单</div>
        <a href="#" class="nav-item playlist"><i class="icon icon-list"></i>华语速爆新歌</a>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'SidebarComponent'
})

const router = useRouter()
const currentRoute = ref(router.currentRoute.value.path)

// 监听路由变化
watch(() => router.currentRoute.value.path, (newPath) => {
  currentRoute.value = newPath
})

// 判断导航项是否激活
const isActive = (path) => {
  return currentRoute.value.includes(path)
}

// 添加导航函数
const navigateTo = (path) => {
  if (path) {
    router.push(path)
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #ffffff;
  height: 100%;
  border-radius: 8px;
  border-right: 1px solid #e8e8e8;
  flex-shrink: 0;
  overflow: hidden;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 10px;
}

.logo-text {
  font-size: 22px;
  font-weight: 600;
  color: #31c27c;
}

.sidebar-content {
  overflow-y: auto;
  height: calc(100% - 70px);
}

.section-header {
  padding: 10px 20px;
  font-size: 12px;
  color: #999;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-create {
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-create:hover {
  color: #31c27c;
}

.sidebar-nav {
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: right;
  padding: 6px 0px 6px 23px;
  color: #6c6969;
  text-decoration: none;
  border-radius: 1px;
  margin: 1px 13px;
  transition: none;
}

.nav-item:hover {
  background-color: #f5f5f5;
  color: #333;
  border-radius: 8px;
  margin: 1px 13px;
  transition: background-color 0.2s, color 0.2s;
}

.nav-item.active {
  background-color: #eeeeee;
  color: #333;
  margin: 1px 13px;
  border-radius: 8px;
  font-weight: 500;
}

.nav-item .icon {
  margin-right: 18px;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: contain;
}

.sidebar-section {
  margin-bottom: 10px;
}

.nav-item.playlist {
  font-size: 13px;
  color: #666;
}
</style>
