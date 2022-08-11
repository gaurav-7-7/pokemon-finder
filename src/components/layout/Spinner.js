import React, { Fragment } from 'react'
import spinner from './spinner.gif';

const Spinner = () => <Fragment>
      <img src={spinner} alt="Loading..." style={{ width: '90px', margin: 'auto', display: 'block',paddingTop: '255px' }} />
    </Fragment>

export default Spinner