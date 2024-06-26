import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { defineCollection, defineConfig, s } from 'velite';

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(2).join('/'),
  locale: data.slug.split('/')[0],
});

const docs = defineCollection({
  name: 'Doc',
  pattern: '**/docs/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      published: s.boolean().default(true),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const posts = defineCollection({
  name: 'Post',
  pattern: '**/blog/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      toc: s.toc(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      image: s.string().max(99),
      tags: s.array(s.string()),
      authors: s.array(s.string()),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const projects = defineCollection({
  name: 'Project',
  pattern: '**/projects/**/*.mdx',
  schema: s
    .object({
      id: s.number(),
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      type: s.string().max(120),
      image: s.string().max(400),
      skills: s.array(s.string()),
      links: s
        .object({
          github: s.string().optional(),
          demo: s.string().optional(),
          playstore: s.string().optional(),
          appstore: s.string().optional(),
        })
        .optional(),
    })
    .transform(computedFields),
});

const authors = defineCollection({
  name: 'Author',
  pattern: 'authors/**/*.mdx',
  schema: s.object({
    name: s.string().max(99),
    avatar: s.string().max(99),
    github: s.string().max(99),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { authors, posts, docs, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'slack-dark',
          keepBackground: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});
