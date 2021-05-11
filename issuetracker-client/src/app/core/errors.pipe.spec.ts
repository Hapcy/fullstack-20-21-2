import { ErrorsPipe } from './errors.pipe';

xdescribe('ErrorsPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorsPipe();
    expect(pipe).toBeTruthy();
  });
});
