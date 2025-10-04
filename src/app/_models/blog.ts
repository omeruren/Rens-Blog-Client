import { CategoryDto } from "./category";

export class BlogDto {
  id;
  title;
  coverImage;
  blogImage;
  description;
  categoryId;
  category: CategoryDto;
  userId;
  createdAt;
  updatedAt;
}

