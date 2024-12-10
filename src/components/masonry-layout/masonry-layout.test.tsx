import { render, screen } from '@testing-library/react';
import { MasonryLayout } from './masonry-layout';
import { describe, it, expect, afterEach, test } from '@jest/globals';

const items = [<div>Hello</div>, <div>Goodbye</div>];

describe('Masonry Layout', () => {
	test('Render ML', () => {
		render(<MasonryLayout components={items} />);

		expect(screen.getAllByTestId('masonry'));
	});
});
