<script setup>
import siyeImage from '@/assets/6cb0abcf9ad5c74d391c4f53829a52fa.jpg'
import { ElNotification } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { searchService,loginService } from '@/api/search';
import { useRouter } from 'vue-router'

const router = useRouter()

// 添加导航函数
const navigateTo = (path) => {
  if (path) {
    router.push(path)
  }
}


const showHandAndName = ref(localStorage.getItem('showHandAndName') || 1);
// 监听值的变化并保存到 localStorage
watch(showHandAndName, (newVal) => {
  localStorage.setItem('showHandAndName', newVal);
});
const storedHandAndName = localStorage.getItem('HandAndName');
const HandAndName = ref(
  storedHandAndName 
    ? JSON.parse(storedHandAndName)
    : {
        avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        nickname: '点击登录'
      }
);
// 监听变化并保存到 localStorage
watch(HandAndName, (newVal) => {
  localStorage.setItem('HandAndName', JSON.stringify(newVal));
}, { deep: true });
const loginShow = ref(false); // 登录弹窗显示状态
const registerShow = ref(false); // 注册弹窗显示状态
const seekShow = ref(false);//找回密码弹窗显示状态
const loginData= ref({}); // 登录数据
const searchData = ref(''); // 搜索关键词
const searchFoundData = ref([]);
const showSearchResults = ref(false); // 控制搜索结果下拉框显示状态

// 监听searchData变化，自动调用searchService
watch(searchData, async (newVal)=> {
  console.log('searchData变化了', newVal);
  if (newVal !== undefined && newVal !== null && newVal.trim() !== '') {
    console.log('searchData:这个是搜索关键词', newVal);
    const result = await searchService(newVal);
    searchFoundData.value = result.data;
    console.log('result:这个是搜索结果', result);
    showSearchResults.value = true;
  } else {
    showSearchResults.value = false;
    searchFoundData.value = [];
  }
});

// 处理搜索结果项点击事件
const handleSearchResultClick = (item) => {
  console.log('点击了搜索结果:', item);
  // 这里可以添加具体的处理逻辑，比如播放音乐、跳转到歌手页面等
  showSearchResults.value = false;
  searchData.value = '';
};

import { useTokenStore } from '@/stores/token.js'
const tokenStore=useTokenStore();
const login = async () => {
  console.log('loginData:这个是登录数据', loginData.value);
  const result = await loginService(loginData.value);
  console.log('result:这个是登录结果', result);
  result.data.nickname = result.data.nickname || '未登录';
  HandAndName.value.avatarUrl= result.data.user.avatarUrl;
  HandAndName.value.nickname= result.data.user.nickname;
  console.log('HandAndName:这个是登录用户信息', HandAndName.value);
  showHandAndName.value = 2; // 显示头像和昵称
  tokenStore.setToken(result.data.token)
    ElNotification({
    title: '登陆成功',
    message: result.data.user.nickname,
    type: 'success',
    position: 'top-left',
  })
  loginShow.value = false; // 关闭登录弹窗
};

onMounted(() => {
  
});

</script>

