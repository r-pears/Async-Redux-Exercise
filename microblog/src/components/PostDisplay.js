import React from 'react';

/** Display a post.
 * 
 * - show edit/delete buttons (and call parent on action)
 * - show vote count and +/- buttons (and call parent on action)
 */
function PostDisplay({ doVote, toggleEdit, deletePost, post }) {
  const { title, description, body, votes } = post;

  return (
    <div className='postDisplay'>
      <div>
        <h2>{title}</h2>
        <div><i>{description}</i></div>
        <div>{body}</div>
      </div>

      <div className='postDisplayRight'>
        <div>
          <i
            className='fas fa-edit text-primary'
            onClick={toggleEdit}
          />
          <i
            className='fas fa-times text-danger'
            onClick={deletePost}
          />
        </div>       
        <div>
          <h3>Votes: {votes}</h3>
          <i
            className='fas fa-thumbs-up text-success'
            onClick={event => doVote('up')}
          />
          <i
            onClick={event => doVote('down')}
            className='fas fa-thumbs-down text-danger'
          />
        </div>
      </div>
    </div>
  );
}

export default PostDisplay;
