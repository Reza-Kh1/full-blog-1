export type PostBoxType = {
  updatedAt: Date;
  createdAt: Date;
  imgAlt: string | null;
  description: string | null;
  imgSrc: string | null;
  slug: string;
  subject: string;
  subCategory?: { name: string };
  user: { name: string };
};
export type postPageType = {
  createdAt?: Date;
  description: string | null;
  id: number;
  imgAlt: string | null;
  imgSrc: string | null;
  keywords?: string;
  slug: string;
  status: boolean;
  subCategoryId?:
    | number
    | {
        name: string;
      };
  subject: string;
  title: string;
  updatedAt: Date;
  user: { name: string };
  subCategory?: { name: string };
  content?: string | null;
};
export type CommentPageType = {
  comment: string;
  createdAt: Date;
  id: number;
  postId: number;
  replyId: null | number;
  status: boolean;
  updatedAt: Date;
  user: { phone: String; name: String };
  userId: string;
};
export type UserAdminType = {
  count: number;
  pagination: PaginationType;
  rows: {
    id: number;
    role: "ADMIN" | "USER" | "AUTHOR";
    name: string;
    email: string | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
export type EditorUsertype = {
  name: string;
  phone: string;
  email: string | null;
  role: "ADMIN" | "USER" | "AUTHOR";
  id: string | number;
};
export type GetImageAdmin = {
  count: number;
  pagination: PaginationType;
  rows: { id: number; url: string }[];
};
export type PaginationType = {
  allPage: number;
  nextPage?: number;
  prevPage: number;
};
