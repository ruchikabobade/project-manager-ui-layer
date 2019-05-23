import React from 'react';
import { shallow } from 'enzyme';
import User from './User';
import AddUser from './AddUser';
import ViewUser from './ViewUser';


describe('User', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<User/>))
    
    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(3);
    });

    it('should render the AddUser Component', () => {
        expect(wrapper.containsMatchingElement(<AddUser/>)).toEqual(true);
    });
});