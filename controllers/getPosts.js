import { fetchPosts } from "../models/index";

const getPosts = async (PostsData) => {
    const Posts = await fetchPosts(PostsData)

    return Posts;
}

export default getPosts;