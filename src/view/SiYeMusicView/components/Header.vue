<template>
  <header class="header">
    <div class="search-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <div class="search-input-wrapper">
        <i class="search-icon fas fa-search"></i>
        <input type="text" class="search-input" placeholder="搜索音乐" v-model="searchData" />
        <button class="search-btn">搜索</button>

        <div
          v-if="showSearchResults && searchFoundData.length > 0"
          class="search-results-box"
        >
          <!-- 歌曲区块 - 始终显示 -->
          <div class="result-section">
            <div class="section-header">歌曲</div>
            <template v-if="searchFoundData[0] && searchFoundData[0].length > 0">
              <div
                v-for="(item, index) in searchFoundData[0]"
                :key="index"
                class="search-result-item"
                @click="handleSearchResultClick(item)"
              >
                <div class="result-content">
                  <span class="result-title">{{ item.name || item.title || '未知' }}</span>
                  <span class="result-artist" v-if="item.artist">{{ item.artist }}</span>
                </div>
              </div>
            </template>
            <div v-else class="no-results">
              暂无歌曲
            </div>
          </div>

          <!-- 歌手区块 - 始终显示 -->
          <div class="result-section">
            <div class="section-header">歌手</div>
            <template v-if="searchFoundData[1] && searchFoundData[1].length > 0">
              <div
                v-for="(item, index) in searchFoundData[1]"
                :key="index"
                class="search-result-item"
                @click="handleSearchResultClick(item)"
              >
                <div class="result-content">
                  <span class="result-title">{{ item.name || item.title || '未知歌手' }}</span>
                  <span class="result-artist" v-if="item.songCount">{{ item.songCount }}首歌曲</span>
                </div>
              </div>
            </template>
            <div v-else class="no-results">
              暂无歌手
            </div>
          </div>

          <!-- 专辑区块 - 始终显示 -->
          <div class="result-section">
            <div class="section-header">专辑</div>
            <template v-if="searchFoundData[2] && searchFoundData[2].length > 0">
              <div
                v-for="(item, index) in searchFoundData[2]"
                :key="index"
                class="search-result-item"
                @click="handleSearchResultClick(item)"
              >
                <div class="result-content">
                  <span class="result-title">{{ item.name || item.title || '未知专辑' }}</span>
                  <span class="result-artist" v-if="item.artist">{{ item.artist }}</span>
                </div>
              </div>
            </template>
            <div v-else class="no-results">
              暂无专辑
            </div>
          </div>
        </div>
      </div>
      <div class="user-section">
        <img
          @click="$emit('login-click')"
          :src="HandAndName.avatarUrl || 'https://example.com/default-avatar.png'"
          class="user-avatar"
        />
        <p class="user-name" @click="$emit('login-click')">{{ HandAndName.nickname || '点击登录' }}</p>
      </div>
      </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { searchService } from '@/api/search'

defineProps({
  HandAndName: {
    type: Object,
    default: () => ({
      avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      nickname: '点击登录'
    })
  }
})

defineEmits(['login-click'])

defineOptions({
  name: 'HeaderComponent'
})

const searchData = ref('')
const searchFoundData = ref([])
const showSearchResults = ref(false)

// 监听searchData变化，自动调用searchService
watch(searchData, async (newVal) => {
  console.log('searchData变化了', newVal)
  if (newVal !== undefined && newVal !== null && newVal.trim() !== '') {
    console.log('searchData:这个是搜索关键词', newVal)
    const result = await searchService(newVal)
    searchFoundData.value = result.data
    console.log('result:这个是搜索结果', result)
    showSearchResults.value = true
  } else {
    showSearchResults.value = false
    searchFoundData.value = []
  }
})

// 处理搜索结果项点击事件
const handleSearchResultClick = (item) => {
  console.log('点击了搜索结果:', item)
  showSearchResults.value = false
  searchData.value = ''
}
</script>

<style scoped>
.header {
  padding: 10px 20px;
  border-bottom: 1px solid #eaeaea;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 8px 60px 8px 35px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  outline: none;
}

.search-input:focus {
  border-color: #31c27c;
}

.search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  z-index: 1;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  cursor: pointer;
}

.user-name {
  font-size: 12px;
  color: #333;
  cursor: pointer;
  margin: 0;
}

/* 搜索结果框样式 */
.search-results-box {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 5px;
}

.result-section {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.result-section:last-child {
  border-bottom: none;
}

.section-header {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  font-weight: 500;
}

.search-result-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.result-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-title {
  color: #333;
  font-size: 14px;
}

.result-artist {
  color: #999;
  font-size: 12px;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
