import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  getPostFromAPI,
  updatePostInAPI,
  sendVoteToAPI,
  sendCommentToAPI,
  removeCommentFromAPI,
  removePostFromAPI
} from '../actions/posts'
import PostForm from './PostForm';
import CommentList from './CommentList';
import PostDisplay from './PostDisplay';
import CommentForm from './CommentForm';

/** Post:
 * 
 * – get post data from API, if not present
 * – allows post to be edited (toggleEdit is local state for this)
 * – handles edit form submission
 * – handles add-comment form submission
 * – handles comment-deletion
 * – handles post-deletion
 */
function Post(props) {
  const [isEditing, setIsEditing] = useState(false);
  const postId = Number(useParams().postId);
  const history = useHistory();
  const post = useSelector(store => store.posts[postId]);
  const dispatch = useDispatch();

  // if we dont have the post, request it from API
  useEffect(function loadPostWhenPostOrIdChanges() {
    async function getPost() {
      dispatch(getPostFromAPI(postId));
    }
    if (!post) {
      getPost();
    }
  }, [dispatch, postId, post])

  // toggle editing on/off
  function toggleEdit() {
    setIsEditing(edit => !edit);
  }

  // handle post editing: adds to backend
  function edit({ title, description, body }) {
    dispatch(updatePostInAPI(
      postId,
      title,
      description,
      body
    ));

    toggleEdit();
  }

  // handle post deletion: deletes from backend
  function deletePost() {
    dispatch(removePostFromAPI(postId));
    history.push('/');
  }

  // handle voting in backend
  function vote(direction) {
    dispatch(sendVoteToAPI(postId, direction));
  }

  // handle adding a comment: adds to backend
  function addComment(text) {
    dispatch(sendCommentToAPI(postId, text));
  }

  // handle deleting a comment in backend
  function deleteComment(commentId) {
    dispatch(removeCommentFromAPI(postId, commentId));
  }

  /** Render
   * 
   * – if not post yet, a loading message
   * – if editing, the edit form & comments
   * – if not, the display & comments 
   */
  if (!post) return <div>Loading</div>;

  return (
    <div className='Post'>
      {
        isEditing 
          ?
          <PostForm post={post} save={edit} cancel={toggleEdit} />
          :
          <>
          <PostDisplay
            post={post}
            toggleEdit={toggleEdit}
            deletePost={deletePost}
            doVote={vote}
          />
          <section className='postComments mb-4'>
              <h3>Comments</h3>
              <CommentList
                comments={post.comments}
                deleteComment={deleteComment}
              />
              <CommentForm submitCommentForm={addComment} />
          </section>          
          </>
      }
    </div>
  );
}

export default Post;
