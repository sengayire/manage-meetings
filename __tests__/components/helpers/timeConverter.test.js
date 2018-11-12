import timeConvert from '../../../src/components/helpers/timeConverter';

describe('timeConvert', () => {
  it('should render plural minutes', () => {
    const time = timeConvert(62);
    expect(time).toEqual('1 Hour 2 Minutes');
  });
  it('should render minute', () => {
    const time = timeConvert(2);
    expect(time).toEqual('0 Hour 2 Minutes');
  });

  it('should render one minute', () => {
    const time = timeConvert(1);
    expect(time).toEqual('0 Hour 1 Minute');
  });

  it('should render 3 Hours 20 Minutes', () => {
    const time = timeConvert(200);
    expect(time).toEqual('3 Hours 20 Minutes');
  });
  it('should render 0 Hours 0 Minutes', () => {
    const time = timeConvert(0);
    expect(time).toEqual('0 Hour 0 Minute');
  });
});
