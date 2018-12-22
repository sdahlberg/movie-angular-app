import { MovieTitle } from './movie-title';

describe('MovieTitle', () => {
  it('should create an instance', () => {
    expect(new MovieTitle()).toBeTruthy();
  });


  it('should accept values in the constructor', () => {
    const movieTitle = new MovieTitle({
      primaryTitle: 'hello'
    });
    expect(movieTitle.primaryTitle).toEqual('hello');
  });
});
