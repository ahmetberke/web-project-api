import { User } from "./auth.client"
import instance from "./instance"

export interface MultiPostItem {
  id: string
  authorId: string
  author: {
    id: string
    username: string
    fullname: string
  }
  description: string
  title: string
  content: string
  views: number
  likes: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface CreatePostItemRequest {
  description: string
  title: string
  content: string
}

export interface CreatePostItemResponse {
  id: string
  authorId: string
  author: {
    id: string
    username: string
    fullname: string
  }
  description: string
  title: string
  content: string
  views: number
  likes: []
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface PostDetailResponse {
  id: string
  authorId: string
  author: {
    id: string
    username: string
    fullname: string
  }
  description: string
  title: string
  content: string
  views: number
  comments: Array<CommentResponse>
  likes: []
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface CommentResponse {
  author: {
    id: string
    username: string
    fullname: string
  }
  content : string
  createdAt: string
  updatedAt: string
}

export const getAll = async (token : string) : Promise<Array<MultiPostItem>> => {
  const response = await instance.get("/posts", {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data.data;
}

export const create = async (payload: CreatePostItemRequest, token: string) : Promise<CreatePostItemResponse> => {
  const response = await instance.post("/posts",
  payload,
  {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data.data;
}

export const getById = async (id : string, token : string) : Promise<PostDetailResponse> => {
  const response = await instance.get("/posts/" + id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data.data as PostDetailResponse;
}

export const newComment = async (postId: string, token: string, content: string) => {
  await instance.post("/comments", {postId, content}, {headers: {Authorization: "Bearer " + token}});
}

export const like = async (postId: string, token: string) => {
  await instance.get("/posts/like/" + postId, {headers: {Authorization: "Bearer " + token}});
}

export const dislike = async (postId: string, token: string) => {
  await instance.get("/posts/dislike/" + postId, {headers: {Authorization: "Bearer " + token}});
}

export default {
  create,
  getAll,
  getById,
  newComment,
  like,
  dislike
}