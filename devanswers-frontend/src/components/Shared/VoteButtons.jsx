import { Button } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './VoteButtons.css';

const VoteButtons = ({
  voteCount = 0,
  upvoteCount,
  downvoteCount,
  onUpvote,
  onDownvote,
  variant = 'link',
  size = 'sm',
}) => {
  const btnClass =
    variant === 'outline'
      ? `vb-btn-outline vb-btn-outline-${size}`
      : 'vb-btn-link';

  return (
    <div className="vb-wrapper">
      <Button
        variant={variant === 'outline' ? 'outline-secondary' : 'link'}
        onClick={onUpvote}
        className={`vb-btn-up ${btnClass}`}
      >
        <span className="vb-btn-content">
          <FaArrowUp className="vb-icon-up" />
          {Number.isFinite(upvoteCount) && (
            <span className={`vb-btn-count vb-btn-count-${size}`}>{upvoteCount}</span>
          )}
        </span>
      </Button>

      <span className={`vb-count vb-count-${size}`}>{voteCount}</span>

      <Button
        variant={variant === 'outline' ? 'outline-secondary' : 'link'}
        onClick={onDownvote}
        className={`vb-btn-down ${btnClass}`}
      >
        <span className="vb-btn-content">
          <FaArrowDown className="vb-icon-down" />
          {Number.isFinite(downvoteCount) && (
            <span className={`vb-btn-count vb-btn-count-${size}`}>{downvoteCount}</span>
          )}
        </span>
      </Button>
    </div>
  );
};

export default VoteButtons;
