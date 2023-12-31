import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	it('render title', () => {
		render(<App />);
		const titleElement = screen.getByText(/Поиск аккаунтов GitHub/i);
		expect(titleElement).toBeInTheDocument();
	});
	it('desc radio checked', () => {
		render(<App />);
		const radioElement = screen.getByDisplayValue('desc');
		expect(radioElement).toBeChecked();
	});
	it('asc radio checked after click', async () => {
		render(<App />);
		const radioElement = screen.getByDisplayValue('asc');
		await radioElement.click();
		expect(radioElement).toBeChecked();
	});
});