import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Home from '../../../src/pages/Question/Home.jsx';
import { questions as questionData } from '../../../data/questions.js';

describe('Home', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it('renders heading and Ask Question button', () => {
		render(<Home />);

		expect(screen.getByText('All Questions')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Ask Question' })).toBeInTheDocument();
	});

	it('shows loading state before delay completes', () => {
		render(<Home />);

		expect(screen.getByText('Loading questions...')).toBeInTheDocument();
	});

	it('shows question count after loading completes', () => {
		render(<Home />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		expect(screen.getByText(`${questionData.length} questions`)).toBeInTheDocument();
	});

	it('renders loaded question content after delay', () => {
		render(<Home />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		expect(screen.getByRole('button', { name: questionData[0].title })).toBeInTheDocument();
		expect(screen.getByText(questionData[0].description)).toBeInTheDocument();
	});

	it('shows empty question state when there are no questions after loading', () => {
		const originalQuestions = [...questionData];

		try {
			questionData.length = 0;

			render(<Home />);

			act(() => {
				vi.advanceTimersByTime(700);
			});

			expect(screen.getByText('No questions found')).toBeInTheDocument();
		} finally {
			questionData.length = 0;
			questionData.push(...originalQuestions);
		}
	});

	it('shows Ask Question alert when button is clicked', () => {
		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

		render(<Home />);

		fireEvent.click(screen.getByRole('button', { name: 'Ask Question' }));

		expect(alertSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledWith('Ask Question clicked');
	});
});