<template >
  <div   style="background-color: #f5f5f5;padding-top: 8px;padding-right: 8px; ">
    <el-container >
    <el-container>
      <el-aside style="width:220px; overflow: hidden; background-color:#f5f5f5;height: 88vh;border-radius: 8px;">
        <div style="display: flex; align-items: center; justify-content: center; padding: 20px 0; gap: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          <span style="font-size: 20px; font-weight: bold; color: #333;">音悦</span>
        </div>
        <aside class="sidebar" router>
          <el-scrollbar style="overflow: hidden;">
            <!-- 主导航 -->
            <div class="section-header">在线音乐</div>
            <nav class="sidebar-nav">
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/Recommend')" ><i class="icon icon-podcast" >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-HomeAlt1"><path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9v-6z"/></svg>
              </i>推荐</a>
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/MusicHall')" ><i class="icon icon-podcast" >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Sparkles"><path d="M5 2l.19.94a4 4 0 0 0 2.57 2.974L8 6l-.24.086A4 4 0 0 0 5.19 9.06L5 10l-.19-.94a4 4 0 0 0-2.57-2.974L2 6l.24-.086A4 4 0 0 0 4.81 2.94L5 2z"/><path d="M8 16l.23 1.276a2 2 0 0 0 1.219 1.501L10 19l-.551.223a2 2 0 0 0-1.22 1.5L8 22l-.23-1.276a2 2 0 0 0-1.219-1.501L6 19l.551-.223a2 2 0 0 0 1.22-1.5L8 16z"/><path d="M16 3l.556 2.654a8 8 0 0 0 5.213 5.92L23 12l-1.231.426a8 8 0 0 0-5.213 5.92L16 21l-.556-2.654a8 8 0 0 0-5.213-5.92L9 12l1.231-.426a8 8 0 0 0 5.213-5.92L16 3z"/></svg>
              </i>乐馆</a>
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/Video')" ><i class="icon icon-video">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Video"><rect x="2" y="4" width="20" height="16" rx="4"/><path d="M15 12l-5-3v6l5-3z"/></svg>
              </i>视频</a>
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/RadarView')" ><i class="icon icon-friends">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-AirplayAudio"><path d="M12 16l6 5H6l6-5z"/><path d="M4 18a9.956 9.956 0 0 1-2-6C2 6.477 6.477 2 12 2s10 4.477 10 10a9.956 9.956 0 0 1-2 6"/><path d="M17.123 15.125a6 6 0 1 0-10.247-.002"/><path d="M14 12a2 2 0 1 0-4 0"/></svg>
              </i>雷达</a>
            </nav>

            <!-- 我的音乐 -->
            <div class="sidebar-section">
              <div class="section-header">我的音乐</div>
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/LikeView')" ><i class="icon icon-liked">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Heart"><path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"/></svg>
              </i>喜欢</a>
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/DownLoadAndLocal')"><i class="icon icon-local">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Download"><path d="M12 15V3m0 12l-4-4m4 4l4-4"/><path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21H19.439a2 2 0 0 0 1.94-1.515L22 17"/></svg>
              </i>本地和下载</a>
              
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/RecentlyPlayed')" ><i class="icon icon-history">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-Clock"><circle cx="12" cy="12" r="10"/><path d="M15 16l-2.414-2.414A2 2 0 0 1 12 12.172V6"/></svg>
              </i>最近播放</a>
              <a href="#" class="nav-item" @click.prevent="navigateTo('/SiYeMusicView/PlayList')" ><i class="icon icon-history">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-TextAlignLeft"><path d="M3 6h18M3 12h10M3 18h15"/></svg>
              </i>播放列表</a>
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
          </el-scrollbar>
        </aside>
      </el-aside>
      <el-container style="background-color:white; border-radius: 3px;">
        <el-header style="padding-top: 10px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div class="search-box">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
              <i class="search-icon fas fa-search"></i>
              <div style="position: relative; width: 100%;">
                <input type="text" style="width: 100%; padding-right: 60px;font-size: 14px;" placeholder="搜索音乐" v-model="searchData" />
                <button class="search-btn" style="border: none; background: none; cursor: pointer; white-space: nowrap; font-size: 14px; position: absolute; right: 0; top: 50%; transform: translateY(-50%);">搜索</button>
                     
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
            </div>
            <div style="display: flex;" >
              <el-image
                @click="loginShow = true"
                :src="HandAndName.avatarUrl || 'https://example.com/default-avatar.png'"
                style="width: 37px; height: 37px; border-radius: 50%; margin-right: 8px;"
              /> 
              <p style="font-size: 12px; color: #333; cursor: pointer;" @click="loginShow = true">{{ HandAndName.nickname || '点击登录' }} </p>           
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <el-dialog v-model="loginShow" title="登录" width="30%" >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <input class="login-input" v-model="loginData.username" style="width: 240px;" placeholder="请输入用户名" clearable type="username" />
            <input class="login-input" v-model="loginData.password" style="width: 240px" placeholder="请输入密码" clearable type="password" />
          </div>          
            <br/>
            <div style="text-align: center;">
              <el-button type="success" @click="login" style="width: 267px;">登录</el-button>
              <div style="display: flex; justify-content: space-between;padding: 0 40px;">
                <p style="font-size: small;color: #666;" @click="seekShow = true, loginShow = false, registerShow = false">忘记密码</p>
                <p style="font-size: small;color: #666;" @click="registerShow = true, loginShow = false, seekShow = false">没有账号？注册</p>
              </div>
            </div>
        </el-dialog>
          <el-dialog v-model="registerShow" title="注册" width="30%" >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <input class="login-input" v-model="input" style="width: 240px;" placeholder="请输入用户名" clearable type="username" />
            <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入密码" clearable type="password" />
            <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入注册邮箱" clearable type="email" />
            <div style="position: relative; width: 266px;">
              <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入邮箱验证码" clearable type="email" />
              <button class="verification-code-btn">获取验证码</button>
            </div>
            
          </div>          
            <br/>
            <div style="text-align: center;">
              <el-button type="success" @click="registerShow = false" style="width: 267px;">注册</el-button>
              <div style="display: flex; justify-content: space-between;padding: 0 40px;">
                <p style="font-size: small;color: #666;" @click="registerShow = false, loginShow = true, seekShow = false">← 返回</p>
                <p style="font-size: small;color: #666;" @click="seekShow = true, loginShow = false, registerShow = false">忘记密码</p>
              </div>
              
            </div>
        </el-dialog> 
        <el-dialog v-model="seekShow" title="找回密码" width="30%" >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入注册邮箱" clearable type="email" />
            <div style="position: relative; width: 266px;">
              <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入邮箱验证码" clearable type="email" />
              <button class="verification-code-btn">获取验证码</button>
            </div>
          </div>          
            <br/>
            <div style="text-align: center;">
              <el-button type="success" @click="loginShow = false" style="width: 267px;">点击找回</el-button>
              <div style="display: flex; justify-content: space-between;padding: 0 40px;">
                <p style="font-size: small;color: #666;" @click="registerShow = false, loginShow = true, seekShow = false">← 返回</p>
                <p style="font-size: small;color: #666;" @click="registerShow = true, loginShow = false, seekShow = false">没有账号？注册</p>
              </div>
            </div>
        </el-dialog>        
      </el-container>
    </el-container>
    <el-footer style="border-top: 1px solid #eaeaea;">
     <!-- 控制checkbox -->
    <input type="checkbox" id="play-toggle">
    <input type="checkbox" id="playlist-toggle">
    <input type="checkbox" id="lyrics-toggle">
    <input type="checkbox" id="like-toggle">
    
       <div class="music-player">
        <!-- 左侧：专辑封面和歌曲信息 -->
       <div class="player-left">
    <div class="album-cover">
        <img src="https://p2.music.126.net/5Zs51UoF2mYvWvd2MLtV1g==/109951168423100741.jpg" alt="专辑封面">
    </div>
    <div class="song-info">
        <!-- 将歌曲名和艺术家放在同一行 -->
        <div class="song-info-top">
            <div class="song-title">起风了</div>
            <div class="song-artist">买辣椒也用券</div>
        </div>
        <!-- 在歌曲名下方放置按钮 -->
        <div class="song-actions">
            <input type="checkbox" id="like-toggle">
            <label for="like-toggle" class="like-btn">
                <i class="far fa-heart"></i>
            </label>
            <button class="more-btn">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
    </div>
