import React, {Fragment} from 'react';

export default (props) => {
    return (
        <Fragment>
        <div>
            Ready Screen
        </div>
        <div>
        {JSON.stringify(props)}
        </div>
        </Fragment>
    );
};
