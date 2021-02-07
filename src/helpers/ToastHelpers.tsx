import * as React from 'react'
import { toast, ToastOptions, UpdateOptions } from 'react-toastify'

export abstract class ToastHelpers {
  /**
   * @description Show a simple toast with default options.
   * @param {string} message The message to show.
   * @param {ToastOptions} [options] Options to override (Optional).
   */
  public static showSimple(message: string, options?: ToastOptions): React.ReactText {
    return toast(message, {
      ...options,
      onOpen: () => ToastHelpers.handleOnOpen(),
      onClose: () => ToastHelpers.handleOnClose()
    })
  }

  public static update(options: UpdateOptions, toastId: string): void {
    toast.update(toastId, options)
  }

  /**
   * @description Shows a toast with custom confirm and deny buttons. Will fire "deny function" and close if anywhere on the masking div is clicked.
   * @param {React.ReactNode} messageComponent Markup for the message part.
   * @param {React.ReactNode} confirmButton Markup for the confirm button.
   * @param {React.ReactNode} denyButton Markup for deny button.
   * @param {() => void} denyFunction Function to execute on deny click. Note that the "deny function" fires on any type of dismiss (swipe, clicking away etc. so it fires in the onClose())
   */
  public static showComplex(
    messageComponent: React.ReactNode,
    confirmButton: React.ReactNode,
    denyButton: React.ReactNode,
    denyFunction: () => void
  ): void {
    toast(
      <>
        {messageComponent}
        {confirmButton}
        {denyButton}
      </>,
      {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
        onOpen: () => ToastHelpers.handleOnOpen(),
        onClose: () => ToastHelpers.handleOnClose(denyFunction)
      }
    )
  }

  public static dismiss(toastId: string) {
    toast.dismiss(toastId)
  }

  private static handleOnOpen() {
    const elements = document.getElementsByClassName('Toastify')

    // add active class and event listener
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i]
      item.addEventListener('click', ToastHelpers.handleClick, false)
    }
  }

  private static handleOnClose(denyFunction?: () => void) {
    const elements = document.getElementsByClassName('Toastify')

    // fire deny function, remove classes, cleanup event listeners

    for (let i = 0; i < elements.length; i++) {
      const item = elements[i]

      if (denyFunction) {
        denyFunction()
      }

      item.removeEventListener('click', ToastHelpers.handleClick)
    }
  }

  private static handleClick() {
    toast.dismiss()
  }
}
