import React from "react";
import { IDialogProps, IDialogState } from "../../../interfaces/Dialog";
import "./Dialog.css";
export class Dialog extends React.Component<IDialogProps, IDialogState> {
  isOpen = false;

  closeDialog = () => {};

  render() {
    return (
      <div className="content">
        <span onClick={this.closeDialog}>close</span>
        <h1>{this.props.title}</h1>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