</div>
        
        <!-- 中间：播放控制和进度条 -->
        <div class="player-center">
            <div class="control-buttons">
                <button class="control-btn">
                    <i class="fas fa-random"></i>
                </button>
                <button class="control-btn">
                    <i class="fas fa-step-backward"></i>
                </button>
                <label for="play-toggle" class="control-btn play-btn">
                    <i class="fas fa-play"></i>
                </label>
                <button class="control-btn">
                    <i class="fas fa-step-forward"></i>
                </button>
                <button class="control-btn">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
            <div class="progress-container">
                <span class="time time-current">01:23</span>
                <div class="progress-bar">
                    <div class="progress">
                        <div class="progress-handle"></div>
                    </div>
                </div>
                <span class="time time-duration">04:35</span>
            </div>
        </div>
        
        <!-- 右侧：音量控制和播放列表 -->
        <div class="player-right">
            <div class="volume-container">
                <div class="volume-btn">
                    <i class="fas fa-volume-up"></i>
                </div>
                <div class="volume-bar">
                    <div class="volume-level">
                        <div class="volume-handle"></div>
                    </div>
                </div>
            </div>
            <label for="lyrics-toggle" class="lyrics-btn" style="margin-left: 15px;">
                <i class="far fa-comment"></i>
            </label>
            <label for="lyrics-toggle" class="lyrics-btn">
                <i class="far fa-file-alt"></i>
            </label>
            
            <label for="playlist-toggle" class="playlist-btn">
                <i class="fas fa-list"></i>
            </label>

            
        </div>
    </div>
    
    <!-- 播放列表面板 -->
    <div class="playlist-panel">
        <div class="playlist-header">
            <div class="playlist-title">播放列表</div>
            <div class="playlist-count">15首</div>
            <label for="playlist-toggle" class="playlist-close">
                <i class="fas fa-times"></i>
            </label>
        </div>
        <div class="playlist-content">
            <div class="playlist-item active">
                <div class="playlist-item-index">1</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">起风了</div>
                    <div class="playlist-item-artist">买辣椒也用券</div>
                </div>
                <div class="playlist-item-duration">04:35</div>
                <div class="playlist-item-like active">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <div class="playlist-item">
                <div class="playlist-item-index">2</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">光年之外</div>
                    <div class="playlist-item-artist">G.E.M.邓紫棋</div>
                </div>
                <div class="playlist-item-duration">03:55</div>
                <div class="playlist-item-like">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="playlist-item">
                <div class="playlist-item-index">3</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">年少有为</div>
                    <div class="playlist-item-artist">李荣浩</div>
                </div>
                <div class="playlist-item-duration">04:39</div>
                <div class="playlist-item-like">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="playlist-item">
                <div class="playlist-item-index">4</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">演员</div>
                    <div class="playlist-item-artist">薛之谦</div>
                </div>
                <div class="playlist-item-duration">04:21</div>
                <div class="playlist-item-like">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="playlist-item">
                <div class="playlist-item-index">5</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">消愁</div>
                    <div class="playlist-item-artist">毛不易</div>
                </div>
                <div class="playlist-item-duration">04:21</div>
                <div class="playlist-item-like">
                    <i class="far fa-heart"></i>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 歌词面板 -->
    <div class="lyrics-panel">
        <div class="lyrics-line">这一路上走走停停</div>
        <div class="lyrics-line">顺着少年漂流的痕迹</div>
        <div class="lyrics-line active">迈出车站的前一刻</div>
        <div class="lyrics-line">竟有些犹豫</div>
        <div class="lyrics-line">不禁笑这近乡情怯</div>
        <div class="lyrics-line">仍无可避免</div>
        <div class="lyrics-line">而长野的天</div>
        <div class="lyrics-line">依旧那么暖</div>
        <div class="lyrics-line">风吹起了从前</div>
    </div>
    </el-footer>
  </el-container>
  </div>
