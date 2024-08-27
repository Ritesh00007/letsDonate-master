import React from 'react';
import './css/PopUps.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

/*
**  Report.js
**
**  This component is popup for reporting a user or post
*/
function Report( {} ) {
    
    return (
        <Popup
            trigger={<button className="important"> Report </button>}
            modal
            nested
        >
            {close => (
                <div className="popup">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Please leave an explanation for this report: </div>
                    <div className="content">
                        <input type="text" />
                    </div>
                    <div className="actions">
                        <button
                            className="button"
                            onClick={() => {
                                console.log('report closed');
                                close();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="important"
                            onClick={() => {
                      
                            }}
                        >
                            Report
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default Report