import { BlogDto } from "./blog";
import { SubCommentDto } from "./subcommentDto";

export class CommentDto{
  id;
  firstName;
  lastName;
  email;
  body;
  blogId;
  blog:BlogDto
  commentDate;
  subcomments:SubCommentDto[];
}
