// import React, { useState } from 'react';

// import { connect } from 'react-redux';
// import { Button } from '../../styles/Buttons';

// function SaveButton({ isSaved, saveBoard }) {
//     const [values, setValues] = useState({
//         buttonText: 'Save Changes',
//     });

//     return (
//         <Button disabled={isSaved} onClick={saveBoard}>
//             {values.buttonText}
//         </Button>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         isSaved: state.board.isSaved,
//     };
// };

// export default connect(mapStateToProps, {})(SaveButton);
