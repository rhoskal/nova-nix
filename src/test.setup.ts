(global as any).nova = {
  inDevMode(): boolean {
    return true;
  },
  localize: jest.fn((x: string) => x),
};
