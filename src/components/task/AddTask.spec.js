import React from 'react';
import { shallow } from 'enzyme';
import AddTask from './AddTask';


describe('AddTask' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<AddTask/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a <form/>', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <span/>', () => {
        expect(wrapper.find('span').length).toEqual(7);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(7);
    });

})