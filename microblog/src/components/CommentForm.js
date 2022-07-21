import React, { useState } from 'react';

/** Comment form.
 * 
 * Could be used for adding/editing: just show form and tracks iuput
 */
function CommentForm({ submitCommentForm }) {
  const [text, setText] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    submitCommentForm(text);
    setText('');
  }

  function handleChange(event) {
    setText(event.target.value),
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            onChange={handleChange}
            id='commentform-text'
            name='text'
            size={50}
            placeholder='New comment'
            className='form-control'
            value={text}
          />
        </div>
        <button className='btn btn-primary'>Add</button>
      </form>  
    </div>
  );
}

export default CommentForm;
