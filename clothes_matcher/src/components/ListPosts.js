/** Necessary imports */
import React from 'react';
import '../App.css';
import { Table } from 'antd';
import { Button } from 'react-bootstrap';
import makeAlert from './alerts';
import { getCurrentUser, getMyPosts } from '../mockBackend/mockBackend';

/** Component that lists the user's posts, used in the post page */
function ListPosts({
  updatePosting, success, setSuccess, updateEditing, updatePostnum,
}) {
  /** Define the columns in which we'll store the posts */
  const postCols = [
    {
      dataIndex: 'title',
      key: 'itemID',
      render: (text, record) => (
        <div>
          <Button type="button" className="ClothesMatcher-item-link" onClick={() => { updatePostnum(record.itemID); updateEditing(true); }}>
            •
            {text}
          </Button>
        </div>
      ),
    },
  ];

  /** If the item was successfully added, we want to display that */
  let successDiv;
  if (success) {
    successDiv = makeAlert(success, false);
  } else {
    successDiv = <div />;
  }

  /** Get the post data and render it or a message saying there aren't any posts yet */
  const postData = getMyPosts(getCurrentUser());
  let postTable;
  if (postData.length > 0) {
    postTable = (
      <Table
        columns={postCols}
        dataSource={postData}
        pagination={false}
        className="ClothesMatcher-table"
      />
    );
  } else {
    postTable = <h5 style={{ textAlign: 'center', marginTop: '15px' }}>You don't have any posts yet...</h5>;
  }
  /** Render the page */
  return (
    <div>
      <h1 className="ClothesMatcher-header">
        Your Posts
      </h1>
      <button type="button" className="ClothesMatcher-button-small" onClick={() => { setSuccess(false); updatePosting(true); }}> + New Item</button>
      {postTable}
      {successDiv}
    </div>
  );
}

export default ListPosts;
