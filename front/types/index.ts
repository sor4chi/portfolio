export type Profile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
};

export type Works = {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  works_category_id: number;
  thumbnail: Image;
  content: string;
};

export type Blogs = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  description: string;
  tags: Tags[];
  thumbnail: Image;
  content: string;
  qiita: string;
  zenn: string;
};

export type Tags = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
};

export type Categories = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
  count: number;
};

export type Image = {
  url: string;
  height: string;
  width: string;
};

export type Contact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// export const monthNames = [
//   "Jan.",
//   "Feb.",
//   "Mar.",
//   "Apr.",
//   "May.",
//   "Jun.",
//   "Jul.",
//   "Aug.",
//   "Sep.",
//   "Oct.",
//   "Nov.",
//   "Dec.",
// ];
