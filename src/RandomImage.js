class RandomImage {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    async getRandomImage() {
      try {
        const response = await fetch(this.apiUrl);
        const imageUrl = response.url;
        return imageUrl;
      } catch (error) {
        console.error('Error fetching image:', error);
        return null;
      }
    }
  }
  
  export default RandomImage;
  