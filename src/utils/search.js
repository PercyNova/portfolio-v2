import Fuse from 'fuse.js';

function search(projects, query) {
  const fuse = new Fuse(projects, {
    keys: ['title', 'description', 'techStack'],
  });

  return fuse.search(query).map(result => result.item);
}

export default search;