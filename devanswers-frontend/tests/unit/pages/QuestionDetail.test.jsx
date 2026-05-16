import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QuestionDetail from '../../../src/pages/Question/QuestionDetail.jsx';
import { questions as questionData } from '../../../data/questions.js';

describe('QuestionDetail', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it('shows loading state initially', () => {
		render(<QuestionDetail id="q1" />);

		expect(screen.getByText('Loading question...')).toBeInTheDocument();
		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	it('renders question title and description after loading', () => {
		render(<QuestionDetail id="q1" />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		expect(screen.getByRole('heading', { name: questionData[0].title })).toBeInTheDocument();
		expect(screen.getByText(questionData[0].description)).toBeInTheDocument();
	});

	it('renders answer list and answer form after loading', () => {
		render(<QuestionDetail id="q1" />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		expect(screen.getByRole('heading', { name: '3 Answers' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Your Answer' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Post Answer' })).toBeInTheDocument();
	});

	it('shows empty answer state when the selected question has no answers', () => {
		render(<QuestionDetail id="q2" />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		expect(screen.getByRole('heading', { name: '0 Answers' })).toBeInTheDocument();
		expect(screen.getByText('No answers yet. Be the first to answer this question.')).toBeInTheDocument();
	});

	it('updates question votes on upvote and downvote and shows alerts', () => {
		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

		render(<QuestionDetail id="q1" />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		const questionVoteScore = document.querySelector('.qcontent-body-card .vb-count-lg');
		const questionUpvoteButton = document.querySelector('.qcontent-body-card .vb-btn-up');
		const questionDownvoteButton = document.querySelector('.qcontent-body-card .vb-btn-down');

		expect(questionVoteScore).not.toBeNull();
		expect(questionUpvoteButton).not.toBeNull();
		expect(questionDownvoteButton).not.toBeNull();

		const initialQuestionScore = Number(questionVoteScore.textContent);
		expect(Number.isNaN(initialQuestionScore)).toBe(false);

		fireEvent.click(questionUpvoteButton);
		expect(alertSpy).toHaveBeenCalledWith('Upvoted!');
		expect(questionVoteScore).toHaveTextContent(String(initialQuestionScore + 1));

		fireEvent.click(questionDownvoteButton);
		expect(alertSpy).toHaveBeenCalledWith('Downvoted!');
		expect(questionVoteScore).toHaveTextContent(String(initialQuestionScore));
	});

	it('updates answer votes on upvote and downvote and shows alerts', () => {
		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

		render(<QuestionDetail id="q1" />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		const firstAnswerCard = document.querySelector('.answer-card');
		expect(firstAnswerCard).not.toBeNull();

		const answerVoteScore = firstAnswerCard.querySelector('.vb-count-sm');
		const answerUpvoteButton = firstAnswerCard.querySelector('.vb-btn-up');
		const answerDownvoteButton = firstAnswerCard.querySelector('.vb-btn-down');

		expect(answerVoteScore).not.toBeNull();
		expect(answerUpvoteButton).not.toBeNull();
		expect(answerDownvoteButton).not.toBeNull();
		expect(answerVoteScore).toHaveTextContent('5');

		fireEvent.click(answerUpvoteButton);
		expect(alertSpy).toHaveBeenCalledWith('Upvoted!');
		expect(answerVoteScore).toHaveTextContent('6');

		fireEvent.click(answerDownvoteButton);
		expect(alertSpy).toHaveBeenCalledWith('Downvoted!');
		expect(answerVoteScore).toHaveTextContent('5');
	});

	it('shows not found state when question id does not exist', () => {
		render(<QuestionDetail id="missing-question" />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		expect(screen.getByText('Question not found.')).toBeInTheDocument();
	});

	it('calls onBack when Back to Questions button is clicked', () => {
		const onBack = vi.fn();

		render(<QuestionDetail id="q1" onBack={onBack} />);

		act(() => {
			vi.advanceTimersByTime(700);
		});

		fireEvent.click(screen.getByRole('button', { name: 'Back to Questions' }));

		expect(onBack).toHaveBeenCalledTimes(1);
	});
});