</template>

<style>
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
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 4px;
}

/* 结果区块样式 */
.result-section {
  border-bottom: 1px solid #f0f0f0;
}

.result-section:last-child {
  border-bottom: none;
}

.result-section .section-header {
  padding: 8px 16px;
  background-color: #f8f8f8;
  font-size: 12px;
  color: #666;
  font-weight: 600;
  margin: 0;
  border-radius: 0;
}

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f8f8f8;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.no-results {
  padding: 12px 16px;
  font-size: 12px;
  color: #999;
  text-align: center;
  font-style: italic;
}

.result-content {
  display: flex;
  flex-direction: column;
}

.result-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.result-artist {
  font-size: 12px;
  color: #666;
}

body {
  overflow: hidden;
}

.sidebar {
  width: 220px;
  height: 76vh;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-content: right;
}

.sidebar-nav,
.sidebar-section {
  padding: 10px 0;
}

.nav-item {
  display: flex;
  align-items: right;
  padding: 6px 0px 6px 23px;
  color: #6c6969;
  text-decoration: none;
  border-radius: 1px;
  margin: 1px 13px; /* 统一margin值避免抖动 */
  transition: none; /* 禁用过渡动画 */
}

.nav-item:hover {
  background-color: #d8d8d8;
  color: #333;
  border-radius: 8px;
  margin: 1px 13px; /* 保持一致的margin */
  transition: none; /* 确保没有过渡动画 */
}

