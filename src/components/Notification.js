import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

const Notification = (noteText, noteType) => {
    store.addNotification({
        message: noteText,
        type: noteType,
        insert: 'bottom',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 3000,
            showIcon: true,
        },
        slidingExit: {
            duration: 100,
            timingFunction: 'ease-out',
            delay: 0,
        },
    });
};

export default Notification;
