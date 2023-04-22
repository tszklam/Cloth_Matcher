import React from 'react';

/** Make a success or error message based on the input params */
function makeAlert(message, red) {
  let classname;
  if (red) classname = 'alert alert-danger';
  else classname = 'alert alert-success';
  return (
    <div
      className={classname}
      style={{
        width: '50vw', margin: 'auto', padding: '5px 5px', marginBottom: '10px', marginTop: '10px', textAlign: 'center',
      }}
    >
      {message}
    </div>
  );
}

export default makeAlert;
