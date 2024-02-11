import matter from 'gray-matter';
import path from 'path';
import type { Post } from '../types/post';
import fs from 'fs/promises';
import { cache } from 'react';

// 'cache'는 React 18 기능으로 요청 주기동안 함수를 한번만 호출할 수 있도록 캐시해줌
// 예를들어 페이지를 렌더링할때 컴포넌트들을 구성하는동안 리렌더링이 발생하더라도 한번만 호출됨
export const getPosts = cache(async () => {
  const posts = await fs.readdir('./posts/');

  return Promise.all(
    posts
      .filter(
        (file) => path.extname(file) === '.md' || path.extname(file) === '.mdx'
      )
      .map(async (file) => {
        const filePath = `./posts/${file}`;
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(postContent);

        // published 옵션이 false이면 무시
        if (data.published === false) {
          return null;
        }

        return { ...data, body: content } as Post;
      })
  ) as Promise<Post[]>;
});

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post?.slug === slug);
}

export const getTags = cache(async () => {
  const posts = await fs.readdir('./posts/');

  const tags = await Promise.all(
    posts
      .filter(
        (file) => path.extname(file) === '.md' || path.extname(file) === '.mdx'
      )
      .map(async (file) => {
        const filePath = `./posts/${file}`;
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(postContent);

        // published가 false이거나 tags 필드가 없으면 무시
        if (data.published === false || !data.tags) {
          return null;
        }

        return data.tags;
      })
  );

  // null 값 제거, 태그 배열을 단일 배열로 평탄화, 중복 제거
  const uniqueTags = Array.from(new Set(tags.flat().filter(Boolean)));

  return uniqueTags;
});
