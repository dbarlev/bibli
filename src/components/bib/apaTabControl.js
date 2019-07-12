import React, {Component} from 'react';
import ApaBooks from './apa/ApaBooks';
import ApaPaper from './apa/ApaPaper';
import ApaArticle from './apa/ApaArticle';
import ApaWebsite from './apa/ApaWebsite';



class ApaTabControl extends Component {

  constructor()
  {
    super();
    this.state = {
      activePanel: "book"
    }
  }

  changeTab(event)
  {
    event.preventDefault();
    this.setState({
      activePanel: event.currentTarget.name
    })
  }

  showTabPanel()
  {
      let {editRecord, activePanel} = this.props;
      activePanel = editRecord && editRecord.type ? editRecord.type : this.state.activePanel;
      switch(activePanel)
      {
          case "book":
            return <ApaBooks editRecord={editRecord} />
          case "paper":
            return <ApaPaper editRecord={editRecord} />
          case "article":
            return <ApaArticle editRecord={editRecord} />
          case "website":
            return <ApaWebsite editRecord={editRecord} />
          default:
            return <ApaBooks editRecord={editRecord} />
      }
  }



  render() {
    return (            
        <div id="apaTabcontrol">
            <div className="row">
                <ul className="nav tabControlIcons">
                    <li className="pull-right" name="book"><a name="book" href="#book" onClick={this.changeTab.bind(this)}><i name="book" className="fas fa-book"></i><div name="book" className="iconText">ספר</div></a></li>
                    <li className="pull-right" name="paper"><a name="paper" href="#paper" onClick={this.changeTab.bind(this)}><i name="paper" className="fas fa-book-open"></i><div name="paper" className="iconText">עיתון</div></a></li>
                    <li className="pull-right" name="article"><a name="article" href="#article" onClick={this.changeTab.bind(this)}><i name="article" className="fas fa-graduation-cap"></i><div name="article" className="iconText">כתב עת</div></a></li>
                    <li className="pull-right" name="website"><a name="website" href="#website" onClick={this.changeTab.bind(this)}><i name="website" className="fab fa-chrome"></i><div name="website" className="iconText">אתר</div></a></li>
                    <li className="pull-right" name="website"><a name="website" href="#website" onClick={this.changeTab.bind(this)}><i name="website" class="fas fa-video"></i><div name="website" className="iconText">סרט</div></a></li>
                    <li className="pull-right" name="website"><a name="website" href="#website" onClick={this.changeTab.bind(this)}><i name="website" class="fas fa-microphone"></i><div name="website" className="iconText">אודיו</div></a></li>
                </ul> 
            </div>
            <div className="row">
                    <div className="col-md-9">  
                        {
                        this.showTabPanel()
                        } 
                    </div>
            </div>         
        </div>
    );
  }
}



export default ApaTabControl;

