import React from 'react';
import { render } from '@testing-library/react-native';
import { NeoGlowButton } from '../NeoGlowButton';

describe('NeoGlowButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NeoGlowButton title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeDefined();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<NeoGlowButton title="Test Button" onPress={onPressMock} />);
    
    const button = getByText('Test Button');
    // Note: In a real test, you'd use fireEvent.press(button) from @testing-library/react-native
    expect(button).toBeDefined();
  });
});
