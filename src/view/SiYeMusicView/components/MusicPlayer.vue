<template>
  <footer class="player-footer">
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
          <div class="song-info-top">
            <div class="song-title">起风了</div>
            <div class="song-artist">买辣椒也用券</div>
          </div>
          <div class="song-actions">
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
        <h3>播放列表</h3>
        <button class="close-btn">×</button>
      </div>
      <div class="playlist-content">
        <div class="playlist-item">
          <div class="playlist-item-index">1</div>
          <div class="playlist-item-info">
            <div class="playlist-item-title">起风了</div>
            <div class="playlist-item-artist">买辣椒也用券</div>
          </div>
          <div class="playlist-item-duration">04:35</div>
          <div class="playlist-item-like">
            <i class="far fa-heart"></i>
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
  </footer>
</template>

<script setup>
// 音乐播放器组件逻辑
</script>

<style scoped>
.player-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #eaeaea;
  background-color: white;
  z-index: 1000;
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
  background-color: white;
  border-top: 1px solid #eaeaea;
  z-index: 1000;
}

.player-left {
  display: flex;
  align-items: center;
  width: 300px;
}

.album-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 12px;
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-info {
  flex: 1;
}

.song-info-top {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.song-title {
  font-size: 14px;
  color: #333;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.song-artist {
  font-size: 12px;
  color: #999;
}

.song-actions {
  display: flex;
  gap: 8px;
}

.like-btn {
  cursor: pointer;
  color: #999;
  font-size: 16px;
}

.like-btn:hover {
  color: #fa233b;
}

.more-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 16px;
  padding: 0;
}

.player-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  padding: 4px;
  transition: color 0.2s;
}

.control-btn:hover {
  color: #31c27c;
}

.play-btn {
  font-size: 24px;
}

.progress-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 12px;
}

.time {
  font-size: 12px;
  color: #999;
  min-width: 40px;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
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
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
}

.player-right {
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: flex-end;
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-btn {
  cursor: pointer;
  color: #333;
  font-size: 16px;
}

.volume-bar {
  width: 80px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.volume-level {
  height: 100%;
  background-color: #31c27c;
  border-radius: 2px;
  width: 60%;
  position: relative;
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
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.volume-bar:hover .volume-handle {
  opacity: 1;
}

.lyrics-btn {
  cursor: pointer;
  color: #333;
  font-size: 16px;
  margin-left: 15px;
}

.lyrics-btn:hover {
  color: #31c27c;
}

.playlist-btn {
  cursor: pointer;
  color: #333;
  font-size: 16px;
  margin-left: 15px;
}

.playlist-btn:hover {
  color: #31c27c;
}

/* 播放列表面板样式 */
.playlist-panel {
  display: none;
  position: absolute;
  bottom: 77px;
  right: 20px;
  width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  max-height: 400px;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
}

.playlist-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
  padding: 0;
  width: 24px;
  height: 24px;
}

.close-btn:hover {
  color: #333;
}

.playlist-content {
  max-height: 350px;
  overflow-y: auto;
}

.playlist-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.playlist-item:hover {
  background-color: #f5f5f5;
}

.playlist-item-index {
  width: 30px;
  color: #999;
  font-size: 12px;
}

.playlist-item-info {
  flex: 1;
}

.playlist-item-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.playlist-item-artist {
  font-size: 12px;
  color: #999;
}

.playlist-item-duration {
  width: 50px;
  color: #999;
  font-size: 12px;
  text-align: right;
}

.playlist-item-like {
  width: 30px;
  text-align: center;
  color: #999;
  cursor: pointer;
}

.playlist-item-like:hover {
  color: #fa233b;
}

/* 歌词面板样式 */
#lyrics-toggle:checked ~ .lyrics-panel {
  display: block;
}

.lyrics-panel {
  display: none;
  position: fixed;
  bottom: 77px;
  left: 20px;
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.lyrics-line {
  padding: 8px 0;
  color: #999;
  font-size: 14px;
  line-height: 1.8;
  text-align: center;
}

.lyrics-line.active {
  color: #31c27c;
  font-size: 16px;
  font-weight: 500;
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
</style>
