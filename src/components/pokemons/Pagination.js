import React, { useState, useEffect } from 'react';
import '../../App.css';

function Pagination({ gotoNext, gotoPrev, pageNo, nPages}) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
  
  return (
    <>
      <div id='pagination' className='paginate-n'>
        <h4>Page {pageNo} of {pageNumbers.length}</h4>
      </div>
      <div id='pagination' className='paginate'>
          {gotoPrev && <button id='previous' className='btn' onClick={gotoPrev}>Previous</button>}
          {gotoNext && <button id='next' className='btn' onClick={gotoNext}>Next</button>}
      </div>
    </>
  );
}

export default Pagination;