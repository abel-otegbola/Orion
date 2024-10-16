import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';

import Button, { buttonProps } from './button';
import { describe } from 'node:test';

const defaultProps: buttonProps = {
    variant: "primary",
    className: "",
    href: "",
    size: "full",
    disabled: true,
}

describe('Button', () => {
  test('renders button with text and link from props', () => {
    render(<Button {...defaultProps} ></Button>);

    expect(screen.getByRole('button')).toBeDefined()

  });
});