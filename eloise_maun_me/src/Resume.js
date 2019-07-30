import React from 'react';

const classLists = {
  'card'                    : 'card my-3',
  'card_header_l1'          : 'card-header p-2 text-center text-uppercase text-white font-weight-bold',
  'card_header_l2'          : 'card-header p-2 text-left text-uppercase text-white font-weight-bold',
  'card_body'               : 'card-body',
  'card_body_list_unstyled' : 'card-body p-3 list-unstyled',
  'card_body_list_group'    : 'card-body list-group list-group-flush p-0',
  'list_group_item'         : 'list-group-item p-2',
  'list_group_item_title'   : 'list-group-item-title px-1 m-0 text-uppercase font-weight-bold',
  'list_group_item_text'    : 'list-group-item-text p-1 pl-4 pt-0 m-0'
}

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    const fixedRef = this; //creating reference for .then async calls

    fetch("./resumeData.json")
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        fixedRef.setState({'data':data});
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xs-5">
            
            <Summary data={this.state.data} />
              
            <Education data={this.state.data} />

            <Languages data={this.state.data} />

            <Skills data={this.state.data} />

          </div>
          
          <div className="col-md-8 col-xs-7">

            <Experiences data={this.state.data} />

          </div>
        </div>
      </div>
    );
  }
}

function Summary(props) {
  const sumData = ('data' in props && 'summaries' in props.data) ? props.data.summaries : [];

  const summaries = sumData.map((cv, i) => {
    return (
      <div className={classLists.list_group_item} key={i}>
        <div className={classLists.list_group_item_title}>{cv.title}</div>
        <div className={classLists.list_group_item_text}>{cv.text}</div>
      </div>
    );
  });

  return (
    <div className={classLists.card} id="summary">
      <div className={classLists.card_header_l1}>Summary</div>
      <div className={classLists.card_body_list_group}>
        {summaries}
      </div>
    </div>
  );
}


function Education(props) {
  const edData = ('data' in props && 'education' in props.data) ? props.data.education : [];

  const education = edData.map((cv, i) => {
    return (
      <div className={classLists.list_group_item} key={i}>
        <div className={classLists.list_group_item_title}>{cv.school}</div>
        <div className={classLists.list_group_item_text}>
          {cv.degree} ({cv.time.start[0]}-{cv.time.end[0]})
        </div>
      </div>
    );
  });

  return (
    <div className={classLists.card} id="education">
      <div className={classLists.card_header_l1}>Education</div>
      <div className={classLists.card_body_list_group}>
        {education}
      </div>
    </div>
  );
}


function Languages(props) {
  const langData = ('data' in props && 'languages' in props.data) ? props.data.languages : [];

  const languages = langData.map((cv, i) => {
    return (
      <li key={i}>
        <div className='badge badge-pill float-right text-white'>{cv.years} years</div>
        {cv.title}
      </li>
    );
  });

  return (
    <div className={classLists.card} id="languages">
      <div className={classLists.card_header_l1}>Languages</div>
      <div className={classLists.card_body_list_unstyled}>
        {languages}
      </div>
    </div>
  );
}


function Skills(props) {
  const skillData = ('data' in props && 'skills' in props.data) ? props.data.skills : [];

  const skills = skillData.map((cv, i) => {
    var rank = [];
    for (var j=1; j <= cv.rank; j++) { 
      rank.push(<i className='fas fa-star' key={'r'+j}></i>);
    }
    return (
      <li key={i}>
        <div className='badge badge-pill float-right text-white'>{rank}</div>
        {cv.title}
      </li>
    );
  });

  return (
    <div className={classLists.card} id="skills">
      <div className={classLists.card_header_l1}>Skills</div>
      <div className={classLists.card_body_list_unstyled}>
        {skills}
      </div>
    </div>
  );
}


function Experiences(props) {
  const compData = ('data' in props && 'companies' in props.data) ? props.data.companies : [];

  function getDateDisplay(defStr,dateArr) {
    var result = defStr;
    if (dateArr) {
      if (dateArr.length === 1) { result = dateArr[0]; }
      else if (dateArr.length > 1) { result = monthNames[dateArr[1]]+' '+dateArr[0]; }
    }
    return result;
  }

  const companies = compData.map((cv, i) => {
    var timeStart = getDateDisplay('',cv.time.start);
    var timeEnd   = getDateDisplay('Present',cv.time.end);

    const positions = cv.positions.map((cv2, j) => {
      const desc = [<p>{cv2.text}</p>];
      if ('tools' in cv2) { desc.push(<p>{cv2.tools}</p>); }

      return (
        <div className={classLists.list_group_item} key={'comp'+1+'pos'+j}>
          <div className={classLists.list_group_item_title}>{cv2.title}</div>
          <div className={classLists.list_group_item_text.replace('pl-4','pl-0')}>{desc}</div>
        </div>
      );
    });

    return (
      <div className={classLists.card.replace('my-3','my-2')} key={'comp'+i}>
        <div className={classLists.card_header_l2}>
        <span className='time font-weight-normal float-right text-capitalize'>{timeStart} - {timeEnd}</span>
          {cv.name}
        </div>
        <div className={classLists.card_body_list_group}>
          {positions}
        </div>
      </div>
    );
  });

  return (
    <div className={classLists.card} id="experiences">
      <div className={classLists.card_header_l1}>Experience</div>
      <div className={classLists.card_body+' px-1 py-0'}>
        {companies}
      </div>
    </div>
  );
}

export default Resume;