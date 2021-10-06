import PropTypes from 'prop-types';
/* eslint no-underscore-dangle: [2, { "allow": ["_loading"] }] */
import React from 'react';
import Core from './api/core.json';
import Electives from './api/electives.json';

const Courses = {
  core: Core,
  electives: Electives,
};

module.exports = class extends React.Component {
  static propTypes = {
    //Component accepting 3 props
    department: PropTypes.string,
    course: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
// _loading UI effect, initial state
  state = {
    department: null,
    course: null,
    courses: [],
    _loading: false,
  };
//this updates to modify state
  componentWillReceiveProps(update) {
    this.setState({
      department: update.department,
      course: update.course,
    });
  }
//
  onSelectDepartment = (evt) => {
    const department = evt.target.value;
    //reset course
    const course = null;
    //update state
    this.setState({ department, course });
    //propagate change 
    this.props.onChange({ name: 'department', value: department });
    this.props.onChange({ name: 'course', value: course });
//fetch available courses for department
    if (department) this.fetch(department);
  };
//get value of target from event
  onSelectCourse = (evt) => {
    const course = evt.target.value;
    //update state
    this.setState({ course });
    //call change handler from parent
    this.props.onChange({ name: 'course', value: course });
  };

  fetch = (department) => {
    this.setState({ _loading: true, courses: [] });
    apiClient(department).then((courses) => {
      //update state
      this.setState({ _loading: false, courses: courses });
    });
  };
//returns of select element displaying 3 options
//1st empty
/**
 value={this.state.department || ''} <-falsy by default, value empty
 otherwise shows 2 other options,
 onChange={this.onSelectDepartment} <-lookup
 */
  renderDepartmentSelect = () => {
    return (
      <select
        onChange={this.onSelectDepartment}
        value={this.state.department || ''}
      >

        <option value=''>
          Which department?
        </option>
        <option value='core'>
          NodeSchool: Core
        </option>
        <option value='electives'>
          NodeSchool: Electives
        </option>
      </select>
    );
  };
//returns different root, dynamic population of option children
//to select
  renderCourseSelect = () => {
    if (this.state._loading) {
      return <img alt='loading' src='/img/loading.gif' />;
    }
    if (!this.state.department || !this.state.courses.length) return <span />;
//1st option which course?
    return (
      <select
        onChange={this.onSelectCourse}
        value={this.state.course || ''}
      >

        { [
          <option value='' key='course-none'>
            Which course?
          </option>,
//spread operator and map 
          ...this.state.courses.map((course, i) => (
            <option value={course} key={i}>
              {course}
            </option>
          )),
        ] }
      </select>
    );
  };
//use of two methods
  render() {
    return (
      <div>
        { this.renderDepartmentSelect() }
        <br />
        { this.renderCourseSelect() }
      </div>
    );
  }
};

function apiClient(department) {
  return {
    then: function (cb) {
      setTimeout(() => { cb(Courses[department]); }, 1000);
    },
  };
}
