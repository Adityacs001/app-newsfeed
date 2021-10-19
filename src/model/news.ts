export type Source = {
  id: string;
  name: string;
};


interface News {
  id: string;
  urlToImage: string;
  title: string;
  publishedAt: string;
  description: string;
  content: string;
  author: string;
  source: Source;
  url: string;
}

export default News;