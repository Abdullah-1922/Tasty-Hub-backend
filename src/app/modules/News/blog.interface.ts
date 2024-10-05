import { Types } from "mongoose";

export interface TBlog {
  user: Types.ObjectId;
  newsCategory: string;
  
  title: string;
  description: string;
  image: string;
}
