import React from 'react';
import { shallow } from 'enzyme';
import ViewProject from './ViewProject';


describe('ViewProject' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ViewProject project={''}/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(5);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('should render a <button/>', () => {
        expect(wrapper.find('button').length).toEqual(2);
    });

})