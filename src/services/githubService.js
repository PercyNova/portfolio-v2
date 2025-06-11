import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users/yourusername/repos';

async function getRepos() {
  try {
    const response = await axios.get(GITHUB_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export default {
  getRepos,
};