import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTitlesFromAPI } from '../actions/titles';
import { Link } from 'react-router-dom';
import { sendVoteToAPI } from '../actions/posts';

/** Show list of blog titles, ordered by popularity. */
function TitleList() {
  const titles = useSelector(store => store.titles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTitle() {
      await dispatch(fetchTitlesFromAPI());
      setIsLoading(false);
    }

    if (isLoading) {
      fetchTitle();
    }
  }, [dispatch, isLoading]);

  function vote(direction, id) {
    dispatch(sendVoteToAPI(id, direction));
  }

  if (isLoading) return <h2>Loading...</h2>
  
  if (!isLoading && titles.length === 0) {
    return <h2>No posts added!</h2>
  }

  return (
    <div className='row'>
      {titles.map(title => (
        <div key={title.id} className='col' >
          <div className='card'>
            <div className='card-body'>
              <div className='card-title'>
                <Link to={`/` + title.id}>{title.title}</Link>
              </div>
              <div className='card-text'>
                <i>{title.description}</i>
              </div>
            </div>
            <div className='card-footer'>
              <small>{title.votes} votes</small>
              <i
                className='fas fa-thumbs-up text-success ml-2'  
                onClick={() => vote('up', title.id)}
              />
              <i
                className='fas fa-down-up text-danger ml-2'  
                onClick={() => vote('down', title.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TitleList;
