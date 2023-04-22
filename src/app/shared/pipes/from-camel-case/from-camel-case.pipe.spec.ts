import { FromCamelCasePipe } from './from-camel-case.pipe';

describe('FromCamelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FromCamelCasePipe();
    expect(pipe).toBeTruthy();
  });
});
