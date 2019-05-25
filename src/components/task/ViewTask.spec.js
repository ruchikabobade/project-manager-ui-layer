import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import ViewTask from './ViewTask';

Enzyme.configure({ adapter: new Adapter() });

describe('ViewTask' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ViewTask/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(18);
    });

    it('should render a <span/>', () => {
        expect(wrapper.find('span').length).toEqual(10);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(2);
    });

})