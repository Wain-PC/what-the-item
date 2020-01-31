import React, {Fragment} from 'react';

export default (props) => {
    return (
        <Fragment>
        <div>
            Top Screen
        </div>
        <div>
        {JSON.stringify(props)}
        </div>
        </Fragment>
    );
};
