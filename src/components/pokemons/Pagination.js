import React from 'react';
import '../../App.css';

function Pagination({ gotoNext, gotoPrev}) {
  return (
    <div id='pagination' className='paginate'>
        {gotoPrev && <button id='previous' className='btn' onClick={gotoPrev}>Previous</button>}
        {gotoNext && <button id='next' className='btn' onClick={gotoNext}>Next</button>}
    </div>
  );
}

export default Pagination;