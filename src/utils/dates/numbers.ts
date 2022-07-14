class Numbers {
  /**
     * Returns an array of numbers for the length of the limit from the initial
     * number steping up at the rate of step
     * @param init - Initial number in array
     * @param limit - The number of items to return
     * @param step - The increment to go up by
     */
  static getFollowingNumbers(init: number, limit: number, step: number = 1): number[] {
    const nums: number[] = [];

    if (limit < 0) return nums;

    for (let i = 0; i < limit; i += 1) nums.push(init + (i * step));

    return nums;
  }
}

export default Numbers;
