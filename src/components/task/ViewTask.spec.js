import React from 'react';
import { shallow } from 'enzyme';
import ViewTask from './ViewTask';


describe('ViewTask' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ViewTask/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a <form/>', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <span/>', () => {
        expect(wrapper.find('span').length).toEqual(2);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(1);
    });

})