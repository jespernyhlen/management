const initialData = {
    activities: {
        'activity-1': {
            id: 'activity-1',
            title: 'Payment gatway redesign.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: 'Mar 16, 2020',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-2': {
            id: 'activity-2',
            title: 'Portfolio v2.',
            content:
                'Intergration with cloud providers and modernizr feature detection library, complete with a custom build configuration.',
            date: 'Oct 21, 2020',
            notification: {
                color: '#83BB41',
                content: 'Business',
            },
        },
        'activity-3': {
            id: 'activity-3',
            title: 'Change hosting provider.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: 'Jul 15, 2020',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-4': {
            id: 'activity-4',
            title: 'Payment gatway redesign.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: 'Mar 16, 2020',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-5': {
            id: 'activity-5',
            title: 'Portfolio v2.',
            content:
                'Intergration with cloud providers and modernizr feature detection library, complete with a custom build configuration.',
            date: 'Oct 21, 2020',
            notification: {
                color: '#83BB41',
                content: 'Business',
            },
        },
        'activity-6': {
            id: 'activity-6',
            title: 'Change hosting provider.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: 'Jul 15, 2020',
            notification: {
                color: '#da1b1bc7',
                content: 'Important',
            },
        },
        'activity-7': {
            id: 'activity-7',
            title: 'Scoping Session TLF.',
            content:
                'New intergration with cloud providers. Collaborate seamlessly with engineers, product and scrum masters.',
            date: 'Jun 24, 2020',
            notification: {
                color: '#1b73dab3',
                content: 'Important',
            },
        },
        'activity-8': {
            id: 'activity-8',
            title: 'HTML5 Boilerplate.',
            content:
                'Collaborate seamlessly with product, engineers and scrum masters.',
            date: 'Jan 9, 2020',
            notification: {
                color: '',
                content: '',
            },
        },
        'activity-9': {
            id: 'activity-9',
            title: 'New API intergration.',
            content:
                'Intergrate the extension to appear further, build configuration to enhance deployment.',
            date: 'Mar 30, 2020',
            notification: {
                color: '#83BB41',
                content: 'Company',
            },
        },
        'activity-10': {
            id: 'activity-10',
            title: 'Analytics, icons, and more.',
            content:
                'Modernizr feature detection library, complete with a custom build configuration.',
            date: 'Mar 16, 2020',
            notification: {
                color: '',
                content: '',
            },
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'IDEAS',
            color: '#635CA2',
            activityIds: ['activity-1', 'activity-2', 'activity-3'],
        },
        'column-2': {
            id: 'column-2',
            title: 'STARTED',
            color: '#5493D9',
            activityIds: ['activity-4', 'activity-5', 'activity-6'],
        },
        'column-3': {
            id: 'column-3',
            title: 'IN PROGRESS',
            color: '#CF5D73',
            activityIds: ['activity-7', 'activity-8'],
        },
        'column-4': {
            id: 'column-4',
            title: 'COMPLETED',
            color: '#93D048',
            activityIds: ['activity-9', 'activity-10'],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default initialData;