.nav-item.active {
  background-color: #dbdbdb;
  color: #333;
  margin: 1px 13px;
  border-radius: 8px;
}

.nav-item .icon {
  margin-right: 18px;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  font-size: 12px;
  color: #999;
  font-weight: bold;
}

.btn-create {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
}

.btn-create:hover {
  color: #31c27c;
}

.playlist {
  padding-left: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 6px 12px;
  width: 20%;
}

.search-icon {
  color: #999;
  margin-right: 8px;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 13px;
}

.search-box:focus-within {
  border-color: #666;
}

.search-btn:hover {
  color: #31c27c;
}

.login-input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px 12px;
  transition: border-color 0.2s;
}

.login-input:focus {
  outline: none;
  border-color: #67c23a; /* Element Plus 默认的绿色 */
  box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
}

.verification-code-btn {
  border: none;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  padding-right: 14px;
}

.verification-code-btn:hover {
  color: #31c27c;
}
 * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  
  body {
      background-color: #f5f5f5;
      color: #333;
      overflow-x: hidden;
  }
  
  .music-player {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 77px;
      display: flex;
      align-items: center;
      padding: 0 20px;
 
     
  }
  
  .player-left {
      display: flex;
      align-items: center;
      width: 240px;
  }
  .song-info-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
}

