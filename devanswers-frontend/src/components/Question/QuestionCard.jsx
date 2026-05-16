import { useEffect, useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaComments, FaUser, FaClock } from 'react-icons/fa';
import VoteButtons from '../Shared/VoteButtons.jsx';
import './QuestionCard.css';

const normalizeQuestionVotes = (question) => {
  if (!question) {
    return null;
  }

  let upvotes = Array.isArray(question.upvotes) ? [...question.upvotes] : [];
  let downvotes = Array.isArray(question.downvotes) ? [...question.downvotes] : [];
  const seedVoteCount = Number.isFinite(question.voteCount) ? question.voteCount : 0;

  if (upvotes.length === 0 && downvotes.length === 0 && seedVoteCount !== 0) {
    if (seedVoteCount > 0) {
      upvotes = Array.from({ length: seedVoteCount }, (_, voteIndex) => `seed-question-up-${question._id}-${voteIndex}`);
    } else {
      downvotes = Array.from({ length: Math.abs(seedVoteCount) }, (_, voteIndex) => `seed-question-down-${question._id}-${voteIndex}`);
    }
  }

  return {
    ...question,
    upvotes,
    downvotes,
    voteCount: upvotes.length + downvotes.length,
  };
};

const QuestionCard = ({ question }) => {
  const [questionState, setQuestionState] = useState(() => normalizeQuestionVotes(question));

  useEffect(() => {
    setQuestionState(normalizeQuestionVotes(question));
  }, [question]);

  if (!questionState || !questionState._id) return null;

  const upvoteCount = questionState.upvotes.length;
  const downvoteCount = questionState.downvotes.length;
  const voteCount = upvoteCount + downvoteCount;
  const answerCount = questionState.answerCount || (Array.isArray(questionState.answers) ? questionState.answers.length : 0);
  const authorName = questionState.author?.name || 'Anonymous';
  const createdDate = questionState.createdAt ? new Date(questionState.createdAt) : new Date();

  const handleVote = (voteType) => {
    const voteToken = `local-${voteType}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setQuestionState((previousQuestion) => {
      if (voteType === 'upvote') {
        const upvotes = [...previousQuestion.upvotes, voteToken];
        return {
          ...previousQuestion,
          upvotes,
          voteCount: upvotes.length + previousQuestion.downvotes.length,
        };
      }

      const downvotes = [...previousQuestion.downvotes, voteToken];
      return {
        ...previousQuestion,
        downvotes,
        voteCount: previousQuestion.upvotes.length + downvotes.length,
      };
    });

    alert(`${voteType === 'upvote' ? 'Upvoted' : 'Downvoted'}!`);
  };

  return (
    <Card className="qcard mb-2">
      <Card.Body className="p-3">
        <div className="d-flex gap-2">
          {/* Stats Column */}
          <div className="qcard-stats-col d-flex flex-column align-items-center gap-1">
            <VoteButtons
              voteCount={voteCount}
              upvoteCount={upvoteCount}
              downvoteCount={downvoteCount}
              onUpvote={() => handleVote('upvote')}
              onDownvote={() => handleVote('downvote')}
              variant="link"
              size="sm"
            />
            <div className="d-flex align-items-center gap-1 text-muted mt-1">
              <FaComments className="qcard-comment-icon" />
              <span className="qcard-answer-count">{answerCount}</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex-grow-1">
            <Card.Title className="mb-2">
              <span className="qcard-title-link">{questionState.title}</span>
            </Card.Title>
            <Card.Text className="qcard-desc mb-2">{questionState.description}</Card.Text>
            <div className="mb-2">
              {questionState.tags && Array.isArray(questionState.tags) && questionState.tags.map((tag) => (
                <Badge key={tag.name || tag} className="qcard-tag-badge me-2 mb-1">
                  {tag.name || tag}
                </Badge>
              ))}
            </div>
            <div className="qcard-meta d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-1">
                <FaUser className="qcard-user-icon" />
                <strong className="qcard-author">{authorName}</strong>
              </span>
              <span className="d-flex align-items-center gap-1">
                <FaClock className="qcard-clock-icon" />
                <span className="qcard-date-text">
                  Asked {createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
