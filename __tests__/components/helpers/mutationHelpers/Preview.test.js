import addLevelSetup from '../../../../src/components/helpers/mutationHelpers/Preview';
import { flattenedData } from '../../../../src/fixtures/Preview';

describe('Preview page component', () => {
  const mockedClient = {
    mutate: jest.fn(),
  };

  it('should call the mutate function to addLevelSetup', async () => {
    expect(mockedClient.mutate.mock.calls.length).toBe(0);
    await addLevelSetup({ flattenedData }, mockedClient);
    expect(mockedClient.mutate.mock.calls.length).toBe(1);
  });
});
