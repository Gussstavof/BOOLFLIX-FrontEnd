import {CategoryModel} from "./category.model";

export interface VideoModel {
  id: string;
  title: string;
  description: string;
  category: CategoryModel;
  url: string;
}
