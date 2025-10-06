import { CommentDto } from "./commentDto";

export class SubCommentDto{
  id;
  firstName;
  lastName;
  email;
  body;
  commentDate;
  commentId;
  comment:CommentDto
}
