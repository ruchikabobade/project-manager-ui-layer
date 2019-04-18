import React from 'react';
import { shallow } from 'enzyme';
import Project from './Project';
import AddProject from './AddProject';
import ViewProject from './ViewProject';


describe('Project', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Project/>))
    
    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(4);
    });

    it('should render the AddProject Component', () => {
        expect(wrapper.containsMatchingElement(<AddProject/>)).toEqual(true);
    });

    it('should render the ViewProject Component', () => {
        expect(wrapper.containsMatchingElement(<ViewProject/>)).toEqual(true);
    });
});