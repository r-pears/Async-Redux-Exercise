import React from 'react';

/** CommentList: shows list of comments passed down as props.
 * 
 * Comments can be deleted by clicking next to them: this is
 * handled by the parent.
 */
function Comment({ deleteComment, text, id }) {
  function handleDelete(event) {
    deleteComment(id);
  }

  return (
    <div>
      <div>
        {deleteComment && (
          <i
            className='fa fa-times text-danger mr-2'
            onClick={handleDelete}
          />
        )}
        {text}
      </div>
    </div>
  );
}

export default Comment;
