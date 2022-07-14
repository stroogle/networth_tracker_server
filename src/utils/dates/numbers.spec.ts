import { expect } from 'chai';
import Numbers from './numbers';

describe('Numbers Class Tests', () => {
  it('Get 5 following numbers', () => {
    const nums: number[] = Numbers.getFollowingNumbers(1, 5);
    expect(nums).to.be.an('array');
    expect(nums).to.have.lengthOf(5);
    expect(nums).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('Negative size', () => {
    const nums: number[] = Numbers.getFollowingNumbers(1, -5);
    expect(nums).to.be.an('array');
    expect(nums).to.have.lengthOf(0);
  });

  it('Negative starting number', () => {
    const nums: number[] = Numbers.getFollowingNumbers(-1, 5);
    expect(nums).to.be.an('array');
    expect(nums).to.have.lengthOf(5);
    expect(nums).to.deep.equal([-1, 0, 1, 2, 3]);
  });

  it('Zero steps', () => {
    const nums: number[] = Numbers.getFollowingNumbers(1, 3, 0);
    expect(nums).to.be.an('array');
    expect(nums).to.have.lengthOf(3);
    expect(nums).to.deep.equal([1, 1, 1]);
  });

  it('Negative steps', () => {
    const nums: number[] = Numbers.getFollowingNumbers(1, 3, -1);
    expect(nums).to.be.an('array');
    expect(nums).to.have.lengthOf(3);
    expect(nums).to.deep.equal([1, 0, -1]);
  });

  it('Positive steps', () => {
    const nums: number[] = Numbers.getFollowingNumbers(1, 3, 2);
    expect(nums).to.be.an('array');
    expect(nums).to.have.lengthOf(3);
    expect(nums).to.deep.equal([1, 3, 5]);
  });
});
