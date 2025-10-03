import { CategoryDto } from "./category";

export class BlogDto {
  id;
  title;
  coverImage;
  blogImage;
  description;
  category: CategoryDto;
  userId;
  createdAt;
  updatedAt;
}

