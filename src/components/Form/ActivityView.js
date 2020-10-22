import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

/* STYLES */
import styled from 'styled-components';
import {
    Container,
    Header,
    Title,
    ButtonTop,
} from '../../styles/FormBoardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faHeading,
    faAlignLeft,
} from '@fortawesome/free-solid-svg-icons';

/* COMPONENTS */
import GravatarImage from '../../layout/Gravatar';

import { openModal } from '../../actions';

// Components for displaying an activity in "read only" mode.
const ActivityView = ({ openModal, modal, template }) => {
    const [newItem, setNewItem] = useState(template);
    const { content } = modal;

    function setCloseModal() {
        if (newItem !== template) setNewItem(template);
        openModal(false);
    }

    return (
        <Container>
            <Header>
                <Title>{modal.action} Activity </Title>
                <ButtonTop top onClick={setCloseModal}>
                    <FontAwesomeIcon className='larger' icon={faTimes} />
                </ButtonTop>
            </Header>
            {content.title && (
                <Section>
                    <SectionTitle>
                        <FontAwesomeIcon icon={faHeading} />
                        Title
                    </SectionTitle>
                    <SectionText className='title'>{content.title}</SectionText>
                </Section>
            )}

            {content.content && (
                <Section>
                    <SectionTitle>
                        <FontAwesomeIcon icon={faAlignLeft} />
                        Description
                    </SectionTitle>
                    <SectionText> {content.content}</SectionText>
                </Section>
            )}

            <SectionGroup>
                {content.members.length > 0 && (
                    <GroupItem>
                        <SectionTitle>Members</SectionTitle>
                        <SectionText>
                            <MembersContainer>
                                {content.members.map((member) => {
                                    return (
                                        <Fragment key={member.email}>
                                            <GravatarImage
                                                key={member.email}
                                                email={member.email}
                                                size={20}
                                                rounded={true}
                                            />
                                            <HoverText>{member.name}</HoverText>
                                        </Fragment>
                                    );
                                })}
                            </MembersContainer>
                        </SectionText>
                    </GroupItem>
                )}
                {content.date && (
                    <GroupItem>
                        <SectionTitle>Date</SectionTitle>
                        <SectionText>{content.date}</SectionText>
                    </GroupItem>
                )}
                {content.noteContent && (
                    <GroupItem>
                        <SectionTitle>Label</SectionTitle>
                        <SectionText>
                            <Notification BgColor={content.noteColor}>
                                {content.noteContent}
                            </Notification>
                        </SectionText>
                    </GroupItem>
                )}
            </SectionGroup>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

export default connect(mapStateToProps, {
    openModal,
})(ActivityView);

const Section = styled.div`
    padding: 1.5rem 0;
    border-bottom: 1px solid #f7f7f7;
`;

const SectionTitle = styled.h3`
    color: #222;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;

    svg {
        margin-right: 0.75rem;
        font-size: 0.825rem;
        margin-bottom: 0.05rem;
    }
`;

const SectionText = styled.span`
    font-size: 0.8rem;
    margin-bottom: 0;

    &.title {
        color: #444;
        font-weight: 600;
        font-size: 1.125rem;
    }
`;

const SectionGroup = styled.div`
    display: flex;
    padding: 1.5rem 0;
    border-bottom: 1px solid #f7f7f7;
`;

const GroupItem = styled.div`
    width: 33.3%;
    ${SectionTitle} {
        font-size: 0.85rem;
    }
`;

const Notification = styled.span`
    background: ${(props) => (props.BgColor ? props.BgColor : '#83BB41')};
    font-size: 9px;
    width: fit-content;
    padding: 1px 6px 2.5px;
    border-radius: 2px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.75rem;
`;

const HoverText = styled.p`
    position: absolute;
    opacity: 0;
    transform: translateY(-5px);
    margin-top: 0.25rem;
    margin-bottom: 0;
    color: #fff;
    background: #352a4c;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    transition: 0.2s all;
`;

const MembersContainer = styled.div`
    img {
        margin-right: 0 !important;
        position: relative;
        z-index: 1;
        border: 1px solid #fff;

        &:hover + ${HoverText} {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
