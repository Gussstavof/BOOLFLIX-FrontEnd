import {CategoryModel} from "./category.model";
import {SafeResourceUrl} from "@angular/platform-browser";

export interface VideoModel {
  id: string;
  title: string;
  description: string;
  category: CategoryModel;
  url: string;
  urlSafe: SafeResourceUrl;
}
