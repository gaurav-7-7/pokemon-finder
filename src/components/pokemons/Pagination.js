import React from 'react';
import '../../App.css';

function Pagination({ gotoNext, gotoPrev}) {
  return (
    <div className='paginate'>
        {gotoPrev && <button className='btn' onClick={gotoPrev}>Previous</button>}
        {gotoNext && <button className='btn' onClick={gotoNext}>Next</button>}
    </div>
  );
}

export default Pagination;