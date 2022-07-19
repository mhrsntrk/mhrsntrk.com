async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(
     `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/mhrsntrk`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    }
  );

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);
  return data?.allPosts;
}

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 5, where: $where) {
        title
        slug
        excerpt
      }
    }
  `
  );
  return data?.posts;
}

export async function getAllPostsForBlog() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 100, where: $where) {
        title
        slug
        date
        excerpt
      }
    }
  `
  );
  return data?.posts;
}

export async function getAllPhotos() {
  const data = await fetchAPI(
    `
    query Photos ($where: JSON) {
      photos( where: $where) {
        title
        image{
          url
        }
      }
    }
    `
  );
  return data?.photos;
}

export async function getAllGears() {
  const data = await fetchAPI(
    `
    query Gears ($where: JSON) {
      gears( where: $where sort:"created_at") {
        content
      }
    }
    `
  );
  return data?.gears;
}

export async function getPostAndMorePosts(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($where: JSON, $where_ne: JSON) {
      posts(where: $where) {
        title
        slug
        content
        date
        author {
          name
          avatar {
            url
          }
        }
      }

      morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
        title
        slug
        excerpt
        date
        author {
          name
          avatar {
            url
          }
        }
      }
    }
    `,
    {
      variables: {
        where: {
          slug
        },
        where_ne: {
          slug_ne: slug
        }
      }
    }
  );
  return data;
}
