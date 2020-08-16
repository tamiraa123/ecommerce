import React, { Component } from "react";
import { Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import pdfIcon from "../../assets/img/pdficon.png"
import server from "../../server.json";


const style = {
  width: 20,
  height: 20
}
export class Tasks extends Component {

  handleReport = (event) => {
    console.log(event.target.name)
    window.open(event.target.name)
  }

  render() {
    const edit = <Tooltip id="edit_tooltip">download</Tooltip>;
    const tasks_title = [
      'Search history',
    ];
    const tasks_value = [
      server.urlZaki+'/reports/export/pdf',
    ];
    var tasks = [];

    for (var i = 0; i < tasks_title.length; i++) {
      tasks.push(
        <tr key={i}>
          
          <td>{tasks_title[i]}</td>
          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={edit}>              
              <Image style={style} src={pdfIcon} name={tasks_value[i]} onClick={this.handleReport}></Image>
            </OverlayTrigger>
          </td>
       
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default Tasks;
