import { SafeResourceUrl } from '@angular/platform-browser';

export interface VideoModel {
  id: number;
  title: string;
  description: string;
  url: string;
  categoryId: number;
  categoryTitle?: string;
  thumbnailUrl?: string;
  urlSafe?: SafeResourceUrl;
}
