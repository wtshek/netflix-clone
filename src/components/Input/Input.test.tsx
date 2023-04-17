import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    id: 'test-input',
    onChange: mockOnChange,
    value: '',
    label: 'Test label',
    type: 'text',
  };

  it('renders correctly', () => {
    const { container } = render(<Input {...defaultProps} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="relative"
        id="test-input"
      >
        <input
          class="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
          data-testid="input"
          placeholder=" "
          type="text"
          value=""
        />
        <label
          class="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          for="test-input"
        >
          Test label
        </label>
      </div>
    `);
  });
});
