import { useLocalStorage } from "./useLocalStorage";


describe('localStorageHook', () => {
  it('hook should be defined', () => {
    expect(useLocalStorage)
      .toBeDefined();
  });
});
