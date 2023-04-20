const fetch = require('node-fetch');
const fs = require('fs');

const WORDPRESS_URL = process.env.WORDPRESS_URL;

(async () => {
  const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=5`);
  const posts = await response.json();

  const formattedPosts = posts.map(post => `- [${post.title.rendered}](${post.link})`);

  const content = `# Latest Blog Posts\n\n${formattedPosts.join('\n')}`;

  fs.writeFileSync('blog-posts.md', content);
})();
