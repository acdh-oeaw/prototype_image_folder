import ImagesOverview from '@/components/ImagesOverview';
import AlbumOverView from '@/components/AlbumOverView';
import AlbumDetailView from '@/components/AlbumDetailView';

export default [
  { path: '/', component: ImagesOverview },
  { path: '/albums', component: AlbumOverView },
  { path: '/album/:id', component: AlbumDetailView },
];
