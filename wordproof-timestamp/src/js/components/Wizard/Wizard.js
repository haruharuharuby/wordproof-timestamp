import React, {Component} from 'react'
import StepWizard from 'react-step-wizard';

import './Wizard.scss';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Nav from "./Nav";

export default class Wizard extends Component {

  constructor(props) {
    super(props);
    this.transitions = {};
    this.state = {
      fields: {}
    }
  }

  updateField(e, slug = null, value = null) {
    if (e) {
      slug = e.target.getAttribute('data-slug');
      value = e.target.value;
    }

    let fields = this.state.fields;
    fields[slug] = value;
    console.log(fields);
    this.setState(fields);
  }

  getField(slug) {
    return this.state.fields[slug];
  }

  render() {
    return (
      <div className="wordproof-onboarding-wizard bg-gray-300">
        <div className={`flex flew-row justify-center items-center mb-24`}>
          <img className={`border-none h-12 mr-4`} src={wordproof.imagesUri + '/wordproof-icon-large.png'} />
          <img className={`border-none h-10`} src={wordproof.imagesUri + '/wordproof-logo.png'} />
        </div>
          <StepWizard transitions={this.transitions} isHashEnabled={true} nav={<Nav/>}>
            <Step1 hashKey={'mode'} />
            <Step2 hashKey={'connect'} get={this.getField.bind(this)} update={this.updateField.bind(this)}/>
            <Step3 hashKey={'customize'} get={this.getField.bind(this)} update={this.updateField.bind(this)}/>
            <Step4 hashKey={'certificate'} get={this.getField.bind(this)} update={this.updateField.bind(this)}/>
          </StepWizard>
      </div>
    );
  }
}
