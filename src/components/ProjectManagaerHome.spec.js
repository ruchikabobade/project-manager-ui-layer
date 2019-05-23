import React from 'react';
import { shallow } from 'enzyme';
import Project from './project/Project';
import User from './user/User';
import AddTask from './task/AddTask';
import ViewTask from './task/ViewTask';
import ProjectManagerHome from './ProjectManagerHome'


describe('ProjectManagerHome', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ProjectManagerHome/>))
    
    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(7);
    });
    
    it('should render a <li/>', () => {
        expect(wrapper.find('li').length).toEqual(4);
    });

    it('should render a <ul/>', () => {
        expect(wrapper.find('ul').length).toEqual(1);
    });

    it('should render a <nav/>', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    });
});