.song-title {
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.song-artist {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.song-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.more-btn {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 16px;
}
  
  .album-cover {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 12px;
      position: relative;
  }
  
  .album-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  
  .album-cover::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%);
  }
  
  .song-info {
      flex: 1;
  }
  
  .song-title {
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
  }
  
  .song-artist {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
  }
  
  .like-btn {
      color: #999;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
      transition: color 0.2s;
  }
  
  .like-btn:hover {
      color: #fa233b;
  }
  
  .like-btn.active {
      color: #fa233b;
  }
  
  .player-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px -0.8% 0 12%;
      min-width: 20%;
      max-width: 60%;
  }
  
  .control-buttons {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
  }
  
  .control-btn {
      background: none;
      border: none;
      font-size: 18px;
      color: #666;
      cursor: pointer;
      margin: 0 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
  }
  
  .control-btn:hover {
      background-color: #f0f0f0;
      color: #31c27c;
  }
  
  .play-btn {
      width: 36px;
      height: 36px;
      background-color: #f0f0f0;
      color: #31c27c;
  }
  
  .play-btn:hover {
      background-color: #31c27c;
      color: white;
  }
  
  .progress-container {
      width: 100%;
      display: flex;
      align-items: center;
  }
  
  .time {
      font-size: 12px;
      color: #999;
      width: 40px;
  }
  
  .time-current {
      text-align: right;
  }
  
  .time-duration {
      text-align: left;
  }
  
  .progress-bar {
      flex: 1;
      height: 4px;
      background-color: #e5e5e5;
      border-radius: 2px;
      margin: 0 10px;
      cursor: pointer;
      position: relative;
  }
  
  .progress {
      height: 100%;
      background-color: #31c27c;
      border-radius: 2px;
      width: 30%;
      position: relative;
  }
  
  .progress-handle {
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      background-color: #31c27c;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s;
  }
  
  .progress-bar:hover .progress-handle {
      opacity: 1;
  }
  
  .player-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 20px; /* 与容器padding保持一致 */
    width: auto;
    height: 100%;
  }
  
  .volume-container {
      display: flex;
      align-items: center;
      margin-right: 20px;
  }
  
  .volume-btn {
      color: #666;
      font-size: 16px;
      cursor: pointer;
      margin-right: 8px;
  }
  
  .volume-bar {
      width: 80px;
      height: 4px;
      background-color: #e5e5e5;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
  }
  
  .volume-level {
      height: 100%;
      background-color: #31c27c;
      border-radius: 2px;
      width: 70%;
  }
  
  .volume-handle {
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      background-color: #31c27c;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s;
  }
  
  .volume-bar:hover .volume-handle {
      opacity: 1;
  }
  
  .playlist-btn {
      color: #666;
      font-size: 16px;
      cursor: pointer;
      transition: color 0.2s;
  }
  
  .playlist-btn:hover {
      color: #31c27c;
  }
  
  .lyrics-btn {
      color: #666;
      font-size: 16px;
      cursor: pointer;
      margin-right: 15px;
      transition: color 0.2s;
  }
  
  .lyrics-btn:hover {
      color: #31c27c;
  }
  
  /* 播放列表面板 */
  .playlist-panel {
      position: fixed;
      bottom: 70px;
      right: 0;
      width: 400px;
      height: 400px;
      background-color: white;
      border: 1px solid #e1e1e1;
      border-bottom: none;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      display: none;
      flex-direction: column;
      z-index: 999;
  }
  
  .playlist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #e1e1e1;
  }
  
  .playlist-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
  }
  
  .playlist-count {
      font-size: 12px;
      color: #999;
  }
  
  .playlist-close {
      color: #999;
      cursor: pointer;
      font-size: 16px;
  }
  
  .playlist-close:hover {
      color: #333;
  }
  
  .playlist-content {
      flex: 1;
      overflow-y: auto;
      padding: 10px 0;
  }
  
  .playlist-item {
      display: flex;
      align-items: center;
      padding: 8px 15px;
      cursor: pointer;
      transition: background-color 0.2s;
  }
  
  .playlist-item:hover {
      background-color: #f5f5f5;
  }
  
  .playlist-item.active {
      background-color: #f0f7ff;
      color: #31c27c;
  }
  
  .playlist-item-index {
      width: 30px;
      font-size: 14px;
      color: #999;
  }
  
  .playlist-item-info {
      flex: 1;
  }
  
  .playlist-item-title {
      font-size: 14px;
      margin-bottom: 4px;
  }
  
  .playlist-item-artist {
      font-size: 12px;
      color: #999;
  }
  
  .playlist-item-duration {
      font-size: 12px;
      color: #999;
      margin-left: 10px;
  }
  
  .playlist-item-like {
      margin-left: 10px;
      color: #ddd;
      cursor: pointer;
      font-size: 14px;
  }
  
  .playlist-item-like:hover {
      color: #fa233b;
  }
  
  .playlist-item-like.active {
      color: #fa233b;
  }
  
  /* 歌词面板 */
  .lyrics-panel {
      position: fixed;
      bottom: 70px;
      right: 400px;
      width: 300px;
      height: 200px;
      background-color: white;
      border: 1px solid #e1e1e1;
      border-bottom: none;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      display: none;
      flex-direction: column;
      z-index: 999;
      padding: 15px;
      overflow-y: auto;
  }
  
  .lyrics-line {
      font-size: 14px;
      line-height: 1.8;
      text-align: center;
      margin-bottom: 10px;
      color: #999;
      transition: color 0.3s, font-size 0.3s;
  }
  
  .lyrics-line.active {
      color: #31c27c;
      font-size: 16px;
      font-weight: bold;
  }
  
  /* 响应式调整 */
  @media (max-width: 1200px) {
      .player-left, .player-right {
          width: 200px;
      }
  }
  
  @media (max-width: 900px) {
      .player-left, .player-right {
          width: 150px;
      }
      
      .volume-bar {
          width: 60px;
      }
  }
  
  /* 隐藏/显示面板的CSS技巧 */
  #playlist-toggle:checked ~ .playlist-panel,
  #lyrics-toggle:checked ~ .lyrics-panel {
      display: flex;
  }
  
  #play-toggle:checked ~ .music-player .play-btn i {
      display: none;
  }
  
  #play-toggle:checked ~ .music-player .play-btn::after {
      content: "\f04c";
      font-family: "Font Awesome 6 Free";
      font-weight: 900;
      font-size: 14px;
  }
  
  /* 隐藏checkbox */
  input[type="checkbox"] {
      display: none;
  }
  
  /* 喜欢按钮样式切换 */
  #like-toggle:checked + .like-btn .far {
      display: none;
  }
  
  #like-toggle:checked + .like-btn::after {
      content: "\f004";
      font-family: "Font Awesome 6 Free";
      font-weight: 900;
      color: #fa233b;
  }
</style>