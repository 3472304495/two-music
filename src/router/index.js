import {createRouter,createWebHistory} from 'vue-router'


import SiYeMusicView from '@/view/SiYeMusicView/index.vue'
import PlayList from '@/view/PlayList/PlayList.vue'
import DownLoadAndLocal from '@/view/DownloadAndLocal/DownloadAndLocal.vue'
import LikeView from '@/view/LikeView/LikeView.vue'
import MusicHall from '@/view/MusicHall/MusicHall.vue'
import RadarView from '@/view/RadarView/RadarView.vue'
import RecentlyPlayed from '@/view/RecentlyPlayed/RecentlyPlayed.vue'
import Recommend from '@/view/RecommendView/RecommendView.vue'
import Video from '@/view/VideoView/VideoView.vue'


const routes = [
    {path:'/',redirect:'/SiYeMusicView'}, 
    {path:'/SiYeMusicView',component:SiYeMusicView, 
        children:[
            { path: 'PlayList',  component: PlayList},
            { path: 'DownLoadAndLocal',  component: DownLoadAndLocal},
            { path: 'LikeView',  component: LikeView},
            { path: 'MusicHall',  component: MusicHall},
            { path: 'RadarView',  component: RadarView},
            { path: 'RecentlyPlayed',  component: RecentlyPlayed},
            { path: 'Recommend',  component: Recommend},
            { path: 'Video',  component: Video},
        ]
    }
]

//创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//导出路由
export default router