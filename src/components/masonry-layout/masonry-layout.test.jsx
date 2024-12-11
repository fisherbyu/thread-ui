import { render, screen } from '@testing-library/react';
import { MasonryLayout } from './masonry-layout';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';

const items = [<div>Hello</div>, <div>Goodbye</div>];

describe('Masonry Layout', () => {
	test('Render ML', () => {
		render(<MasonryLayout components={items} />);

		expect(screen.getByTestId('masonry')).toBeInTheDocument();
	});
});
