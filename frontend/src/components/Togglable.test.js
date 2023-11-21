import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable/>', () => {
  let container;
  const label = 'show...';
  const content = 'togglable content';

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel={label}>
        <div className="testDiv">{content}</div>
      </Togglable>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText(content);
  });

  test('at start the children are not displated', () => {
    const div = container.querySelector('.togglableContent');
  });

  test('after clicking athe button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText(label);
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });
});
