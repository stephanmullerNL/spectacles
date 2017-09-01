import { SteemPowerPipe } from './steem-power.pipe';

describe('SteemPowerPipe', () => {
  it('create an instance', () => {
    const pipe = new SteemPowerPipe();
    expect(pipe).toBeTruthy();
  });
});
