import React from 'react';
import { shallow } from 'enzyme';
import ViewProject from './ViewProject';


describe('ViewProject' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ViewProject/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a <span/>', () => {
        expect(wrapper.find('span').length).toEqual(2);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(1);
    });

})