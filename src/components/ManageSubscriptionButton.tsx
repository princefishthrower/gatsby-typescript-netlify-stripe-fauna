import * as React from 'react'
import { useState } from 'react'
import { navigateToManageStripeSubscription } from '../helpers/NetlifyServerlessFunctionHelpers'

export interface IManageSubscriptionButtonProps {
  label: string
}

export function ManageSubscriptionButton(props: IManageSubscriptionButtonProps) {
  const { label } = props
  const [isNavigatingToManage, setIsNavigatingToManage] = useState<boolean>(false)

  const handleOnClick = async () => {
    setIsNavigatingToManage(true)
    await navigateToManageStripeSubscription()
    setIsNavigatingToManage(false)
  }
  const buttonText = isNavigatingToManage ? 'Redirecting to Stripe...' : label
  return (
    <button disabled={isNavigatingToManage} onClick={handleOnClick}>
      {buttonText}
    </button>
  )
}
