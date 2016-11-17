import { createGroup } from '../actions/groupActions'
import { hideModal } from '../actions/uiActions'
import { connect } from 'react-redux'
import React, { propType } from 'react'

const CreateGroupModal = ({ dispatch }) => (
  <div>
    <p>Create group</p>
    <button onClick={() => {
      dispatch(createGroup())
    }}>
      Yes
    </button>
    <button onClick={() => dispatch(hideModal())}>
      Nope
    </button>
  </div>
)

export default connect()(CreateGroupModal)