import React from 'react';
import '../../../src/App.css'

const Notification = (props) => {
  //console.log(props.message.message);
  if (props.message.message === null) {
    return null
  }

  if (props.message.result === 'success') {
     return (
      <div className="success">
        {props.message.message}
      </div>
    )
  }
 return null;
}

export default Notification;