import React from 'react';
import { shallow } from 'enzyme';
import AddUser from './AddUser';


describe('AddUser' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<AddUser/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(22);
    });

    it('should render a <form/>', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(5);
    });

})