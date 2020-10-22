import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

/* STYLES */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faPen,
    faTrashAlt,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
    DropdownContainer,
    DropdownItem,
    IconContainer,
} from '../../styles/Dropdown';

import { openModal } from '../../actions';

// Component to display a dropdownmenu.
// Options to open CRUD modal or delete and item.
// Closes on click outside using refs.
const DropdownMenu = (props) => {
    const {
        dropdownShown,
        setDropdownShown,
        content,
        openModal,
        deleteContent,
    } = props;

    const wrapperRef = useRef(null);
    const [isVisible, setIsVisible] = useState(dropdownShown);

    useEffect(() => {
        setIsVisible(dropdownShown);
    }, [dropdownShown]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event) => {
        let currentRef = wrapperRef.current;
        if (currentRef && !currentRef.contains(event.target))
            setDropdownShown(false);
    };

    function setModalOpen() {
        openModal(true, content);
    }

    function closeDropdown(next) {
        setDropdownShown(false);
        next();
    }
    return (
        <>
            {isVisible && (
                <DropdownContainer ref={wrapperRef}>
                    {content.scope === 'activity' && (
                        <DropdownItem
                            onClick={() => {
                                content.action = 'view';
                                closeDropdown(setModalOpen);
                            }}
                        >
                            View
                            <IconContainer>
                                <FontAwesomeIcon icon={faEye} />
                            </IconContainer>
                        </DropdownItem>
                    )}

                    <DropdownItem onClick={() => closeDropdown(setModalOpen)}>
                        Edit
                        <IconContainer>
                            <FontAwesomeIcon icon={faPen} />
                        </IconContainer>
                    </DropdownItem>
                    <DropdownItem onClick={() => closeDropdown(deleteContent)}>
                        Delete
                        <IconContainer>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </IconContainer>
                    </DropdownItem>
                    <DropdownItem onClick={() => setDropdownShown(false)}>
                        Close
                        <IconContainer>
                            <FontAwesomeIcon
                                className='larger'
                                icon={faTimes}
                            />
                        </IconContainer>
                    </DropdownItem>
                </DropdownContainer>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({ boardIndex: state.board.boardIndex });

export default connect(mapStateToProps, {
    openModal,
})(DropdownMenu);

// import React, { useState, useRef, useEffect } from 'react';
// import { connect } from 'react-redux';
// import {
//     deleteBoard,
//     deleteColumn,
//     deleteActivity,
//     openModal,
// } from '../../actions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faEye,
//     faPen,
//     faTrashAlt,
//     faTimes,
// } from '@fortawesome/free-solid-svg-icons';
// import {
//     DropdownContainer,
//     DropdownItem,
//     IconContainer,
// } from '../../styles/Dropdown';

// const BoardDropdown = (props) => {
//     const {
//         dropdownShown,
//         setDropdownShown,
//         deleteBoard,
//         deleteColumn,
//         deleteActivity,
//         content,
//         openModal,
//     } = props;

//     const wrapperRef = useRef(null);
//     const [isVisible, setIsVisible] = useState(dropdownShown);

//     useEffect(() => {
//         setIsVisible(dropdownShown);
//     }, [dropdownShown]);

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside, false);
//         return () => {
//             document.removeEventListener('click', handleClickOutside, false);
//         };
//     }, []);

//     const handleClickOutside = (event) => {
//         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//             setDropdownShown(false);
//         }
//     };

//     function setModalOpen(action) {
//         if (action === 'view') content.action = action;
//         let modalInfo = content;
//         openModal(true, modalInfo);
//         setDropdownShown(false);
//     }

//     function deleteContent() {
//         setDropdownShown(false);
//         switch (content.scope) {
//             case 'board':
//                 deleteBoard(content.boardID);
//                 break;
//             case 'column':
//                 deleteColumn(content.columnID);
//                 break;
//             case 'activity':
//                 deleteActivity(content.activityID, content.columnID);
//                 break;
//             default:
//                 break;
//         }
//     }
//     return (
//         <>
//             {isVisible && (
//                 <DropdownContainer ref={wrapperRef}>
//                     {content.scope === 'activity' && (
//                         <DropdownItem onClick={() => setModalOpen('view')}>
//                             View
//                             <IconContainer>
//                                 <FontAwesomeIcon icon={faEye} />
//                             </IconContainer>
//                         </DropdownItem>
//                     )}

//                     <DropdownItem onClick={() => setModalOpen()}>
//                         Edit
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faPen} />
//                         </IconContainer>
//                     </DropdownItem>
//                     <DropdownItem onClick={() => deleteContent()}>
//                         Delete
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faTrashAlt} />
//                         </IconContainer>
//                     </DropdownItem>
//                     <DropdownItem onClick={() => setDropdownShown(false)}>
//                         Close
//                         <IconContainer>
//                             <FontAwesomeIcon
//                                 className='larger'
//                                 icon={faTimes}
//                             />
//                         </IconContainer>
//                     </DropdownItem>
//                 </DropdownContainer>
//             )}
//         </>
//     );
// };

// const mapStateToProps = (state) => ({ boardIndex: state.board.boardIndex });

// export default connect(mapStateToProps, {
//     deleteBoard,
//     deleteColumn,
//     deleteActivity,
//     openModal,
// })(BoardDropdown);
