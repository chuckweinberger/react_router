//This is the root of all modals shown in the app
import React, { propType } from 'react'
import CreateStoryModal from '../components/CreateStoryModal'
import CreateGroupModal from '../components/CreateGroupModal'
import { CREATE_STORY, CREATE_GROUP } from '../constants/modalTypes'
import { connect } from 'react-redux'

const MODAL_COMPONENTS = {
  CREATE_STORY: CreateStoryModal,
  CREATE_GROUP: CreateGroupModal,
  /* other modals */
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span/>
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal />
}

export default connect(
  store => store.ui
)(ModalRoot)

