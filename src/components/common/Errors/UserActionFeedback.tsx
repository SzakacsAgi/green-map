import React from 'react'
import { SupportedUserActionFeedBackType } from '../../../interfaces'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface UserActionFeedbackProps {
  type: SupportedUserActionFeedBackType
  text: string
}

const UserActionFeedback: React.FunctionComponent<UserActionFeedbackProps> = ({ type, text }) => {
  const detectFeedbackContent = () => {
    switch (type) {
      case SupportedUserActionFeedBackType.ERROR:
        return (
          <div className="flex items-center px-3 py-2 mb-9 bg-lightRed border-l-8 border-darkRed rounded-md">
            <div className="w-8 h-8 p-1 rounded-full bg-darkRed mr-3 flex justify-center items-center">
              <ExclamationTriangleIcon className="w-5 text-lightRed" />
            </div>
            <p className="text-darkRed">{text}</p>
          </div>
        )
      case SupportedUserActionFeedBackType.POSITIVE_FEEDBACK:
        return (
          <div className="flex items-center px-3 py-2 mb-9 bg-primaryButtonHover border-l-8 border-primaryGreen rounded-md">
            <div className="w-8 h-8 p-1 rounded-full bg-primaryGreen mr-3 flex justify-center items-center">
              <CheckIcon className="w-5 text-white" />
            </div>
            <p className="text-primaryGreen">{text}</p>
          </div>
        )
    }
  }
  return detectFeedbackContent()
}

export default UserActionFeedback
