import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import QuestionList from '../../../src/components/Question/QuestionList.jsx';

const mockQuestions = [
	{
		_id: 'q-test-1',
		title: 'How do I center a div?',
		description: 'Trying to center using flexbox but getting inconsistent results.',
		tags: [{ name: 'CSS' }, { name: 'HTML' }],
		author: { name: 'alice' },
		createdAt: '2024-01-01T00:00:00Z',
		upvotes: [1, 2, 3],
		downvotes: [1],
		voteCount: 2,
		answers: [{ _id: 'a1' }, { _id: 'a2' }],
	},
	{
		_id: 'q-test-2',
		title: 'When should I use useMemo?',
		description: 'I want to optimize expensive computations in React.',
		tags: [{ name: 'React' }],
		author: { name: 'bob' },
		createdAt: '2024-02-01T00:00:00Z',
		upvotes: [],
		downvotes: [],
		voteCount: 0,
		answers: [],
	},
];

describe('QuestionList', () => {
	it('shows loading state when loading is true', () => {
		render(<QuestionList questions={mockQuestions} loading={true} />);

		expect(screen.getByText('Loading questions...')).toBeInTheDocument();
		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	it('shows empty state when questions is empty and not loading', () => {
		render(<QuestionList questions={[]} loading={false} />);

		expect(screen.getByText('No questions found')).toBeInTheDocument();
	});

	it('renders question titles and descriptions when data is loaded', () => {
		render(<QuestionList questions={mockQuestions} loading={false} />);

		expect(screen.getByRole('button', { name: 'How do I center a div?' })).toBeInTheDocument();
		expect(screen.getByText('Trying to center using flexbox but getting inconsistent results.')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'When should I use useMemo?' })).toBeInTheDocument();
	});

	it('renders vote and answer metadata for each question card', () => {
		render(<QuestionList questions={mockQuestions} loading={false} />);

		expect(screen.getByText('alice')).toBeInTheDocument();
		expect(screen.getByText('bob')).toBeInTheDocument();
		expect(screen.getByText(/4\s+total/)).toBeInTheDocument();
	});

	it('calls onSelectQuestion when question title is clicked', async () => {
		const user = userEvent.setup();
		const onSelectQuestion = vi.fn();

		render(
			<QuestionList
				questions={mockQuestions}
				loading={false}
				onSelectQuestion={onSelectQuestion}
			/>
		);

		await user.click(screen.getByRole('button', { name: 'How do I center a div?' }));

		expect(onSelectQuestion).toHaveBeenCalledTimes(1);
		expect(onSelectQuestion).toHaveBeenCalledWith('q-test-1');
	});
});