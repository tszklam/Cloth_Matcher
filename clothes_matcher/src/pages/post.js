/** This is a very basic mockup of the post page
 * TODO: @paynesa implement functionality */

import React, { useState, useEffect } from 'react';
import '../App.css';
import MenuBar from '../components/MenuBar';
import ListPosts from '../components/ListPosts';
import NewPost from '../components/NewPost';
import { getCurrentUser } from '../mockBackend/mockBackend';
import EditPost from '../components/updatePost';

/** This function defines the appearance of our post page */
function PostPage() {
  // define the states
  const [posting, updatePosting] = useState(false);
  const [editing, updateEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [postnum, updatePostnum] = useState(-1);

  // the user can only access the page if they're logged
  useEffect(() => {
    if (!getCurrentUser()) {
      window.location.href = '/login';
    }
  }, []);
  // we update the main div based on our current status
  let mainDiv;
  if (posting) {
    mainDiv = (
      <NewPost
        updatePosting={updatePosting}
        setSuccess={setSuccess}
      />
    );
  } else if (editing && postnum > 0) {
    mainDiv = (
      <EditPost
        postnum={postnum}
        updateEditing={updateEditing}
        setSuccess={setSuccess}
      />
    );
  } else {
    mainDiv = (
      <ListPosts
        updatePosting={updatePosting}
        success={success}
        setSuccess={setSuccess}
        updateEditing={updateEditing}
        updatePostnum={updatePostnum}
      />
    );
  }
  return (
    <div>
      <MenuBar />
      {mainDiv}
    </div>
  );
}

export default PostPage;
