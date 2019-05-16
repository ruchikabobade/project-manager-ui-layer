import React from 'react';
import { shallow } from 'enzyme';
import AddProject from './AddProject';


describe('AddProject' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<AddProject/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(34);
    });

    it('should render a <form/>', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(8);
    });

})