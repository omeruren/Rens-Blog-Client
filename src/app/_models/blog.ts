import { CategoryDto } from "./category";
import { CommentDto } from "./commentDto";
import { UserDto } from "./userDto";

export class BlogDto {
  id;
  title;
  coverImage;
  blogImage;
  description;
  categoryId;
  category: CategoryDto;
  userId;
  user:UserDto
  comments:CommentDto[];
  createdAt;
  updatedAt;
}

