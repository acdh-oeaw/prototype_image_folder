import ImagesOverview from "@/components/ImagesOverview.vue";
import AlbumOverView from "@/components/AlbumOverView.vue";
import AlbumDetailView from "@/components/AlbumDetailView.vue";

export const routes = [
    { path: '/', component: ImagesOverview },
    { path: '/albums', component: AlbumOverView },
    { path: '/album', component: AlbumDetailView },
]

