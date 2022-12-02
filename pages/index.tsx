import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

import { readFileSync } from 'fs';
import path from 'path';

// pages/index.tsx
import prisma from '../lib/prisma';

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  //const file = path.join(process.cwd(), 'test.txt');
  const data = readFileSync('test.txt', 'utf8');

  return {
    props: {
      feed: [{author: {name: data}}],
    },
  };
  //
  // const feed = await prisma.post.findMany({
  //   include: {
  //     author: {
  //       select: { name: true },
  //     },
  //   },
  // });
  // return {
  //   props: { feed },
  //   revalidate: 10,
  // };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
