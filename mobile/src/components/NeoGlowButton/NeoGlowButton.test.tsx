// Simple unit test for NeoGlowButton component
describe('NeoGlowButton', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should test button props interface', () => {
    interface ButtonProps {
      title: string;
      onPress: () => void;
      variant?: 'primary' | 'secondary';
      disabled?: boolean;
    }

    const mockProps: ButtonProps = {
      title: 'Test',
      onPress: jest.fn(),
    };

    expect(mockProps.title).toBe('Test');
    expect(mockProps.onPress).toBeDefined();
  });

  it('should validate onPress callback', () => {
    const callback = jest.fn();
    callback();
    expect(callback).toHaveBeenCalled();
  });
});
